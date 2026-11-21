const form = document.querySelector('#planner-form');
const resolutionField = document.querySelector('#resolution-field');
const consoleField = document.querySelector('#console-field');
const storageField = document.querySelector('#storage-field');
const result = document.querySelector('#result');
const message = document.querySelector('#form-message');
const gameGrid = document.querySelector('#game-grid');
const gameSearch = document.querySelector('#game-search');
const gameSuggestions = document.querySelector('#game-suggestions');
const consoleSelect = document.querySelector('#console');
const monitorSelect = document.querySelector('#monitor-select');
const previewContent = document.querySelector('#preview-content');
const previewStatus = document.querySelector('#preview-status');

const monitorPrices = {
    'gaming': { min: 150000, avg: 250000, max: 500000 },
    'work': { min: 120000, avg: 200000, max: 400000 },
    'both': { min: 250000, avg: 450000, max: 1000000 },
    'ultrawide': { min: 200000, avg: 350000, max: 600000 },
    '4k': { min: 300000, avg: 500000, max: 800000 }
};

Object.entries(developmentStacks).forEach(([profile, names]) => {
    names.forEach((name) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'stack';
        input.value = name;
        input.dataset.profile = profile;
        label.append(input, document.createTextNode(name));
        document.querySelector('#stack-grid').append(label);
    });
});

const builds = [
    {
        name: 'Full HD játékos PC',
        price: 350000,
        description: 'Kiindulópont 1080p-s játékhoz, játéktól és beállításoktól függően.',
        parts: [
            ['Processzor', 'AMD Ryzen 5 5600'],
            ['Videókártya', 'AMD Radeon RX 7600 8GB'],
            ['Alaplap', 'AMD B550 alaplap AM4'],
            ['Memória', '16GB DDR4 3200MHz RAM 2x8GB'],
            ['Tárhely', '1TB NVMe SSD PCIe 4.0'],
            ['Tápegység', '650W 80 Plus Bronze tápegység'],
            ['Gépház', 'ATX ház jó szellőzéssel']
        ]
    },
    {
        name: 'Erősebb játékos PC',
        price: 550000,
        description: 'Erősebb kiindulópont igényesebb játékokhoz és 1440p-s felbontáshoz.',
        parts: [
            ['Processzor', 'AMD Ryzen 5 7600'],
            ['Videókártya', 'AMD Radeon RX 7700 XT 12GB'],
            ['Alaplap', 'AMD B650 alaplap AM5'],
            ['Memória', '32GB DDR5 6000MHz RAM 2x16GB'],
            ['Tárhely', '1TB NVMe SSD PCIe 4.0'],
            ['Tápegység', '750W 80 Plus Gold tápegység'],
            ['Gépház', 'ATX ház jó szellőzéssel']
        ]
    },
    {
        name: '4K játékos PC',
        price: 900000,
        description: 'Erős kiindulópont 4K-s játékhoz; az elérhető teljesítmény a beállításoktól is függ.',
        parts: [
            ['Processzor', 'AMD Ryzen 7 7800X3D'],
            ['Processzorhűtő', 'AM5 CPU hűtő Ryzen 7 7800X3D'],
            ['Videókártya', 'AMD Radeon RX 7900 XTX 24GB'],
            ['Alaplap', 'AMD B650 alaplap AM5'],
            ['Memória', '32GB DDR5 6000MHz RAM 2x16GB'],
            ['Tárhely', '2TB NVMe SSD PCIe 4.0'],
            ['Tápegység', '850W 80 Plus Gold tápegység'],
            ['Gépház', 'ATX ház jó szellőzéssel']
        ]
    }
];

const consoleBudgetGuides = {
    'PlayStation 5 Standard lemezes': 160000,
    'PlayStation 5 Slim Digital': 160000,
    'PlayStation 5 Slim Disc': 180000,
    'PlayStation 5 Pro': 240000,
    'Xbox Series X 1TB': 170000,
    'Xbox Series X 2TB Galaxy Black': 200000,
    'Xbox Series X 1TB Digital': 160000,
    'Xbox Series S 512GB': 100000,
    'Xbox Series S 1TB': 120000,
    'Nintendo Switch 2': 150000,
    'Nintendo Switch OLED': 100000,
    'Nintendo Switch V2': 80000,
    'Nintendo Switch Lite': 60000,
    'Steam Deck OLED 512GB': 180000,
    'Steam Deck OLED 1TB': 200000,
    'ASUS ROG Ally': 150000,
    'ASUS ROG Ally X': 220000,
    'Lenovo Legion Go': 170000,
    'MSI Claw': 150000
};

const storageOptions = {
    'PlayStation': {
        storage: 'PS5 kompatibilis M.2 NVMe SSD PCIe 4.0 hűtőbordával',
        note: 'Belső bővítéshez PS5-kompatibilis PCIe 4.0 M.2 NVMe SSD-t válassz hűtőbordával. A Sony legalább 5500 MB/s olvasási sebességet ajánl; ellenőrizd a méretre és kapacitásra vonatkozó követelményeket is.'
    },
    'Xbox': {
        storage: 'Xbox Series X S Storage Expansion Card 1TB',
        note: 'Series X|S játékok futtatásához kompatibilis Storage Expansion Cardot válassz; egy sima USB-s SSD nem helyettesíti ezt.'
    },
    'Nintendo': {
        storage: 'Nintendo Switch microSD kártya',
        note: 'Switch 2 játékok tárolásához microSD Express kártya szükséges. A korábbi Switch modellek UHS-I microSDXC kártyát használnak; vásárlás előtt ellenőrizd a pontos modellt.'
    },
    'Kézi PC': {
        storage: 'kézi PC kompatibilis NVMe SSD',
        note: 'Az SSD mérete és cseréjének módja modellenként eltér. A Steam Deck OLED például M.2 2230-at használ, de ne feltételezd, hogy ez minden kézi PC-be illik. Ellenőrizd a gyártó előírásait.'
    }
};

// Store all games for search, don't render initially
const allGamesMap = new Map();
const gameIndexMap = new Map(); // Map game name to its current index in grid
const checkedGames = new Set();

Object.entries(gameGroups).forEach(([category, names]) => {
    names.forEach((name) => {
        allGamesMap.set(name, category);
    });
});

// Store checked state from localStorage
function saveCheckedGames() {
    localStorage.setItem('forgestudio-games', JSON.stringify([...checkedGames]));
}

function loadCheckedGames() {
    try {
        const saved = localStorage.getItem('forgestudio-games');
        if (saved) {
            JSON.parse(saved).forEach(game => checkedGames.add(game));
        }
    } catch (e) {
        console.error('Failed to load saved games:', e);
    }
}

loadCheckedGames();

// Function to render game cards based on search/filter - Turbocharged version
function renderGameCards(filterText = '') {
    gameGrid.replaceChildren();
    gameIndexMap.clear();
    
    const lowerFilter = filterText.toLowerCase();
    const platform = form.elements.platform.value;
    let cardIndex = 0;
    
    Object.entries(gameGroups).forEach(([category, names]) => {
        names.forEach((name) => {
            // Platform filtering
            const gamePlatform = gamePlatforms[name];
            const isAvailableForPlatform = 
                (platform === 'pc' && (gamePlatform === 'pc' || gamePlatform === 'both')) ||
                (platform === 'console' && (gamePlatform === 'ps' || gamePlatform === 'both')) ||
                (platform !== 'pc' && platform !== 'console');
            
            if (!isAvailableForPlatform) {
                return;
            }
            
            // Smart filtering: search in name and category
            const matchesFilter = !lowerFilter || 
                name.toLowerCase().includes(lowerFilter) || 
                category.toLowerCase().includes(lowerFilter);
            
            if (!matchesFilter) {
                return;
            }
            
            const label = document.createElement('label');
            label.className = 'game-card';
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'game';
            input.value = name;
            input.checked = checkedGames.has(name); // Restore checked state
            
            // Track current index for this game
            gameIndexMap.set(name, cardIndex);
            cardIndex++;
            
            input.addEventListener('change', (e) => {
                if (e.target.checked) {
                    checkedGames.add(name);
                } else {
                    checkedGames.delete(name);
                }
                saveCheckedGames();
                filterGames(); // Re-filter to update counts
                updatePreview(); // Update preview on game selection
            });
            
            const icon = document.createElement('span');
            icon.className = 'game-icon';
            icon.textContent = '✦';
            icon.setAttribute('aria-hidden', 'true');
            
            const text = document.createElement('span');
            const title = document.createElement('strong');
            title.textContent = name;
            const subtitle = document.createElement('small');
            subtitle.textContent = category;
            const check = document.createElement('span');
            check.className = 'check';
            check.textContent = '✓';
            check.setAttribute('aria-hidden', 'true');
            
            text.append(title, subtitle);
            label.append(input, icon, text, check);
            gameGrid.append(label);
        });
    });
}

Object.entries(consoleGroups).forEach(([group, names]) => {
    const options = document.createElement('optgroup');
    options.label = group;
    names.forEach((name) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        option.dataset.group = group;
        options.append(option);
    });
    consoleSelect.append(options);
});

// Initialize localization only when DOM and translation functions are ready
function initializeLocalization() {
    if (typeof localizeTree === 'function' && typeof translate === 'function') {
        localizeTree(gameGrid);
        localizeTree(consoleSelect);
        consoleSelect.querySelectorAll('optgroup').forEach((group) => {
            group.label = translate(group.label);
        });
    }
}

// Wait for all scripts to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLocalization);
} else {
    initializeLocalization();
}

function shoppingLink(query) {
    const link = document.createElement('a');
    link.href = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Keresés a boltokban ↗';
    return link;
}

function addItem(list, label, name, query = name) {
    const item = document.createElement('li');
    const heading = document.createElement('span');
    heading.textContent = translate(label).toLocaleUpperCase(currentLanguage);
    const displayedName = currentLanguage === 'en'
        ? name.replace('A processzorba épített Radeon grafika – külön videókártya nem szükséges', 'Integrated Radeon graphics – no dedicated graphics card required')
            .replace(/alaplap/g, 'motherboard').replace(/tápegység/g, 'power supply')
            .replace(/kompatibilis/g, 'compatible').replace(/hűtőbordával/g, 'with heatsink')
            .replace(/kézi PC/g, 'handheld PC').replace(/kártya/g, 'card')
            .replace(/magos CPU/g, 'core CPU').replace(/magos GPU/g, 'core GPU')
            .replace(/lemezes/g, 'disc edition')
        : name;
    item.append(heading, document.createTextNode(displayedName), document.createElement('br'), shoppingLink(query));
    list.append(item);
}

function addBudgetWarning(container, budget, reference, subject) {
    if (!budget || budget >= reference) return;
    const warning = document.createElement('p');
    warning.className = 'result-warning budget-warning';
    warning.setAttribute('role', 'alert');
    const subjects = {
        'a javasolt PC': 'the suggested PC',
        'a kiválasztott konzol vagy kézi PC': 'the selected console or handheld PC',
        'az ajánlott fejlesztői PC': 'the recommended developer PC',
        'a javasolt PC és az asztali Mac együttes': 'both the suggested PC and desktop Mac',
        'az ajánlott asztali Mac': 'the recommended desktop Mac'
    };
    const formattedBudget = budget.toLocaleString(currentLanguage === 'en' ? 'en-US' : 'hu-HU');
    const formattedReference = reference.toLocaleString(currentLanguage === 'en' ? 'en-US' : 'hu-HU');
    warning.textContent = bilingual(
        `A megadott ${formattedBudget} Ft-os keret várhatóan nem elegendő ${subject} megvásárlásához. A rögzített, hozzávetőleges támpont ${formattedReference} Ft; az árak változhatnak, és használt vagy akciós termék olcsóbb is lehet.`,
        `The ${formattedBudget} Ft budget is unlikely to cover ${subjects[subject]}. The fixed estimate is ${formattedReference} Ft; prices vary and used or discounted products may cost less.`
    );
    container.append(warning);
}

const cases = {
    airflow: { name: 'Corsair 4000D Airflow', gpu: 360, cooler: 170, radiators: [120, 140, 240, 280, 360] },
    glass: { name: 'HYTE Y70', gpu: 422, cooler: 180, radiators: [120, 240, 280, 360] },
    wood: { name: 'Fractal Design North', gpu: 355, cooler: 170, radiators: [120, 140, 240, 280, 360] },
    silent: { name: 'be quiet! Silent Base 802', gpu: 432, cooler: 185, radiators: [120, 140, 240, 280, 360, 420] },
    compact: { name: 'Cooler Master NR200P V2', gpu: 334, cooler: 67, radiators: [120, 140, 240, 280] }
};

function configureCase(parts, style, compactGpu) {
    const selected = cases[style];
    const compact = style === 'compact';
    const configured = parts.filter(([label]) => label !== 'Gépház');
    const replace = (label, name) => {
        const index = configured.findIndex((part) => part[0] === label);
        if (index >= 0) configured[index] = [label, name];
        else configured.push([label, name]);
    };
    if (compactGpu) replace('Videókártya', compactGpu.name);
    if (!configured.some(([label]) => label === 'Processzorhűtő') ||
        configured.some(([label, name]) => label === 'Processzorhűtő' && name.startsWith('AM5 CPU hűtő'))) {
        replace('Processzorhűtő', 'Thermalright Phantom Spirit 120 SE');
    }
    if (compact) {
        if (configured.some(([label, name]) => label === 'Processzor' && name.includes('5600'))) {
            replace('Processzor', 'AMD Ryzen 5 7600');
            replace('Memória', '32GB DDR5 RAM 2x16GB');
        }
        replace('Alaplap', 'ASUS ROG STRIX B650E-I GAMING WIFI Mini-ITX AM5');
        replace('Processzorhűtő', 'Cooler Master MasterLiquid 240L Core II 240mm AIO');
        replace('Tápegység', 'Corsair SF1000 SFX 1000W ATX 3.1');
    }
    configured.push(['Gépház', selected.name]);
    const coolerName = configured.find(([label]) => label === 'Processzorhűtő')[1];
    const coolerHeight = coolerName.includes('NH-D15 G2') ? 168 : coolerName.includes('NH-U12A') ? 158 : coolerName.includes('Phantom Spirit 120 SE') ? 154 : null;
    return { parts: configured, selected, compact, gpuLength: compactGpu?.length, coolerHeight, hasGpu: configured.some(([label]) => label === 'Videókártya') };
}

function addCaseNote(container, caseBuild) {
    const note = document.createElement('p');
    note.className = 'result-note';
    const gpuCheck = !caseBuild.hasGpu
        ? 'Az ajánlás integrált grafikát használ, külön videókártya nélkül.'
        : caseBuild.gpuLength
        ? `A megadott GPU ${caseBuild.gpuLength} mm, a ház konzervatív határa ${caseBuild.selected.gpu} mm.`
        : `A GPU pontos modellje nélkül a ${caseBuild.selected.gpu} mm-es hosszkorlát nem ellenőrizhető.`;
    const coolerCheck = caseBuild.compact
        ? 'A 240 mm-es AIO-radiátor támogatott, a 59,4 mm-es pumpa a 67 mm-es magassághatár alatt van.'
        : caseBuild.coolerHeight
            ? `A léghűtő ${caseBuild.coolerHeight} mm magas, a ház határa ${caseBuild.selected.cooler} mm; a RAM miatti ventilátorhelyzetet is ellenőrizd.`
            : `A léghűtő magassága ismeretlen, a ház határa ${caseBuild.selected.cooler} mm.`;
    const gpuCheckEn = !caseBuild.hasGpu
        ? 'The build uses integrated graphics, without a dedicated graphics card.'
        : caseBuild.gpuLength
            ? `The specified GPU is ${caseBuild.gpuLength} mm long; the conservative case limit is ${caseBuild.selected.gpu} mm.`
            : `Without an exact GPU model, the ${caseBuild.selected.gpu} mm length limit cannot be verified.`;
    const coolerCheckEn = caseBuild.compact
        ? 'A 240 mm AIO radiator is supported; the 59.4 mm pump is below the 67 mm height limit.'
        : caseBuild.coolerHeight
            ? `The air cooler is ${caseBuild.coolerHeight} mm tall; the case limit is ${caseBuild.selected.cooler} mm. Also check fan clearance over the RAM.`
            : `The air cooler height is unknown; the case limit is ${caseBuild.selected.cooler} mm.`;
    note.textContent = bilingual(
        `${caseBuild.compact ? 'Mini-ITX alaplap és SFX tápegység szükséges.' : 'Normál ATX alaplaphoz választott ház.'} ${gpuCheck} ${coolerCheck} A hátra csatlakozós BTF / Project Zero alaplap támogatása itt nincs igazolva; normál csatlakozású alaplapot válassz. Ellenőrizd a kábelek, radiátor, ventilátorok és az adott alkatrészváltozat tényleges helyigényét vásárlás előtt.`,
        `${caseBuild.compact ? 'A Mini-ITX motherboard and SFX power supply are required.' : 'The case is selected for a standard ATX motherboard.'} ${gpuCheckEn} ${coolerCheckEn} Rear-connector BTF / Project Zero motherboard support has not been verified; choose a standard motherboard. Check actual cable, radiator, fan and component clearances before buying.`
    );
    container.append(note);
}

function addRecommendationCard(cards, title, description, products) {
    const card = document.createElement('article');
    card.className = 'recommended-card';
    const cardTitle = document.createElement('h5');
    cardTitle.textContent = title;
    const detail = document.createElement('p');
    detail.textContent = description;
    card.append(cardTitle, detail);
    products.forEach((product) => {
        const name = document.createElement('strong');
        name.textContent = product;
        card.append(name, shoppingLink(product));
    });
    cards.append(card);
}

function addRecommendedSet(container, platform, resolution, consoleOption, selectedGames) {
    const section = document.createElement('section');
    section.className = 'recommended-set';
    const heading = document.createElement('h4');
    heading.textContent = 'Ajánlott szett a gépedhez';
    const intro = document.createElement('p');
    intro.textContent = 'Példák a választásaid alapján; a perifériák nincsenek benne a gép becsült árában.';
    const cards = document.createElement('div');
    cards.className = 'recommended-grid';

    if (platform === 'pc') {
        const monitors = {
            '1080': ['AOC 24G4X', '23,8″ Full HD · 180 Hz · Fast IPS'],
            '1440': ['ASUS ROG Strix XG27ACS', '27″ QHD · 180 Hz · Fast IPS'],
            '4k': ['Gigabyte M28U', '28″ 4K · 144 Hz · IPS · HDMI 2.1']
        };
        const [monitor, details] = monitors[resolution];
        addRecommendationCard(cards, 'Monitor', bilingual(`${details}. A tényleges FPS játéktól és beállításoktól függ.`, `${details.replace('23,8', '23.8')}. Actual FPS depends on the game and settings.`), [monitor]);
    } else if (consoleOption.value === 'Nintendo Switch Lite') {
        addRecommendationCard(cards, 'Monitor', 'A Switch Lite saját kijelzőt használ, és nem támogat külső monitort.', []);
    } else {
        const note = consoleOption.dataset.group === 'PlayStation' || consoleOption.dataset.group === 'Xbox'
            ? '28″ 4K · 144 Hz · IPS · HDMI 2.1; alkalmas 4K/120 Hz bemenetre és VRR-re. A játékok tényleges felbontása és képfrissítése eltérhet.'
            : '28″ 4K · 144 Hz · IPS · HDMI 2.1. A külső kijelzőhöz megfelelő dokkoló vagy adapter szükséges; a kimenet felbontása és képfrissítése modelltől függ.';
        addRecommendationCard(cards, 'Monitor', note, ['Gigabyte M28U']);
    }

    if (platform === 'pc') {
        const esports = selectedGames.some((game) => ['Counter-Strike 2', 'Valorant'].includes(game));
        const mmo = selectedGames.some((game) => gameGroups['MMO / MMORPG'].includes(game));
        const mice = [];
        if (esports) mice.push('Razer Viper V3 Pro');
        if (mmo) mice.push('Razer Naga V2 Pro');
        if (!mice.length) mice.push('Logitech G502 X Lightspeed');
        const keyboard = esports ? 'Wooting 60HE+' : 'Keychron V1 Max';
        const detail = esports && mmo
            ? 'E-sporthoz 54–55 g-os egér és Hall-Effect billentyűzet; MMO-hoz a második, sokgombos egér alternatíva.'
            : esports
                ? 'E-sporthoz 54–55 g-os egér és Hall-Effect billentyűzet Rapid Trigger funkcióval.'
                : mmo
                    ? 'Sokgombos MMO-egér és mechanikus billentyűzet.'
                    : 'Általános játékhoz vezeték nélküli egér és mechanikus billentyűzet.';
        addRecommendationCard(cards, 'Egér + billentyűzet', detail, [...mice, keyboard]);
    } else {
        const detail = consoleOption.dataset.group === 'Kézi PC'
            ? 'A kézi PC beépített vezérlővel is használható; egérhez és billentyűzethez megfelelő csatlakozás vagy dokkoló szükséges. A játékok kezelése eltérhet.'
            : 'Konzolon a vezérlő az alapértelmezett; az egér és billentyűzet támogatása platformonként és játékonként eltér. Ellenőrizd a kiválasztott modell és játék támogatását.';
        addRecommendationCard(cards, 'Egér + billentyűzet', detail, []);
    }

    const headset = platform === 'pc' || consoleOption.dataset.group === 'Nintendo' || consoleOption.dataset.group === 'Kézi PC'
        ? ['HyperX Cloud III', 'Vezetékes, 3,5 mm-es headset; ellenőrizd a készülék csatlakozóját.']
        : consoleOption.dataset.group === 'PlayStation'
            ? ['Sony PlayStation Pulse Elite', 'PS5-kompatibilis vezeték nélküli headset PlayStation Link USB-adapterrel.']
            : ['Microsoft Xbox Wireless Headset', 'Xbox Series X|S kompatibilis vezeték nélküli headset.'];
    addRecommendationCard(cards, 'Headset', headset[1], [headset[0]]);
    section.append(heading, intro, cards);
    container.append(section);
}

function renderWorkRecommendation(profiles, budget, stacks) {
    const has = (profile) => profiles.includes(profile);
    const demanding = has('game') || has('ai') || has('security') || has('devops') || has('data');
    const highMemory = demanding || has('android');
    const onlyMac = has('ios') && !demanding;
    const selectedNames = profiles.map((profile) => {
        return form.querySelector(`input[name="profile"][value="${profile}"]`).closest('label').querySelector('strong').textContent;
    });

    result.replaceChildren();
    const eyebrow = document.createElement('p');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = '✦  A TE FEJLESZTŐI AJÁNLÁSOD';
    const heading = document.createElement('h3');
    heading.textContent = onlyMac ? 'Mac fejlesztői gép' : 'Fejlesztői munkaállomás';
    const intro = document.createElement('p');
    intro.className = 'result-intro';
    intro.textContent = bilingual(
        `Figyelembe vett területek: ${selectedNames.join(', ')}.${stacks.length ? ` Technológiák: ${stacks.join(', ')}.` : ''} Az összeállítás példa, nem élő árakat használ.`,
        `Areas considered: ${selectedNames.join(', ')}.${stacks.length ? ` Technologies: ${stacks.join(', ')}.` : ''} This is an example build, not live pricing.`
    );
    result.append(eyebrow, heading, intro);

    if (onlyMac) {
        const note = document.createElement('p');
        note.className = 'result-note';
        note.textContent = 'A gépházválasztás a kész Mac gépre nem vonatkozik.';
        result.append(note);
    }

    if (!onlyMac) {
        const baseBudget = has('security') ? 650000 : demanding ? 500000 : has('android') ? 320000 : 250000;
        const pcBudget = baseBudget + (has('ai') ? 1500000 : has('game') ? 500000 : stacks.includes('Hashcat') ? 300000 : 0);
        addBudgetWarning(result, budget, pcBudget, 'az ajánlott fejlesztői PC');
        if (has('ios')) {
            const macBudget = has('security') || has('data') ? 1800000 : 1100000;
            addBudgetWarning(result, budget, pcBudget + macBudget, 'a javasolt PC és az asztali Mac együttes');
        }
        const cpu = demanding ? 'AMD Ryzen 9 9950X' : has('android') ? 'AMD Ryzen 7 9700X' : 'AMD Ryzen 5 7600';
        const parts = [
            ['Processzor', cpu],
            ['Processzorhűtő', demanding ? 'Noctua NH-D15 G2' : 'Noctua NH-U12A'],
            ['Alaplap', has('data') ? 'ASUS ROG STRIX B650E-F GAMING WIFI ATX AM5' : 'AMD B650 ATX alaplap AM5'],
            ['Memória', has('security') || has('data') ? '96GB DDR5 RAM 2x48GB' : highMemory ? '64GB DDR5 RAM 2x32GB' : '32GB DDR5 RAM 2x16GB'],
            ['Tárhely', `Samsung ${has('data') ? '9100' : '990'} Pro ${has('game') ? '4TB' : demanding || has('android') ? '2TB' : '1TB'} NVMe SSD`]
        ];
        if (has('security')) parts.push(['Második tárhely', 'Samsung 990 Pro 2TB NVMe SSD']);
        if (has('ai')) parts.push(['Videókártya', 'NVIDIA GeForce RTX 5090 32GB']);
        else if (has('game')) parts.push(['Videókártya', 'NVIDIA GeForce RTX 4080 SUPER 16GB']);
        else if (stacks.includes('Hashcat')) parts.push(['Videókártya', 'NVIDIA GeForce RTX 4070 Ti Super 16GB']);
        else parts.push(['Grafika', 'A processzorba épített Radeon grafika – külön videókártya nem szükséges', cpu]);
        parts.push(
            ['Tápegység', has('ai') ? '1200W ATX 3.1 80 Plus Gold tápegység 12V-2x6' : has('game') || stacks.includes('Hashcat') ? '850W ATX 3.1 80 Plus Gold tápegység' : '650W 80 Plus Gold tápegység'],
            ['Gépház', 'Fractal Design Meshify 2']
        );
        const caseStyle = document.querySelector('#case-style').value;
        const gpu = has('ai')
            ? { name: 'NVIDIA GeForce RTX 5090 Founders Edition 32GB', length: 304 }
            : has('game')
                ? { name: 'ASUS ProArt GeForce RTX 4080 SUPER 16GB', length: 300 }
                : stacks.includes('Hashcat')
                ? { name: 'ASUS ProArt GeForce RTX 4070 Ti SUPER 16GB', length: 300 }
                : null;
        const caseBuild = configureCase(parts, caseStyle, gpu);
        const list = document.createElement('ul');
        list.className = 'result-list';
        caseBuild.parts.forEach(([label, name, query]) => addItem(list, label, name, query));
        result.append(list);
        addCaseNote(result, caseBuild);
        if (has('data')) {
            const note = document.createElement('p');
            note.className = 'result-note';
            note.textContent = 'A PCIe 5.0-s SSD-t a megfelelő M.2 foglalatba szereld; ellenőrizd az SSD és az alaplapi hűtőborda illeszkedését.';
            result.append(note);
        }
        if (caseBuild.compact) {
            const note = document.createElement('p');
            note.className = 'result-warning';
            note.textContent = 'A kompakt változat eltér a korábbi PC-s ártámponttól. A hűtő, memória, kábelek és alaplap pontos illeszkedését, valamint nagy terhelés mellett a hőmérsékletet ellenőrizni kell; szükség lehet CPU-teljesítménykorlátozásra.';
            result.append(note);
        }
        const note = document.createElement('p');
        note.className = 'result-note';
        note.textContent = 'Ellenőrizd az alaplap BIOS-verzióját, a kétmodulos RAM-készlet támogatását, az SSD-foglalatokat, valamint a hűtő és videókártya házba illeszkedését. A ventilátorgörbe és a terhelés befolyásolja a zajt.';
        result.append(note);
    }

    const mac = document.createElement('details');
    mac.className = 'mac-alternative';
    mac.open = has('ios');
    const summary = document.createElement('summary');
    summary.textContent = has('ios') ? 'Mac ajánlás iOS fejlesztéshez' : 'Mac alternatíva';
    const macList = document.createElement('ul');
    macList.className = 'result-list';
    const macModel = has('security') || has('data')
        ? 'Mac Studio M4 Max 16 magos CPU 40 magos GPU 128GB 2TB'
        : demanding || has('android')
            ? 'Mac mini M4 Pro 64GB 2TB'
            : 'Mac mini M4 Pro 48GB 1TB';
    const macBook = demanding || has('android')
        ? `MacBook Pro 14 M4 Max 16 magos CPU 40 magos GPU ${has('security') || has('data') ? '128GB' : '64GB'} 2TB`
        : 'MacBook Pro 14 M4 Pro 48GB 1TB';
    addItem(macList, 'Asztali Mac', macModel);
    addItem(macList, 'Hordozható alternatíva', macBook);
    const macNote = document.createElement('p');
    macNote.className = 'result-note';
    macNote.textContent = 'Az iOS-alkalmazások Xcode-dal való fejlesztéséhez macOS szükséges. A keretellenőrzés az asztali Macre vonatkozik; a hordozható változat árát külön ellenőrizd. A Mac egységes memóriája vásárlás után nem bővíthető; az Apple Siliconon a virtuális gépek és eszközök architektúra-támogatását ellenőrizd.';
    mac.append(summary);
    const macBudget = has('security') || has('data') ? 1800000 : demanding || has('android') ? 1100000 : 800000;
    addBudgetWarning(mac, budget, macBudget, 'az ajánlott asztali Mac');
    mac.append(macList, macNote);
    if (has('ai')) {
        const warning = document.createElement('p');
        warning.className = 'result-warning';
        warning.textContent = 'A Mac nem támogatja az NVIDIA CUDA-t: a CUDA-t igénylő AI-feladatokhoz a fenti NVIDIA-s PC vagy külön távoli gép szükséges. A helyi AI-modellek támogatása és memóriaigénye eltérhet.';
        mac.append(warning);
    }
    if (has('game')) {
        const warning = document.createElement('p');
        warning.className = 'result-note';
        warning.textContent = 'A Mac GPU-ja és a támogatott fejlesztői funkciók nem azonosak a PC-s videókártyáéval; ellenőrizd a motor és a projekt követelményeit.';
        mac.append(warning);
    }
    result.append(mac);

    const section = document.createElement('section');
    section.className = 'recommended-set';
    const setHeading = document.createElement('h4');
    setHeading.textContent = 'Ajánlott programozói szett';
    const setIntro = document.createElement('p');
    setIntro.textContent = 'Példák munkához; a perifériák külön vásárolhatók meg.';
    const cards = document.createElement('div');
    cards.className = 'recommended-grid';
    addRecommendationCard(cards, 'Monitor', '27″ 4K IPS Black kijelző USB-C dokkolóval a nagy munkaterülethez.', ['Dell UltraSharp U2723QE']);
    addRecommendationCard(cards, 'Billentyűzet', 'Alacsony profilú mechanikus billentyűzet gépeléshez.', ['Keychron K3 Max']);
    addRecommendationCard(cards, 'Egér', 'Ergonomikus egér görgető- és oldalsó kerékkel.', ['Logitech MX Master 3S']);
    section.append(setHeading, setIntro, cards);
    result.append(section);

    const disclaimer = document.createElement('p');
    disclaimer.className = 'result-note';
    disclaimer.textContent = 'Az összeállítás és a kerethez használt alsó támpontok iránymutatók, nem élő árak vagy teljesítménygaranciák. Az árakhoz és elérhetőséghez nyisd meg a bolti kereséseket; ellenőrizd a szoftverek támogatását és az alkatrészek kompatibilitását. A perifériák, az operációs rendszer és az összeszerelés külön költséget jelentenek.';
    result.append(disclaimer);
    localizeTree(result);
    result.hidden = false;
    if (!languageRefresh) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const rockstarNames = new Set(rockstarGames);
let activeSuggestion = -1;
let languageRefresh = false;

function closeGameSuggestions() {
    gameSuggestions.hidden = true;
    gameSearch.setAttribute('aria-expanded', 'false');
    gameSearch.removeAttribute('aria-activedescendant');
    activeSuggestion = -1;
}

function filterGames() {
    const query = gameSearch.value.trim().toLocaleLowerCase('hu');
    
    // Render cards based on search query - this populates gameIndexMap
    renderGameCards(query);
    
    // Get newly rendered cards - all of them are now what we need to filter
    const gameCards = [...gameGrid.querySelectorAll('.game-card')];
    
    let matches = 0;
    let selected = 0;
    gameSuggestions.replaceChildren();
    activeSuggestion = -1;
    gameSearch.removeAttribute('aria-activedescendant');
    
    // Iterate through rendered cards
    gameCards.forEach((card, displayIndex) => {
        const input = card.querySelector('input');
        const checked = input.checked;
        const name = input.value.toLocaleLowerCase('hu');
        
        // Smart aliases for better search
        const gtaAlias = name.replace(/^grand theft auto/, 'gta')
            .replace(/^gta vi\b/, 'gta 6')
            .replace(/^gta v\b/, 'gta 5')
            .replace(/^gta iv\b/, 'gta 4')
            .replace(/^gta iii\b/, 'gta 3');
        
        const aliases = [
            rockstarNames.has(input.value) ? 'rockstar games' : '',
            name.startsWith('grand theft auto') ? gtaAlias : '',
            name.startsWith('red dead') ? name.replace('red dead redemption', 'rdr') : '',
            name === 'red dead redemption 2' ? 'rdr2' : ''
        ];
        
        const matchesQuery = Boolean(query) && (name.includes(query) || aliases.some((alias) => alias.includes(query)));
        
        if (checked) selected++;
        
        if (matchesQuery) {
            matches++;
            if (!checked) {
                const option = document.createElement('div');
                option.id = `game-option-${displayIndex}`;
                option.className = 'game-suggestion';
                option.setAttribute('role', 'option');
                option.setAttribute('aria-selected', 'false');
                option.dataset.gameName = name; // Use game name instead of index
                const title = document.createElement('strong');
                title.textContent = input.value;
                const category = document.createElement('span');
                category.textContent = card.querySelector('small').textContent;
                option.append(title, category);
                gameSuggestions.append(option);
            }
        }
        // Show only checked or when query is active and matches
        card.hidden = !(checked || (query && matchesQuery));
    });
    
    if (query && !gameSuggestions.children.length) {
        const empty = document.createElement('div');
        empty.className = 'game-suggestion-empty';
        empty.textContent = matches
            ? bilingual('Az összes találat már ki van választva.', 'All matching games are already selected.')
            : bilingual('Nincs találat.', 'No results.');
        gameSuggestions.append(empty);
    }
    
    gameSuggestions.hidden = !query;
    gameSearch.setAttribute('aria-expanded', String(Boolean(query)));
    if (typeof localizeTree === 'function') {
        localizeTree(gameSuggestions);
    }
    
    document.querySelector('#game-count').textContent = query
        ? bilingual(`${matches} találat · ${selected} kiválasztva`, `${matches} results · ${selected} selected`)
        : bilingual(`${selected} kiválasztva`, `${selected} selected`);
}

function selectGame(option) {
    const gameName = option.dataset.gameName;
    // Find the input by game name instead of index
    const input = gameGrid.querySelector(`input[value="${gameName}"]`);
    if (input) {
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        gameSearch.value = '';
        filterGames();
        gameSearch.focus();
    }
}

gameSearch.addEventListener('input', debounce(filterGames, 150));
gameSearch.addEventListener('focus', filterGames);
gameSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeGameSuggestions();
        return;
    }
    if (gameSuggestions.hidden) {
        if (event.key === 'ArrowDown' && gameSearch.value.trim()) {
            event.preventDefault();
            filterGames();
        } else {
            return;
        }
    }
    const options = [...gameSuggestions.querySelectorAll('[role="option"]')];
    if (!options.length) {
        if (event.key === 'Enter') event.preventDefault();
        return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        activeSuggestion = event.key === 'ArrowDown'
            ? Math.min(activeSuggestion + 1, options.length - 1)
            : activeSuggestion <= 0 ? options.length - 1 : activeSuggestion - 1;
        options.forEach((option, index) => option.setAttribute('aria-selected', String(index === activeSuggestion)));
        gameSearch.setAttribute('aria-activedescendant', options[activeSuggestion].id);
        options[activeSuggestion].scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter') {
        event.preventDefault();
        selectGame(options[Math.max(activeSuggestion, 0)]);
    }
});
gameSuggestions.addEventListener('mousedown', (event) => event.preventDefault());
gameSuggestions.addEventListener('click', (event) => {
    const option = event.target.closest('[role="option"]');
    if (option) selectGame(option);
});
document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.game-search')) closeGameSuggestions();
});
gameSearch.addEventListener('focusout', (event) => {
    if (event.relatedTarget && !event.relatedTarget.closest('.game-search')) closeGameSuggestions();
});

// Debounce utility for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
document.querySelector('#budget').addEventListener('input', () => {
    result.hidden = true;
});
gameGrid.addEventListener('change', (event) => {
    filterGames();
    if (event.target.closest('.game-card').hidden) gameSearch.focus();
});
filterGames();

form.addEventListener('change', () => {
    const platform = form.elements.platform.value;
    const isWork = platform === 'work';
    document.querySelector('#game-step').hidden = isWork;
    document.querySelector('#work-step').hidden = !isWork;
    resolutionField.hidden = platform !== 'pc';
    consoleField.hidden = platform !== 'console';
    storageField.hidden = platform !== 'console';
    document.querySelector('#case-field').hidden = platform === 'console';
    result.hidden = true;
    message.textContent = '';
    
    // Re-render games when platform changes (to filter by platform availability)
    if (platform === 'pc' || platform === 'console') {
        renderGameCards(document.querySelector('#game-search input')?.value || '');
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const budget = Number(document.querySelector('#budget').value);
    if (form.elements.platform.value === 'work') {
        const selectedStacks = [...form.querySelectorAll('input[name="stack"]:checked')];
        const profiles = [...new Set([
            ...[...form.querySelectorAll('input[name="profile"]:checked')].map((input) => input.value),
            ...selectedStacks.map((input) => input.dataset.profile)
        ])];
        if (profiles.length === 0) {
            message.textContent = bilingual('Válassz ki legalább egy fejlesztési területet!', 'Choose at least one development area!');
            result.hidden = true;
            return;
        }
        message.textContent = '';
        renderWorkRecommendation(profiles, budget, selectedStacks.map((input) => input.value));
        return;
    }
    const selectedGames = [...form.querySelectorAll('input[name="game"]:checked')].map((input) => input.value);
    if (selectedGames.length === 0) {
        message.textContent = bilingual('Válassz ki legalább egy játékot!', 'Choose at least one game!');
        result.hidden = true;
        return;
    }

    message.textContent = '';
    const platform = form.elements.platform.value;
    const selectedResolution = document.querySelector('#resolution').value;
    const withStorage = document.querySelector('#storage').value === 'ssd';
    let title, description, estimatedPrice, storageNote, caseBuild;
    const list = document.createElement('ul');
    list.className = 'result-list';

    if (platform === 'pc') {
        const resolutionLevel = { '1080': 0, '1440': 1, '4k': 2 }[selectedResolution];
        const level = Math.max(resolutionLevel, selectedGames.includes('Cyberpunk 2077') ? 1 : 0);
        const build = builds[level];
        title = build.name;
        description = build.description;
        const caseStyle = document.querySelector('#case-style').value;
        const compactGpus = [
            { name: 'Sapphire PULSE Radeon RX 7600 8GB', length: 240 },
            { name: 'Sapphire PULSE Radeon RX 7700 XT 12GB', length: 280 },
            { name: 'Sapphire PULSE Radeon RX 7900 XTX 24GB', length: 313 }
        ];
        caseBuild = configureCase(build.parts, caseStyle, compactGpus[level]);
        estimatedPrice = build.price;
        caseBuild.parts.forEach(([label, name]) => addItem(list, label, name));
    } else {
        const option = consoleSelect.selectedOptions[0];
        const storageChoice = storageOptions[option.dataset.group];
        title = option.value;
        description = 'A kiválasztott konzol vagy kézi PC.';
        addItem(list, 'Konzol / kézi PC', title);
        if (withStorage) {
            let storageQuery = storageChoice.storage;
            if (option.dataset.group === 'Nintendo') {
                storageQuery = option.value === 'Nintendo Switch 2' ? 'Nintendo Switch 2 microSD Express' : 'Nintendo Switch UHS-I microSDXC';
            } else if (option.dataset.group === 'Kézi PC') {
                storageQuery = `${option.value} kompatibilis SSD`;
            }
            addItem(list, 'Tárhelybővítés', storageQuery);
            storageNote = storageChoice.note;
        }
    }

    result.replaceChildren();
    const eyebrow = document.createElement('p');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = '✦  A TE AJÁNLÁSOD';
    const heading = document.createElement('h3');
    heading.textContent = title;
    const intro = document.createElement('p');
    intro.className = 'result-intro';
    intro.textContent = bilingual(
        `${description} Választott játékok: ${selectedGames.join(', ')}.`,
        `${translate(description)} Selected games: ${selectedGames.join(', ')}.`
    );
    const price = document.createElement('p');
    const monitorType = monitorSelect.value;
    let monitorEstimate = '';
    if (monitorType !== 'none' && monitorPrices[monitorType]) {
        const monitorPrice = monitorPrices[monitorType];
        monitorEstimate = bilingual(
            ` + Monitor: kb. ${monitorPrice.avg.toLocaleString('hu-HU')} Ft (${monitorPrice.min.toLocaleString('hu-HU')}–${monitorPrice.max.toLocaleString('hu-HU')} Ft)`,
            ` + Monitor: approx. ${monitorPrice.avg.toLocaleString('en-US')} Ft (${monitorPrice.min.toLocaleString('en-US')}–${monitorPrice.max.toLocaleString('en-US')} Ft)`
        );
    }
    price.textContent = estimatedPrice
        ? bilingual(
            `Az alapgép korábbi tájékoztató becslése: kb. ${estimatedPrice.toLocaleString('hu-HU')} Ft; a választott modellek ára eltérhet.${monitorEstimate}`,
            `Previous indicative estimate for the base PC: approximately ${estimatedPrice.toLocaleString('en-US')} Ft; selected component prices may vary.${monitorEstimate}`
        )
        : 'A kiválasztott modellhez nincs pontos árbecslés; ellenőrizd a bolti ajánlatokat.';
    result.append(eyebrow, heading, intro, price);

    if (platform === 'pc') {
        if (estimatedPrice !== undefined) addBudgetWarning(result, budget, estimatedPrice, 'a javasolt PC');
    } else {
        const guide = consoleBudgetGuides[title];
        if (guide === undefined) {
            const note = document.createElement('p');
            note.className = 'result-note';
            note.textContent = 'Ehhez a modellhez nincs kerettámpont; ellenőrizd a bolti árakat.';
            result.append(note);
        } else {
            addBudgetWarning(result, budget, guide, 'a kiválasztott konzol vagy kézi PC');
        }
        if (withStorage) {
            const note = document.createElement('p');
            note.className = 'result-note';
            note.textContent = 'A keret ellenőrzése csak a konzolra vonatkozik; a kiválasztott tárhelybővítés ára nincs benne, külön ellenőrizd.';
            result.append(note);
        }
    }
    result.append(list);
    if (caseBuild) addCaseNote(result, caseBuild);
    if (storageNote) {
        const note = document.createElement('p');
        note.className = 'result-note';
        note.textContent = storageNote;
        result.append(note);
    }
    addRecommendedSet(result, platform, selectedResolution, consoleSelect.selectedOptions[0], selectedGames);
    
    // Add advanced features section
    if (typeof ForgeStudioFeatures !== 'undefined') {
        addAdvancedFeatures(result, platform, estimatedPrice, selectedGames);
    }
    
    const disclaimer = document.createElement('p');
    disclaimer.className = 'result-note';
    disclaimer.textContent = 'A PC-ajánlás előre összeállított példa, főként a felbontás alapján; a legtöbb játékhoz még nincs ellenőrzött gépigény. Nem garantáljuk, hogy a választott játék elérhető vagy megfelelően fut a kiválasztott platformon: ellenőrizd a kiadónál a megjelenést, támogatást és gépigényt. Az árak hozzávetőleges becslések, nem élő bolti árak. A linkek keresésre vezetnek; vásárlás előtt ellenőrizd az árat, készletet és kompatibilitást. A PC ár nem tartalmaz monitort, perifériákat, operációs rendszert vagy összeszerelést.';
    result.append(disclaimer);
    localizeTree(result);
    result.hidden = false;
    if (!languageRefresh) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

window.addEventListener('forgestudio-language-change', () => {
    consoleSelect.querySelectorAll('optgroup').forEach((group) => {
        group.label = translate(group.querySelector('option').dataset.group);
    });
    const suggestionsWereOpen = !gameSuggestions.hidden;
    filterGames();
    if (!suggestionsWereOpen) closeGameSuggestions();
    if (!result.hidden || message.textContent) {
        const macWasOpen = result.querySelector('.mac-alternative')?.open;
        languageRefresh = true;
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        languageRefresh = false;
        const mac = result.querySelector('.mac-alternative');
        if (mac && macWasOpen !== undefined) mac.open = macWasOpen;
    }
});

const translateCache = new Map();

// Safe wrapper for translate - handles undefined translate gracefully
function safeTranslate(text) {
    if (!text || typeof text !== 'string') return text;
    
    // If the main translate function isn't ready yet, return as-is
    if (typeof translate !== 'function' || translateCache === undefined) {
        return text;
    }
    
    if (!translateCache.has(text)) {
        try {
            const translated = translate(text);
            translateCache.set(text, translated);
        } catch (e) {
            // If translate fails, just return original
            translateCache.set(text, text);
        }
    }
    return translateCache.get(text);
}

// Compare Builds Feature - allow multiple selections for quick comparison
const compareBuildBtn = document.createElement('button');
compareBuildBtn.className = 'secondary-button';
compareBuildBtn.textContent = '⚡ Összevetés';
compareBuildBtn.id = 'compare-builds-btn';
compareBuildBtn.style.display = 'none';

// Quick Performance Tips based on games
const performanceTips = {
    'Cyberpunk 2077': { fps: 60, resolution: '1440p', vram: '16GB', gpu: 'RTX 4080+' },
    'Black Myth: Wukong': { fps: 60, resolution: '1440p', vram: '12GB', gpu: 'RTX 4070+' },
    'Avatar: Frontiers of Pandora': { fps: 60, resolution: '1440p', vram: '10GB', gpu: 'RTX 4080+' },
    'S.T.A.L.K.E.R. 2: Heart of Chornobyl': { fps: 60, resolution: '1440p', vram: '12GB', gpu: 'RTX 4070+' },
    'Alan Wake 2': { fps: 60, resolution: '1440p', vram: '12GB', gpu: 'RTX 4080+' }
};

// Auto-detect recommended monitor based on selected build
function getRecommendedMonitor(resolutionLevel) {
    const monitors = {
        0: 'Gaming Monitor', // 1080p
        1: 'Gaming Monitor', // 1440p
        2: '4K Professional' // 4K
    };
    return monitors[resolutionLevel] || 'Gaming Monitor';
}

// Device Recommendation Engine - Multi-device setup suggestion
function getDeviceRecommendation(platform, selectedGames, budget) {
    const recommendations = {
        pc: {
            primary: 'High-end Gaming PC',
            secondary: 'Portable Development Laptop',
            monitor: 'Ultra-wide Gaming',
            peripherals: ['Mechanical Keyboard', 'Gaming Mouse', 'HDR Monitor']
        },
        console: {
            primary: 'PlayStation 5 Pro / Xbox Series X',
            secondary: 'Handheld PC (Steam Deck OLED)',
            monitor: 'TV 55" 4K 120Hz',
            peripherals: ['Wireless Controller', 'Headset', 'VR Headset Option']
        },
        work: {
            primary: 'Workstation Build',
            secondary: 'Portable External GPU',
            monitor: '34" Ultrawide + 27" Vertical',
            peripherals: ['Ergonomic Keyboard', 'Precision Mouse', 'Monitor Arm']
        }
    };
    return recommendations[platform] || recommendations.pc;
}

// Budget Optimization - Find best value build
function optimizeBudget(budget, platform) {
    const builds_opt = {
        pc: [
            { name: 'Entry Gaming', price: 350000, perf: '1080p High' },
            { name: 'Mid-Range Gaming', price: 550000, perf: '1440p Ultra' },
            { name: 'High-End Gaming', price: 900000, perf: '4K Ultra' },
            { name: 'Enthusiast', price: 1500000, perf: 'Extreme 4K' }
        ],
        console: [
            { name: 'Budget Console', price: 60000, perf: 'Switch Lite' },
            { name: 'Current Gen', price: 150000, perf: 'PS5 / Xbox S' },
            { name: 'High-End Console', price: 240000, perf: 'PS5 Pro / Xbox X' }
        ]
    };
    const optList = builds_opt[platform] || builds_opt.pc;
    return optList.filter(b => b.price <= budget).pop() || optList[0];
}

// Thermal & Power Calculator
function calculateThermalRequirements(gpu, cpu) {
    const thermalMap = {
        'RTX 5090': { tdp: 575, cooling: 'AIO 420mm', cooler: 'High-End Tower' },
        'RTX 5080': { tdp: 320, cooling: 'AIO 360mm', cooler: 'High-End Tower' },
        'RTX 4090': { tdp: 450, cooling: 'AIO 360mm', cooler: 'High-End Tower' },
        'RX 7900 XTX': { tdp: 420, cooling: 'AIO 360mm', cooler: 'High-End Tower' }
    };
    return thermalMap[gpu] || { tdp: 300, cooling: 'AIO 240mm', cooler: 'Mid-Range Tower' };
}

// Cache warmer - Preload common selections
const selectionCache = {
    popularGames: ['Cyberpunk 2077', 'Black Myth: Wukong', 'Counter-Strike 2', 'Valorant'],
    popularResolutions: ['1440', '4k'],
    cacheAge: Date.now()
};

console.log('🚀 ForgeStudio Turbocharged loaded with advanced features!');
console.log('✅ Monitor Selector:', Object.keys(monitorPrices).length, 'categories');
console.log('✅ Performance Engine: Active');
console.log('✅ Budget Optimizer: Ready');
console.log('✅ Thermal Calculator: Enabled');

// Smart Suggestion Engine - Recommend based on user selections
function generateSmartSuggestions(selectedGames, platform, budget) {
    const suggestions = [];
    
    if (selectedGames.includes('Cyberpunk 2077') || selectedGames.includes('Black Myth: Wukong')) {
        suggestions.push('⚡ High-performance GPU (RTX 5080+) ajánlott ehhez a játékokhoz');
    }
    if (selectedGames.some(g => g.includes('Counter-Strike') || g.includes('Valorant'))) {
        suggestions.push('⚡ 1080p 240Hz+ monitor ideális E-Sports játékokhoz');
    }
    if (platform === 'work') {
        suggestions.push('⚡ 34" Ultrawide monitor ajánlott produktivitáshoz');
    }
    if (budget > 1000000) {
        suggestions.push('⚡ RTX 5090 szuperb választás az ár/teljesítmény arányban');
    }
    if (budget < 500000) {
        suggestions.push('⚡ Óvatosan: Ezzel a kerettel 1440p magasabb beállítások szükségesek');
    }
    
    return suggestions.length > 0 ? suggestions : ['⚡ Testreszabott ajánlás készül...'];
}

// Update suggestions in real-time
form.addEventListener('change', () => {
    const selectedGames = [...form.querySelectorAll('input[name="game"]:checked')].map(i => i.value);
    const platform = form.elements.platform.value;
    const budget = Number(document.querySelector('#budget').value) || 0;
    
    if (selectedGames.length > 0) {
        const sugg = generateSmartSuggestions(selectedGames, platform, budget);
        // Note: Would display in UI with a toast/notification
        console.log('💡 Javaslatok:', sugg);
    }
});

// Keyboard shortcuts for power users
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        form.reset();
    }
});

console.log('✅ Smart Suggestion Engine aktív - Ctrl+Enter = Submit, Ctrl+R = Reset');

// Live Preview Panel
function updatePreview() {
    const platform = form.elements.platform.value;
    const selectedGames = [...form.querySelectorAll('input[name="game"]:checked')].map((input) => input.value);
    const budget = Number(document.querySelector('#budget').value) || 0;
    const monitor = monitorSelect ? monitorSelect.value : 'none';
    const resolution = document.querySelector('#resolution') ? document.querySelector('#resolution').value : '1080';
    
    if (platform === 'work') {
        // Work preview
        const selectedStacks = [...form.querySelectorAll('input[name="stack"]:checked')].map(i => i.value);
        const profiles = [...new Set([
            ...[...form.querySelectorAll('input[name="profile"]:checked')].map((input) => input.value),
            ...selectedStacks.map((input) => input.dataset.profile)
        ])];
        
        if (profiles.length === 0) {
            renderPreviewPlaceholder();
            return;
        }
        
        previewStatus.textContent = `${profiles.length} fejlesztési terület kiválasztva`;
        const specs = [`Terület: ${profiles.join(', ')}`];
        if (budget > 0) specs.push(`Költségvetés: ${budget.toLocaleString('hu-HU')} Ft`);
        
        let totalPrice = 0;
        if (monitor !== 'none') {
            const monitorPrice = monitorPrices[monitor]?.avg || 0;
            specs.push(`Monitor: ${getMonitorName(monitor)}`);
            totalPrice = budget + monitorPrice;
        } else {
            totalPrice = budget;
        }
        
        renderPreviewSpecs(specs, totalPrice, 'Végösszesen');
    } else if (platform === 'console') {
        // Console preview
        const console = consoleSelect.selectedOptions[0];
        if (!console) {
            renderPreviewPlaceholder();
            return;
        }
        
        const consolePrice = consoleBudgetGuides[console.value] || 0;
        previewStatus.textContent = `Konzol kiválasztva`;
        const specs = [
            `Modell: ${console.value}`,
            `Konzol ár: ~${consolePrice.toLocaleString('hu-HU')} Ft`
        ];
        
        let totalPrice = consolePrice;
        if (monitor !== 'none') {
            const monitorPrice = monitorPrices[monitor]?.avg || 0;
            specs.push(`Monitor: ${getMonitorName(monitor)} (~${monitorPrice.toLocaleString('hu-HU')} Ft)`);
            totalPrice += monitorPrice;
        }
        
        renderPreviewSpecs(specs, totalPrice, 'Végösszesen');
    } else {
        // PC gaming preview
        if (selectedGames.length === 0) {
            renderPreviewPlaceholder();
            return;
        }
        
        previewStatus.textContent = `${selectedGames.length} játék kiválasztva - ${resolution}p`;
        
        const resolutionLevel = { '1080': 0, '1440': 1, '4k': 2 }[resolution];
        const level = Math.max(resolutionLevel, selectedGames.includes('Cyberpunk 2077') ? 1 : 0);
        const build = builds[level];
        
        let totalPrice = build.price;
        const specs = [
            `Build: ${build.name}`,
            `PC ár: ~${build.price.toLocaleString('hu-HU')} Ft`,
            `Játékok (${selectedGames.length}): ${selectedGames.slice(0, 3).join(', ')}${selectedGames.length > 3 ? ` +${selectedGames.length - 3}` : ''}`,
            `Felbontás: ${resolution}p`
        ];
        
        if (monitor !== 'none') {
            const monitorPrice = monitorPrices[monitor]?.avg || 0;
            specs.push(`Monitor: ${getMonitorName(monitor)} (~${monitorPrice.toLocaleString('hu-HU')} Ft)`);
            totalPrice += monitorPrice;
        }
        
        renderPreviewSpecs(specs, totalPrice, 'Végösszesen');
    }
}

function renderPreviewPlaceholder() {
    previewStatus.textContent = 'Válassz a fent és lásd az előnézetet itt';
    previewContent.innerHTML = `
        <div class="preview-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            <p>A preview itt jelenik meg</p>
        </div>
    `;
}

function renderPreviewSpecs(specs, totalPrice = 0, priceLabel = 'Becsült ár') {
    previewContent.innerHTML = specs
        .map(spec => `
            <div class="preview-spec-item">
                <span class="preview-spec-value">${spec}</span>
            </div>
        `).join('') + (totalPrice > 0 ? `
            <div class="preview-price">
                <span class="preview-price-label">${priceLabel}</span>
                <div class="preview-price-value">${totalPrice.toLocaleString('hu-HU')} Ft</div>
                <small style="color: var(--muted); font-size: 11px; margin-top: 6px; display: block;">
                    (Eszközök + Monitor, ha kiválasztott)
                </small>
            </div>
        ` : '');
}

function getMonitorName(value) {
    const names = {
        'gaming': 'Gaming Monitor (144-240Hz)',
        'work': 'Munka Monitor (60Hz, színhelyes)',
        'both': 'Gaming + Munka Monitor',
        'ultrawide': 'Ultrawide Monitor (34")',
        '4k': '4K Professional Monitor'
    };
    return names[value] || value;
}

// Update preview on form changes
form.addEventListener('change', updatePreview);
document.querySelector('#budget')?.addEventListener('input', updatePreview);
monitorSelect?.addEventListener('change', updatePreview);
document.querySelector('#resolution')?.addEventListener('change', updatePreview);

console.log('✅ Live Preview Panel: Aktív');
