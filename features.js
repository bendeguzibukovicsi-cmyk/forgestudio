// 🎮 ForgeStudio - Advanced Features Module
// Teljesítmény, karbantartás, kompatibilitás és egyéb logikus funkciók

// ============================================================================
// 1. PERFORMANCE PREDICTOR - Teljesítmény Előrejelzés
// ============================================================================

const performanceData = {
    'RTX 5090': { fps_1080p: 240, fps_1440p: 165, fps_4k: 90, tier: 'ultimate' },
    'RTX 4090': { fps_1080p: 240, fps_1440p: 160, fps_4k: 85, tier: 'ultimate' },
    'RTX 5080': { fps_1080p: 200, fps_1440p: 140, fps_4k: 70, tier: 'extreme' },
    'RX 7900 XTX': { fps_1080p: 180, fps_1440p: 130, fps_4k: 60, tier: 'extreme' },
    'RX 7900 XT': { fps_1080p: 160, fps_1440p: 110, fps_4k: 50, tier: 'high' },
    'RTX 4080': { fps_1080p: 160, fps_1440p: 110, fps_4k: 55, tier: 'high' },
    'RX 7800 XT': { fps_1080p: 140, fps_1440p: 95, fps_4k: 45, tier: 'high' },
    'RTX 4070 Ti': { fps_1080p: 140, fps_1440p: 100, fps_4k: 45, tier: 'high' },
    'RTX 4070': { fps_1080p: 120, fps_1440p: 85, fps_4k: 38, tier: 'medium' },
    'RX 7700 XT': { fps_1080p: 110, fps_1440p: 75, fps_4k: 35, tier: 'medium' },
    'RTX 4060 Ti': { fps_1080p: 90, fps_1440p: 60, fps_4k: 28, tier: 'entry' },
    'RX 7600': { fps_1080p: 80, fps_1440p: 55, fps_4k: 25, tier: 'entry' }
};

function predictPerformance(gpuName, resolution = '1080p') {
    const data = performanceData[gpuName];
    if (!data) return { fps: 60, tier: 'unknown', settings: 'Medium' };
    
    const fps = data[`fps_${resolution}`];
    let settings = 'Medium';
    
    if (fps >= 144) settings = 'High/Ultra';
    else if (fps >= 100) settings = 'High';
    else if (fps >= 60) settings = 'Medium';
    else settings = 'Low';
    
    return {
        fps,
        tier: data.tier,
        settings,
        bottleneck: detectBottleneck(gpuName)
    };
}

function detectBottleneck(gpuName) {
    const highEndGPU = ['RTX 5090', 'RTX 4090', 'RX 7900 XTX'];
    const midRangeGPU = ['RTX 4070', 'RX 7800 XT', 'RTX 4070 Ti'];
    
    if (highEndGPU.includes(gpuName)) {
        return 'High-end GPU: Ajánlott R7 7800X3D vagy I9-14900KS processzor';
    } else if (midRangeGPU.includes(gpuName)) {
        return 'Mid-range GPU: R5 7600 vagy I7-13700K ideális';
    }
    return 'Entry-level GPU: Bármely modern processzor elegendő';
}

// ============================================================================
// 2. COST BREAKDOWN - Árfelbontás
// ============================================================================

function calculateCostBreakdown(build) {
    const components = {
        'CPU': 60000,
        'GPU': build.price * 0.35,
        'RAM': 80000,
        'SSD': 60000,
        'PSU': 50000,
        'Cooling': 30000,
        'Case': 50000,
        'Motherboard': 60000
    };
    
    return components;
}

function generateCostChart(build) {
    const breakdown = calculateCostBreakdown(build);
    const total = build.price;
    
    const chart = Object.entries(breakdown).map(([component, price]) => {
        const percentage = ((price / total) * 100).toFixed(1);
        return {
            component,
            price: price.toLocaleString('hu-HU'),
            percentage: `${percentage}%`,
            bar: '█'.repeat(Math.round(percentage / 5))
        };
    });
    
    return chart;
}

// ============================================================================
// 3. POWER & THERMAL - Energia & Hőkezelés
// ============================================================================

const thermalData = {
    'RTX 5090': { tdp: 575, cooling: 'Liquid', psuRecommended: 1200 },
    'RTX 4090': { tdp: 450, cooling: 'Liquid', psuRecommended: 1000 },
    'RX 7900 XTX': { tdp: 465, cooling: 'Liquid', psuRecommended: 1000 },
    'RX 7900 XT': { tdp: 420, cooling: 'Air', psuRecommended: 900 },
    'RTX 4080': { tdp: 320, cooling: 'Air', psuRecommended: 850 },
    'RX 7800 XT': { tdp: 310, cooling: 'Air', psuRecommended: 800 },
    'RTX 4070': { tdp: 200, cooling: 'Air', psuRecommended: 700 },
    'RX 7700 XT': { tdp: 250, cooling: 'Air', psuRecommended: 750 }
};

function calculatePowerRequirements(cpuTdp, gpuName) {
    const gpuData = thermalData[gpuName];
    if (!gpuData) return { totalTdp: 150, psuRecommended: 650 };
    
    const totalTdp = cpuTdp + gpuData.tdp;
    const coolingType = gpuData.cooling;
    
    return {
        cpuTdp,
        gpuTdp: gpuData.tdp,
        totalTdp,
        psuRecommended: gpuData.psuRecommended,
        coolingType,
        monthlyEnergyCost: (totalTdp * 24 * 30 / 1000 * 50).toLocaleString('hu-HU')
    };
}

// ============================================================================
// 4. BUDGET CATEGORIES - Költségvetési Kategóriák
// ============================================================================

const budgetCategories = {
    'entry': { min: 150000, max: 300000, tier: 'Casual Gaming', games: '1080p / Low-Mid', fps: '60-100' },
    'mid': { min: 300000, max: 600000, tier: '1080p Competitive', games: 'Most titles / High', fps: '100-144' },
    'high': { min: 600000, max: 1000000, tier: '1440p Hardcore', games: 'All titles / Ultra', fps: '90-165' },
    'extreme': { min: 1000000, max: 2000000, tier: '4K Maximum', games: 'Ultra / Ray Tracing', fps: '60-120' },
    'ultimate': { min: 2000000, max: 10000000, tier: 'Professional', games: 'Everything / Max', fps: '144-360' }
};

function categorizeBudget(price) {
    for (const [key, data] of Object.entries(budgetCategories)) {
        if (price >= data.min && price <= data.max) {
            return { category: key, ...data };
        }
    }
    return { category: 'custom', tier: 'Custom Build' };
}

// ============================================================================
// 5. DISPLAY RECOMMENDATIONS - Képernyő Ajánlások
// ============================================================================

const displayRecommendations = {
    '1080p': {
        size: '24"',
        type: 'IPS',
        refreshRate: '144-240Hz',
        bestFor: 'Competitive E-Sports',
        response: '1ms',
        price: '150-350k Ft',
        bestGames: ['CS2', 'Valorant', 'Apex', 'Overwatch 2']
    },
    '1440p': {
        size: '27"',
        type: 'IPS',
        refreshRate: '165-240Hz',
        bestFor: 'Mixed Gaming',
        response: '1ms',
        price: '250-500k Ft',
        bestGames: ['Cyberpunk', 'Elden Ring', 'Baldur\'s Gate 3']
    },
    '4k': {
        size: '32"',
        type: 'VA',
        refreshRate: '60-120Hz',
        bestFor: 'Triple-A Gaming',
        response: '4ms',
        price: '400-800k Ft',
        bestGames: ['Alan Wake 2', 'Avatar', 'Star Wars Outlaws']
    },
    'ultrawide': {
        size: '34"',
        type: 'IPS',
        refreshRate: '144Hz',
        bestFor: 'Immersive Gaming / Work',
        response: '1ms',
        price: '350-600k Ft',
        bestGames: ['Simulators', 'Strategy', 'Productivity']
    }
};

// ============================================================================
// 6. PERIPHERALS SUGGESTION - Periféria Ajánlások
// ============================================================================

const peripheralSuggestions = {
    'gaming': {
        mouse: { name: 'Gaming Mouse (20k-15k Ft)', dpi: '12800+', weight: '60-80g', sensor: 'Optical' },
        keyboard: { name: 'Mechanical Keyboard (15k-40k Ft)', type: 'Hot-swap', switches: 'Linear/Tactile', rgb: 'Per-key' },
        headset: { name: 'Gaming Headset (25k-80k Ft)', surround: '7.1 Virtual', mic: 'Noise-cancelling', cable: 'Detachable' },
        mousepad: { name: 'Large Mousepad 90x40cm (10k-20k Ft)', surface: 'Speed/Control Hybrid', base: 'Non-slip' },
        chair: { name: 'Gaming Chair (150k-500k Ft)', material: 'PU Leather', recline: '180°', armrest: 'Adjustable' }
    },
    'work': {
        mouse: { name: 'Ergonomic Mouse (8k-15k Ft)', dpi: '1600-3200', weight: '120g+', sensor: 'Optical' },
        keyboard: { name: 'Mechanical Keyboard (12k-30k Ft)', type: 'Standard', switches: 'Tactile', rgb: 'Simple' },
        headset: { name: 'Work Headset (15k-40k Ft)', surround: 'Stereo', mic: 'Omnidirectional', cable: 'Coiled' },
        monitor_light: { name: 'Monitor Light (10k-20k Ft)', brightness: 'Auto-dimming', flicker: 'Free' },
        chair: { name: 'Office Chair (80k-300k Ft)', material: 'Mesh', recline: '90-130°', lumbar: 'Support' }
    }
};

// ============================================================================
// 7. FUTURE-PROOFING - Jövő-kompatibilitás
// ============================================================================

function assessFutureProofing(gpuTier, resolution) {
    const scores = {
        '1080p': { entry: 2, mid: 3, high: 4, extreme: 5, ultimate: 5 },
        '1440p': { entry: 1, mid: 2, high: 3, extreme: 4, ultimate: 5 },
        '4k': { entry: 0, mid: 1, high: 2, extreme: 4, ultimate: 5 }
    };
    
    const score = scores[resolution]?.[gpuTier] || 3;
    const predictions = {
        0: '❌ 2 év alatt elavult lesz',
        1: '⚠️ Csak közvetítés után jó',
        2: '⚠️ 1-2 évhez elegendő',
        3: '✓ 2-3 évhez jó',
        4: '✓✓ 3-4 évhez kiváló',
        5: '✓✓✓ 4+ évig versenyképes'
    };
    
    return { score: `${score}/5`, prediction: predictions[score] };
}

// ============================================================================
// 8. MAINTENANCE TIPS - Karbantartási Tanácsok
// ============================================================================

const maintenanceTips = {
    'dust_cleaning': {
        frequency: '3-6 hónap',
        difficulty: 'Easy',
        tips: ['Compressed air használat', 'GPU és CPU hűtőket külön tisztítsa', 'Case ventillátorok ellenőrzése'],
        time: '15-30 perc'
    },
    'thermal_paste': {
        frequency: '2-3 év',
        difficulty: 'Medium',
        tips: ['Arctic MX-6 vagy Thermal Grizzly ajánlott', 'Régi pasztát alkoholban tisztítsa', 'Thin line aplikálás (CPU közepére)'],
        time: '30-45 perc'
    },
    'driver_update': {
        frequency: 'Havi',
        difficulty: 'Easy',
        tips: ['NVIDIA/AMD driver legfrissebb verziója', 'Régi driver eltávolítása DDU-val', 'Friss Windows update'],
        time: '10-15 perc'
    },
    'backup': {
        frequency: 'Heti',
        difficulty: 'Easy',
        tips: ['OneDrive/Google Drive szinkronizálás', 'Játékmentések külön lemezre', 'Rendszerkép (image) készítés havonta'],
        time: 'Automatikus'
    }
};

// ============================================================================
// 9. GAMING PROFILES - Játékos Profilok
// ============================================================================

const gamingProfiles = {
    'casual': {
        name: 'Casual Gamer',
        fps: 60,
        settings: 'Medium',
        price_range: '300-400k Ft',
        games: ['Stardew Valley', 'Minecraft', 'Fortnite casual'],
        recommended_refresh: '60Hz',
        recommended_resolution: '1080p',
        examples: ['Nagyobb testvér', 'Office dolgozó', 'Casual player']
    },
    'competitive': {
        name: 'Competitive E-Sports',
        fps: 240,
        settings: 'Low/Medium',
        price_range: '600k-1M Ft',
        games: ['CS2', 'Valorant', 'Apex', 'Overwatch 2'],
        recommended_refresh: '240Hz',
        recommended_resolution: '1080p',
        examples: ['Esports versenyző', 'Streaming gamer', 'Pro player']
    },
    'hardcore': {
        name: 'Hardcore Ultra Settings',
        fps: 60,
        settings: 'Ultra / Ray Tracing',
        price_range: '1-2M Ft',
        games: ['Cyberpunk 2077 Path Tracing', 'Alan Wake 2', 'Avatar'],
        recommended_refresh: '144Hz',
        recommended_resolution: '1440p-4K',
        examples: ['Cinematic enthusiast', 'Story-driven lover', 'GPU flex']
    }
};

// ============================================================================
// 10. STREAMING & CONTENT CREATION - Streaming és Tartalomgyártás
// ============================================================================

const contentCreationSpecs = {
    'streaming_1080p': {
        name: '1080p Streaming (Twitch/YouTube)',
        recommended_cpu: 'R7 5700X / I7-12700K',
        recommended_gpu: 'RTX 3070 / RX 6800',
        ram_required: '32GB',
        bitrate: '6000-8000 kbps',
        encoder: 'NVENC H.264',
        recommended_monitor: '1440p / 144Hz',
        expected_fps: '100+ FPS (game) + 1080p 60FPS (stream)'
    },
    'streaming_4k': {
        name: '4K Streaming (120Mbps+)',
        recommended_cpu: 'R9 7950X / I9-13900KS',
        recommended_gpu: 'RTX 4090 / RX 7900 XTX',
        ram_required: '64GB',
        bitrate: '20000-25000 kbps',
        encoder: 'AV1 (future)',
        recommended_monitor: '4K / 120Hz',
        expected_fps: '60-120 FPS (4K native)'
    },
    'video_editing_1080p': {
        name: '1080p Video Editing (Premiere Pro/DaVinci)',
        recommended_cpu: 'R7 5700X / I7-12700K',
        recommended_gpu: 'RTX 3080 / RX 6900',
        ram_required: '32GB+',
        storage: '2TB+ NVMe SSD',
        recommended_monitor: '4K / 60Hz (color-accurate)',
        expected_render: '5-10 perc/perc (H.264)'
    },
    '3d_rendering': {
        name: '3D Rendering (Blender/Unreal)',
        recommended_cpu: 'R9 5950X / I9-13900K',
        recommended_gpu: 'RTX 4090 / RX 7900 XTX (CUDA-es)',
        ram_required: '64GB+',
        vram_required: '24GB+',
        storage: '4TB+ NVMe SSD',
        expected_speed: '2-4x GPU speed boost'
    }
};

// ============================================================================
// 11. VR READINESS - VR Készültség
// ============================================================================

const vrSupport = {
    'meta_quest_3': {
        name: 'Meta Quest 3 Support',
        min_gpu: 'RTX 2080 / RX Vega 56',
        recommended_gpu: 'RTX 4070 / RX 7800 XT',
        min_cpu: 'R5 3600 / I7-10700',
        ram_required: '16GB',
        recommended_resolution: '1440p per eye @ 120Hz',
        cable_link_bandwidth: 'Wifi 6E ajánlott',
        games: ['Half-Life Alyx', 'Beat Saber', 'Pavlov VR']
    },
    'valve_index': {
        name: 'Valve Index Support',
        min_gpu: 'RTX 1080 Ti / Vega 64',
        recommended_gpu: 'RTX 4080 / RX 7900 XT',
        min_cpu: 'R7 2700X / I7-10700',
        ram_required: '16GB',
        recommended_resolution: '2K per eye @ 144Hz',
        cable_requirement: 'USB 3.0 + 2x DP 1.4',
        games: ['Half-Life Alyx', 'Boneworks', 'The Lab']
    },
    'playstation_vr2': {
        name: 'PlayStation VR2 Ready',
        platform: 'PlayStation 5 exclusive',
        resolution: '4K per eye @ 120Hz',
        games: ['Gran Turismo 7 VR', 'Horizont: Call of Mountain', 'No Man\'s Sky VR']
    }
};

// ============================================================================
// 12. ESPORTS READINESS - E-Sports Készültség
// ============================================================================

const esportsSpecs = {
    'cs2': {
        name: 'Counter-Strike 2',
        recommended_fps: '240+',
        recommended_gpu: 'RTX 4080 / RX 7900 XT',
        recommended_cpu: 'R7 7700X / I7-13700K',
        recommended_monitor: '240Hz, 1ms, 24"',
        mouse_dpi: '400-800 DPI',
        expected_rank: 'Pro: Global Elite'
    },
    'valorant': {
        name: 'Valorant',
        recommended_fps: '240+',
        recommended_gpu: 'RTX 4070 / RX 6800',
        recommended_cpu: 'R5 5600X / I5-12600K',
        recommended_monitor: '240Hz, 1ms, 24"',
        mouse_dpi: '400-800 DPI',
        expected_rank: 'Pro: Radiant'
    },
    'apex': {
        name: 'Apex Legends',
        recommended_fps: '144+',
        recommended_gpu: 'RTX 4070 / RX 6800 XT',
        recommended_cpu: 'R7 7700X / I7-13700K',
        recommended_monitor: '144Hz, 1-2ms, 27"',
        mouse_dpi: '400-1200 DPI',
        expected_rank: 'Pro: Pred 20k+'
    }
};

// ============================================================================
// 13. EXPORT FUNCTIONS - Exportálás
// ============================================================================

function exportBuildToClipboard(build, components) {
    const text = `
🎮 ForgeStudio Ajánlás
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Összes ár: ${build.price.toLocaleString('hu-HU')} Ft
Alkatrészek:
${Object.entries(components).map(([k, v]) => `  • ${k}: ${v.toLocaleString('hu-HU')} Ft`).join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generálva: ForgeStudio.hu
    `.trim();
    
    navigator.clipboard.writeText(text);
    return 'Vágólapra másolva! ✓';
}

function generateShareLink(buildId) {
    const link = `${window.location.origin}?build=${buildId}`;
    return link;
}

// Export modul
window.ForgeStudioFeatures = {
    performance: { predictPerformance, detectBottleneck },
    cost: { calculateCostBreakdown, generateCostChart },
    power: { calculatePowerRequirements },
    budget: { categorizeBudget },
    display: { displayRecommendations },
    peripherals: { peripheralSuggestions },
    future: { assessFutureProofing },
    maintenance: { maintenanceTips },
    profiles: { gamingProfiles },
    content: { contentCreationSpecs },
    vr: { vrSupport },
    esports: { esportsSpecs },
    export: { exportBuildToClipboard, generateShareLink }
};

console.log('✅ ForgeStudio Advanced Features: Loaded');
