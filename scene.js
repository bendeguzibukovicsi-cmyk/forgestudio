const cinematic = document.querySelector('.cinematic');
const stage = document.querySelector('.cinematic-stage');
const sceneCanvas = document.querySelector('#gpu-canvas');
const sceneStatus = document.querySelector('#scene-status');
let sceneStatusMessage = 'A 3D-s bemutató betöltése…';
function setSceneStatus(message) {
    sceneStatusMessage = message;
    // Use safeTranslate if available, fallback to translate or identity
    const translatedText = typeof safeTranslate === 'function' 
        ? safeTranslate(message) 
        : (typeof translate === 'function' ? translate(message) : message);
    sceneStatus.textContent = translatedText;
}
window.addEventListener('forgestudio-language-change', () => setSceneStatus(sceneStatusMessage));
const sceneSlides = [...document.querySelectorAll('.scene-slide')];
const sceneProgress = document.querySelector('#scene-progress');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let targetProgress = 0;
let currentProgress = 0;
let activeSlide = -1;

function updateSceneProgress() {
    const distance = cinematic.offsetHeight - stage.offsetHeight;
    targetProgress = Math.max(0, Math.min(1, -cinematic.getBoundingClientRect().top / Math.max(distance, 1)));
    const index = Math.min(3, Math.floor(targetProgress * 4));
    if (index !== activeSlide) {
        sceneSlides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === index);
            slide.setAttribute('aria-hidden', String(i !== index));
        });
        activeSlide = index;
    }
    const percent = Math.round(targetProgress * 100);
    sceneProgress.style.width = `${percent}%`;
    stage.style.setProperty('--scene-progress', `${percent}%`);
}

window.addEventListener('scroll', updateSceneProgress, { passive: true });
window.addEventListener('resize', updateSceneProgress);
updateSceneProgress();

let modelSource = window.location.protocol === 'file:'
    ? new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'model-data.js';
        script.onload = () => {
            const data = window.forgeStudioModelData;
            delete window.forgeStudioModelData;
            script.remove();
            resolve(typeof data === 'string'
                ? { data }
                : { error: new Error('A modell adatai hiányoznak.') });
        };
        script.onerror = () => {
            script.remove();
            resolve({ error: new Error('A helyi modelladatok nem tölthetők be.') });
        };
        document.head.append(script);
    })
    : fetch('nvidiaRTX5090-optimized.glb')
        .then((response) => {
            if (!response.ok) throw new Error(`Modell letöltése: HTTP ${response.status}`);
            return response.arrayBuffer();
        })
        .then((buffer) => ({ buffer }), (error) => ({ error }));

async function startScene() {
    try {
        const [THREE, { GLTFLoader }] = await Promise.all([
            import('three'),
            import('https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js')
        ]);
        const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas, antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x252422);
        renderer.autoClear = false;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.set(0, 0, 7.8);
        const background = new THREE.Scene();
        const backgroundCamera = new THREE.Camera();
        const backgroundMaterial = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 }, progress: { value: 0 }, aspect: { value: 1 } },
            vertexShader: 'varying vec2 uvPos; void main(){ uvPos=uv; gl_Position=vec4(position,1.0); }',
            fragmentShader: `
                varying vec2 uvPos;
                uniform float time;
                uniform float progress;
                uniform float aspect;
                void main() {
                    vec2 p = uvPos - 0.5;
                    p.x *= aspect;
                    float wave = sin(p.x * 4.0 + p.y * 6.0 + time * 0.24)
                               + sin(p.x * 7.0 - p.y * 4.0 - time * 0.16);
                    float glow = exp(-length(p - vec2(0.25, 0.0)) * 2.8);
                    float ribbon = exp(-abs(p.y + 0.15 + 0.10 * sin(p.x * 3.0 + time * 0.18)) * 8.0);
                    vec3 base = vec3(0.145, 0.141, 0.133);
                    vec3 green = vec3(0.322, 0.718, 0.533);
                    vec3 orange = vec3(0.922, 0.369, 0.157);
                    vec3 tint = mix(green, orange, progress * 0.35);
                    vec3 col = base + tint * (glow * 0.22 + ribbon * 0.035 + wave * 0.006);
                    gl_FragColor = vec4(max(col, 0.0), 1.0);
                }`
        });
        background.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backgroundMaterial));

        scene.add(new THREE.HemisphereLight(0xe4f2ff, 0x34413b, 2.2));
        const key = new THREE.DirectionalLight(0xffffff, 3.5);
        key.position.set(-4, 6, 8);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xc8f0ff, 2.5);
        rim.position.set(4, 3, -5);
        scene.add(rim);
        const modelPivot = new THREE.Group();
        scene.add(modelPivot);
        const loader = new GLTFLoader();
        const localPicker = document.querySelector('#local-model-picker');

        function showModel(gltf) {
            const model = gltf.scene;
            const bounds = new THREE.Box3().setFromObject(model);
            const size = bounds.getSize(new THREE.Vector3());
            const center = bounds.getCenter(new THREE.Vector3());
            const largestDimension = Math.max(size.x, size.y, size.z);
            if (!Number.isFinite(largestDimension) || largestDimension <= 0) {
                setSceneStatus('A modell üres vagy hibás.');
                console.error('A modell mérete érvénytelen.');
                return;
            }
            model.position.sub(center);
            modelPivot.clear();
            modelPivot.add(model);
            modelPivot.scale.setScalar(4.0 / largestDimension);
            localPicker.hidden = true;
            setSceneStatus('');
        }

        function modelError(error) {
            console.error('A 3D modell betöltése nem sikerült:', error);
            setSceneStatus('A modell nem tölthető be. Válaszd ki a projektmappában lévő nvidiaRTX5090.glb fájlt.');
            localPicker.hidden = false;
        }

        document.querySelector('#local-model').addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (!file) return;
            setSceneStatus('A 3D modell betöltése…');
            try {
                const buffer = await file.arrayBuffer();
                loader.parse(buffer, '', showModel, modelError);
            } catch (error) {
                modelError(error);
            }
        });

        modelSource.then(({ data, buffer, error }) => {
            if (error) {
                modelError(error);
                return;
            }
            try {
                if (data) {
                    const decoded = atob(data);
                    const bytes = new Uint8Array(decoded.length);
                    for (let i = 0; i < decoded.length; i++) bytes[i] = decoded.charCodeAt(i);
                    buffer = bytes.buffer;
                }
                loader.parse(buffer, '', showModel, modelError);
            } catch (error) {
                modelError(error);
            }
        });
        modelSource = null;

        let dragStart = null;
        let dragAngle = 0;
        let tiltAngle = 0;
        sceneCanvas.addEventListener('pointerdown', (event) => {
            if (!event.isPrimary || event.button !== 0 || dragStart) return;
            dragStart = { id: event.pointerId, x: event.clientX, y: event.clientY, angle: dragAngle, tilt: tiltAngle };
            sceneCanvas.setPointerCapture(event.pointerId);
            sceneCanvas.classList.add('is-dragging');
        });
        sceneCanvas.addEventListener('pointermove', (event) => {
            if (!dragStart || event.pointerId !== dragStart.id) return;
            dragAngle = dragStart.angle + (event.clientX - dragStart.x) * 0.01;
            tiltAngle = Math.max(-1, Math.min(1, dragStart.tilt + (event.clientY - dragStart.y) * 0.01));
        });
        function endDrag(event) {
            if (!dragStart || event.pointerId !== dragStart.id) return;
            dragStart = null;
            sceneCanvas.classList.remove('is-dragging');
        }
        sceneCanvas.addEventListener('pointerup', endDrag);
        sceneCanvas.addEventListener('pointercancel', endDrag);
        sceneCanvas.addEventListener('lostpointercapture', endDrag);

        const particleCount = 300;
        const positions = new Float32Array(particleCount * 3);
        const seeds = Array.from({ length: particleCount }, () => ({
            x: (Math.random() - 0.5) * 12,
            y: Math.random() * 9,
            z: -1 - Math.random() * 5,
            speed: 0.1 + Math.random() * 0.22
        }));
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particles = new THREE.Points(geometry, new THREE.PointsMaterial({
            color: 0x52b788, size: 0.035, transparent: true, opacity: 0.65,
            blending: THREE.AdditiveBlending, depthWrite: false
        }));
        scene.add(particles);

        function resizeScene() {
            const width = stage.clientWidth;
            const height = stage.clientHeight;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.position.z = width < 600 ? 10 : 7.8;
            camera.updateProjectionMatrix();
            backgroundMaterial.uniforms.aspect.value = width / height;
            modelPivot.position.set(width < 600 ? 0.2 : 1.1, width < 600 ? -1.0 : 0, 0);
        }
        window.addEventListener('resize', resizeScene);
        resizeScene();

        sceneCanvas.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            setSceneStatus('A 3D-s megjelenítés megszakadt. Frissítsd az oldalt az újrapróbáláshoz.');
        });
        const clock = new THREE.Clock();
        function animateScene() {
            requestAnimationFrame(animateScene);
            const bounds = cinematic.getBoundingClientRect();
            if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
            const time = motionPreference.matches ? 0 : clock.getElapsedTime();
            currentProgress += (targetProgress - currentProgress) * (motionPreference.matches ? 1 : 0.08);
            modelPivot.rotation.set(-0.2 + tiltAngle, -0.5 + currentProgress * Math.PI * 2 + dragAngle, -0.38);
            seeds.forEach((seed, index) => {
                positions[index * 3] = seed.x + Math.sin(time * 0.3 + index) * 0.12;
                positions[index * 3 + 1] = ((seed.y + time * seed.speed) % 9) - 4.5;
                positions[index * 3 + 2] = seed.z;
            });
            geometry.attributes.position.needsUpdate = true;
            backgroundMaterial.uniforms.time.value = time;
            backgroundMaterial.uniforms.progress.value = currentProgress;
            renderer.clear();
            renderer.render(background, backgroundCamera);
            renderer.clearDepth();
            renderer.render(scene, camera);
        }
        animateScene();
    } catch (error) {
        modelSource = null;
        console.error('A 3D-s bemutató nem indítható:', error);
        setSceneStatus('A 3D-s bemutató nem érhető el. Ellenőrizd az internetkapcsolatot és a WebGL támogatását.');
    }
}

startScene();
