// A katalógus tájékoztató jellegű: a modellek elérhetősége és kompatibilitása változhat.

// Game platform availability: 'both' = PC és console, 'pc' = csak PC, 'ps' = PlayStation exclusive
const gamePlatforms = {
    // PC exclusives
    'Counter-Strike 2': 'pc',
    'Valorant': 'pc',
    'Escape from Tarkov': 'pc',
    'Hunt: Showdown 1896': 'both',
    'Bodycam': 'pc',
    'Gray Zone Warfare': 'pc',
    'Delta Force': 'pc',
    'XDefiant': 'both',
    'Titanfall 2': 'both',
    'Team Fortress 2': 'pc',
    'StarCraft II': 'pc',
    'Civilization VII': 'pc',
    'Manor Lords': 'pc',
    'Age of Empires IV': 'pc',
    'Total War: Warhammer III': 'pc',
    'Frostpunk 2': 'pc',
    'Factorio': 'pc',
    'Satisfactory': 'pc',
    'RimWorld': 'pc',
    'Rust': 'both',
    'Valheim': 'pc',
    'Enshrouded': 'pc',
    'Lethal Company': 'pc',
    'Phasmophobia': 'pc',
    'Minecraft Java Edition': 'pc',
    'Minecraft Shaders': 'pc',
    'Dota 2': 'pc',
    'League of Legends': 'pc',
    'World of Warcraft': 'pc',
    'Guild Wars 2': 'pc',
    'Black Desert Online': 'pc',
    'New World: Aeternum': 'pc',
    'RuneScape': 'pc',
    'Old School RuneScape': 'pc',
    'EVE Online': 'pc',
    'DCS World': 'pc',
    'X-Plane 12': 'pc',
    'Star Citizen': 'pc',
    'Elite Dangerous': 'both',
    'American Truck Simulator': 'pc',
    'SnowRunner': 'both',
    'Kerbal Space Program 2': 'pc',
    'Idle Master': 'pc',
    'Hades': 'both',
    'Hades II': 'both',
    'Hollow Knight': 'both',
    'Hollow Knight: Silksong': 'both',
    'Cuphead': 'both',
    'Ori and the Will of the Wisps': 'both',
    'Dave the Diver': 'both',
    'Dredge': 'both',
    'Vampire Survivors': 'both',
    'Balatro': 'both',
    'Slay the Spire': 'both',
    'Inscryption': 'both',
    'Outer Wilds': 'both',
    
    // PlayStation exclusives
    'Ghost of Tsushima': 'ps',
    'Ghost of Tsushima Director\'s Cut': 'ps',
    'God of War Ragnarök': 'ps',
    'Horizon Forbidden West': 'ps',
    'The Last of Us Part I': 'ps',
    'The Last of Us Part II': 'ps',
    'The Last of Us Part II Remastered': 'ps',
    'Marvel\'s Spider-Man 2': 'ps',
    'Marvel\'s Spider-Man Remastered': 'ps',
    'Marvel\'s Spider-Man: Miles Morales': 'ps',
    'Horizon Zero Dawn Remastered': 'ps',
    'Returnal': 'ps',
    'Ratchet & Clank: Rift Apart': 'ps',
    'Uncharted: Legacy of Thieves Collection': 'ps',
    'Days Gone': 'ps',
    'Death Stranding Director\'s Cut': 'ps',
    'Gran Turismo 7': 'ps',
    'God of War (2018)': 'ps',
    'Ghost of Tsushima': 'ps',
    'Tekken 8': 'both',
    
    // Cross-platform (both PC and console)
    'Call of Duty: Black Ops 6': 'both',
    'Call of Duty: Warzone': 'both',
    'Apex Legends': 'both',
    'Overwatch 2': 'both',
    'Rainbow Six Siege': 'both',
    'Battlefield 2042': 'both',
    'PUBG: Battlegrounds': 'both',
    'Destiny 2': 'both',
    'Doom Eternal': 'both',
    'Halo Infinite': 'both',
    'Grand Theft Auto V': 'both',
    'Grand Theft Auto VI': 'both',
    'Cyberpunk 2077': 'both',
    'Red Dead Redemption 2': 'both',
    'The Witcher 3: Wild Hunt': 'both',
    'Elden Ring': 'both',
    'Baldur\'s Gate 3': 'both',
    'Black Myth: Wukong': 'both',
    'Hogwarts Legacy': 'both',
    'Starfield': 'pc',
    'Skyrim': 'both',
    'Fallout 4': 'both',
    'Dragon\'s Dogma 2': 'both',
    'Alan Wake 2': 'both',
    'S.T.A.L.K.E.R. 2: Heart of Chornobyl': 'pc',
    'Kingdom Come: Deliverance II': 'both',
    'Monster Hunter Wilds': 'both',
    'Diablo IV': 'both',
    'Path of Exile 2': 'both',
    'Assassin\'s Creed Shadows': 'both',
    'Fortnite': 'both',
    'Roblox': 'both',
    'Cities: Skylines II': 'both',
    'ARK: Survival Ascended': 'both',
    'Dead by Daylight': 'both',
    'EA Sports FC 25': 'both',
    'EA Sports FC 26': 'both',
    'NBA 2K25': 'both',
    'NBA 2K26': 'both',
    'F1 24': 'both',
    'F1 25': 'both',
    'Forza Horizon 5': 'both',
    'Forza Motorsport': 'both',
    'Assetto Corsa Competizione': 'both',
    'Assetto Corsa Evo': 'both',
    'iRacing': 'pc',
    'Rocket League': 'both',
    'Microsoft Flight Simulator 2024': 'both',
    'Euro Truck Simulator 2': 'pc',
    'Farming Simulator 25': 'both',
    'Monster Hunter: World': 'both',
    'Monster Hunter Rise': 'both',
    'Kingdom Come: Deliverance': 'both',
    'Assassin\'s Creed Mirage': 'both',
    'Assassin\'s Creed Valhalla': 'both',
    'Assassin\'s Creed Odyssey': 'both',
    'Ghost Recon Breakpoint': 'both',
    'Far Cry 6': 'both',
    'Dying Light 2 Stay Human': 'both',
    'Dead Island 2': 'both',
    'Resident Evil 4 Remake': 'both',
    'Resident Evil Village': 'both',
    'Silent Hill 2 Remake': 'both',
    'Dead Space Remake': 'both',
    'Divinity: Original Sin 2': 'both',
    'Path of Exile': 'pc',
    'Last Epoch': 'pc',
    'Grim Dawn': 'pc',
    'Dragon Age: The Veilguard': 'both',
    'Fallout 76': 'both',
    'Mass Effect Legendary Edition': 'both',
    'Disco Elysium': 'both',
    'Pillars of Eternity II: Deadfire': 'pc',
    'Warhammer 40,000: Rogue Trader': 'pc',
    'Warhammer 40,000: Space Marine 2': 'both',
    'Avatar: Frontiers of Pandora': 'both',
    'Star Wars Outlaws': 'ps',
    'Star Wars Jedi: Survivor': 'ps',
    'Forspoken': 'ps',
    'Immortals of Aveum': 'both',
    'Control Ultimate Edition': 'both',
    'Sekiro: Shadows Die Twice': 'both',
    'Dark Souls III': 'both',
    'Lies of P': 'both',
    'Lords of the Fallen (2023)': 'both',
    'Nioh 2': 'ps',
    'Wo Long: Fallen Dynasty': 'both',
    'Street Fighter 6': 'both',
    'Mortal Kombat 1': 'both',
    'Guilty Gear -Strive-': 'both',
    'Helldivers 2': 'both',
    'Palworld': 'both',
    'V Rising': 'pc',
    'Subnautica': 'both',
    'Subnautica: Below Zero': 'both',
    'Sons of the Forest': 'pc',
    'The Forest': 'both',
    'Green Hell': 'both',
    '7 Days to Die': 'both',
    'Project Zomboid': 'pc',
    'DayZ': 'both',
    'SCUM': 'pc',
    'No Man\'s Sky': 'both',
    'Dyson Sphere Program': 'pc',
    'Kenshi': 'pc',
    'Terraria': 'both',
    'Stardew Valley': 'both',
    'Minecraft Bedrock Edition': 'both',
    'Final Fantasy XIV': 'both',
    'The Elder Scrolls Online': 'both',
    'Throne and Liberty': 'both',
    'Lost Ark': 'pc'
};

const gameGroups = {
    'FPS / Lövöldözős': [
        'Counter-Strike 2', 'Valorant', 'Call of Duty: Black Ops 6', 'Call of Duty: Warzone',
        'Apex Legends', 'Overwatch 2', 'Rainbow Six Siege', 'Battlefield 2042',
        'Escape from Tarkov', 'PUBG: Battlegrounds', 'Destiny 2', 'Doom Eternal',
        'Halo Infinite', 'Hunt: Showdown 1896', 'Bodycam', 'Gray Zone Warfare',
        'Delta Force', 'XDefiant', 'Titanfall 2', 'Team Fortress 2'
    ],
    'Akció / Nyílt világú / RPG': [
        'Grand Theft Auto V', 'Grand Theft Auto VI', 'Cyberpunk 2077', 'Red Dead Redemption 2',
        'The Witcher 3: Wild Hunt', 'Elden Ring', "Baldur's Gate 3", 'Black Myth: Wukong',
        'Hogwarts Legacy', 'Starfield', 'Skyrim', 'Fallout 4', "Dragon's Dogma 2",
        'Ghost of Tsushima', 'God of War Ragnarök', 'Horizon Forbidden West',
        'The Last of Us Part I', 'The Last of Us Part II', "Marvel's Spider-Man 2",
        'Alan Wake 2', 'S.T.A.L.K.E.R. 2: Heart of Chornobyl', 'Kingdom Come: Deliverance II',
        'Monster Hunter Wilds', 'Diablo IV', 'Path of Exile 2', "Assassin's Creed Shadows"
    ],
    'Stratégia / MOBA / Építős': [
        'League of Legends', 'Dota 2', 'Minecraft Java Edition', 'Minecraft Bedrock Edition',
        'Minecraft Shaders', 'Fortnite', 'Roblox', 'Civilization VII', 'Cities: Skylines II',
        'Manor Lords', 'Age of Empires IV', 'Total War: Warhammer III', 'Frostpunk 2',
        'Factorio', 'Satisfactory', 'RimWorld', 'The Sims 4', 'Palworld', 'Rust',
        'ARK: Survival Ascended', 'Valheim', 'Enshrouded', 'Helldivers 2', 'Lethal Company',
        'Phasmophobia', 'Dead by Daylight'
    ],
    'MMO / MMORPG': ['World of Warcraft', 'Final Fantasy XIV', 'The Elder Scrolls Online'],
    'Sport / Autós / Szimulátor': [
        'EA Sports FC 25', 'EA Sports FC 26', 'NBA 2K25', 'NBA 2K26', 'F1 24', 'F1 25',
        'Forza Horizon 5', 'Forza Motorsport', 'Assetto Corsa Competizione', 'Assetto Corsa Evo',
        'iRacing', 'Gran Turismo 7', 'Rocket League', 'Microsoft Flight Simulator 2024',
        'Euro Truck Simulator 2', 'Farming Simulator 25'
    ]
};

const additionalGames = {
    'FPS / Lövöldözős': `Spectre Divide|FragPunk|CrossFire|Escape from Tarkov: Arena|Arena Breakout: Infinite|Dark and Darker|Marauders|The Cycle: Frontier|Naraka: Bladepoint|Battlefield V|Battlefield 1|Call of Duty: Modern Warfare III|Halo: The Master Chief Collection|The Finals|Splitgate 2|Quake Champions|Insurgency: Sandstorm|Hell Let Loose|Squad|Arma 3|Arma Reforger|Ready or Not|Six Days in Fallujah|Doom: The Dark Ages|Wolfenstein II: The New Colossus|Metro Exodus Enhanced Edition|Borderlands 3|Tiny Tina's Wonderlands|Warframe|Deep Rock Galactic|Payday 3|Killing Floor 2|Left 4 Dead 2`,
    'Akció / Nyílt világú / RPG': `Grand Theft Auto V Expanded & Enhanced|FiveM RP|Cyberpunk 2077 Path Tracing|Avatar: Frontiers of Pandora|Star Wars Outlaws|Star Wars Jedi: Survivor|Forspoken|Immortals of Aveum|Control Ultimate Edition|God of War (2018)|Ghost of Tsushima Director's Cut|The Last of Us Part II Remastered|Marvel's Spider-Man Remastered|Marvel's Spider-Man: Miles Morales|Horizon Zero Dawn Remastered|Returnal|Ratchet & Clank: Rift Apart|Uncharted: Legacy of Thieves Collection|Days Gone|Death Stranding Director's Cut|Elden Ring: Shadow of the Erdtree|Sekiro: Shadows Die Twice|Dark Souls III|Lies of P|Lords of the Fallen (2023)|Nioh 2|Wo Long: Fallen Dynasty|Monster Hunter: World|Monster Hunter Rise|Kingdom Come: Deliverance|Assassin's Creed Mirage|Assassin's Creed Valhalla|Assassin's Creed Odyssey|Ghost Recon Breakpoint|Far Cry 6|Dying Light 2 Stay Human|Dead Island 2|Resident Evil 4 Remake|Resident Evil Village|Silent Hill 2 Remake|Dead Space Remake|Divinity: Original Sin 2|Path of Exile|Last Epoch|Grim Dawn|Dragon Age: The Veilguard|Skyrim Nolvus / Modded|Fallout 76|Mass Effect Legendary Edition|Disco Elysium|Pillars of Eternity II: Deadfire|Warhammer 40,000: Rogue Trader|Warhammer 40,000: Space Marine 2`,
    'MMO / MMORPG': `Guild Wars 2|Lost Ark|Black Desert Online|New World: Aeternum|Throne and Liberty|RuneScape|Old School RuneScape|EVE Online`,
    'Stratégia / MOBA / Építős': `Smite 2|Civilization VI|Age of Empires II: Definitive Edition|Age of Mythology: Retold|Total War: Pharaoh|Total War: Rome II|Crusader Kings III|Europa Universalis IV|Hearts of Iron IV|Victoria 3|Stellaris|Frostpunk|Anno 1800|Cities: Skylines|StarCraft II|Company of Heroes 3|Stormgate|Homeworld 3|Sins of a Solar Empire II|ARK: Survival Evolved|V Rising|Subnautica|Subnautica: Below Zero|Sons of the Forest|The Forest|Green Hell|7 Days to Die|Project Zomboid|DayZ|SCUM|No Man's Sky|Factorio: Space Age|Dyson Sphere Program|Kenshi|Terraria|Stardew Valley|inZOI|Minecraft Java Distant Horizons Shaders`,
    'Sport / Autós / Szimulátor': `Assetto Corsa|Automobilista 2|rFactor 2|Le Mans Ultimate|EA Sports WRC|Dirt Rally 2.0|BeamNG.drive|Need for Speed Unbound|The Crew Motorfest|Microsoft Flight Simulator (2020)|DCS World|X-Plane 12|War Thunder|Star Citizen|Elite Dangerous|American Truck Simulator|SnowRunner|Construction Simulator|Kerbal Space Program 2|eFootball|Madden NFL 25|WWE 2K24|Tekken 8|Street Fighter 6|Mortal Kombat 1|Guilty Gear -Strive-`,
    'Co-op / Horror / Indie': `Content Warning|Among Us|Fall Guys|Sea of Thieves|It Takes Two|Split Fiction|A Way Out|Portal 2|Hades|Hades II|Hollow Knight|Hollow Knight: Silksong|Cuphead|Ori and the Will of the Wisps|Dave the Diver|Dredge|Vampire Survivors|Balatro|Slay the Spire|Inscryption|Outer Wilds`
};

// Rockstar által kiadott játékok, önálló kiadások és jelentősebb változatok.
const rockstarGames = [
    'Grand Theft Auto', 'Grand Theft Auto 2', 'Grand Theft Auto: London 1969',
    'Grand Theft Auto: London 1961', 'Grand Theft Auto III', 'Grand Theft Auto: Vice City',
    'Grand Theft Auto: San Andreas', 'Grand Theft Auto Advance', 'Grand Theft Auto: Liberty City Stories',
    'Grand Theft Auto: Vice City Stories', 'Grand Theft Auto IV', 'Grand Theft Auto IV: The Lost and Damned',
    'Grand Theft Auto: The Ballad of Gay Tony', 'Grand Theft Auto: Episodes from Liberty City',
    'Grand Theft Auto: Chinatown Wars', 'Grand Theft Auto V', 'Grand Theft Auto V Expanded & Enhanced',
    'Grand Theft Auto Online', 'Grand Theft Auto VI', 'Grand Theft Auto: The Trilogy – The Definitive Edition',
    'Grand Theft Auto III: The Definitive Edition', 'Grand Theft Auto: Vice City – The Definitive Edition',
    'Grand Theft Auto: San Andreas – The Definitive Edition',
    'Red Dead Revolver', 'Red Dead Redemption', 'Red Dead Redemption: Undead Nightmare',
    'Red Dead Redemption 2', 'Red Dead Online',
    'Max Payne', 'Max Payne 2: The Fall of Max Payne', 'Max Payne 3',
    'Midnight Club: Street Racing', 'Midnight Club II', 'Midnight Club 3: DUB Edition',
    'Midnight Club 3: DUB Edition Remix', 'Midnight Club: Los Angeles',
    "Smuggler's Run", "Smuggler's Run 2: Hostile Territory", "Smuggler's Run: Warzones",
    'Manhunt', 'Manhunt 2', 'Bully', 'Bully: Scholarship Edition', 'Bully: Anniversary Edition',
    'The Warriors', 'Rockstar Games Presents Table Tennis', 'L.A. Noire', 'L.A. Noire: The VR Case Files',
    'Monster Truck Madness 64', 'Earthworm Jim 3D', 'Thrasher: Skate and Destroy', 'Evel Knievel',
    'Wild Metal', 'Austin Powers: Oh, Behave!', 'Austin Powers: Welcome to My Underground Lair!',
    'Surfing H3O', 'Oni', "You Don't Know Jack", 'State of Emergency', 'The Italian Job', 'Beaterator'
];

const knownGames = new Set(Object.values(gameGroups).flat());
Object.entries(additionalGames).forEach(([category, games]) => {
    if (!gameGroups[category]) gameGroups[category] = [];
    games.split('|').forEach((name) => {
        if (!knownGames.has(name)) {
            gameGroups[category].push(name);
            knownGames.add(name);
        }
    });
});
gameGroups['Rockstar Games'] = rockstarGames.filter((name) => !knownGames.has(name));

const developmentStacks = {
    web: ['Next.js', 'React', 'Angular', 'Vue', 'Svelte', 'Node.js', 'Deno', 'Bun', 'TypeScript', 'Tailwind CSS'],
    devops: ['Docker', 'Kubernetes', 'Terraform', 'Go', 'Java / Spring Boot', 'C# / .NET', 'Rust', 'Kafka', 'PostgreSQL', 'Redis'],
    android: ['Android Studio', 'Jetpack Compose', 'Kotlin', 'Flutter', 'React Native'],
    ios: ['Xcode'],
    ai: ['PyTorch', 'TensorFlow', 'Hugging Face', 'Ollama', 'LM Studio', 'ComfyUI / Stable Diffusion', 'LangChain', 'CUDA'],
    game: ['Unreal Engine 5', 'Unity 6', 'Godot 4', 'Blender', 'Houdini', 'Autodesk Maya', 'Substance 3D Painter'],
    security: ['Kali Linux', 'VMware Workstation Pro', 'Proxmox', 'VirtualBox', 'Wireshark', 'Hashcat', 'Ghidra'],
    data: ['Apache Spark', 'Hadoop', 'Snowflake', 'Databricks', 'DuckDB', 'Python / Pandas / Polars', 'RStudio', 'Power BI']
};

const consoleGroups = {
    'PlayStation': [
        'PlayStation 5 Standard lemezes', 'PlayStation 5 Slim Digital', 'PlayStation 5 Slim Disc', 'PlayStation 5 Pro'
    ],
    'Xbox': [
        'Xbox Series X 1TB', 'Xbox Series X 2TB Galaxy Black', 'Xbox Series X 1TB Digital',
        'Xbox Series S 512GB', 'Xbox Series S 1TB'
    ],
    'Nintendo': ['Nintendo Switch 2', 'Nintendo Switch OLED', 'Nintendo Switch V2', 'Nintendo Switch Lite'],
    'Kézi PC': ['Steam Deck OLED 512GB', 'Steam Deck OLED 1TB', 'Steam Deck LCD 256GB', 'ASUS ROG Ally', 'ASUS ROG Ally X', 'Lenovo Legion Go', 'Lenovo Legion Go S', 'MSI Claw', 'MSI Claw 8 AI+', 'Zotac Zone', 'Ayaneo Kun', 'Ayaneo 2S', 'GPD Win 4', 'GPD Win Mini', 'OneXPlayer X1']
};

const hardwareGroups = {
    'NVIDIA GeForce RTX 50': ['RTX 5090', 'RTX 5080', 'RTX 5070 Ti', 'RTX 5070', 'RTX 5060 Ti', 'RTX 5060'],
    'NVIDIA GeForce RTX 40': ['RTX 4090', 'RTX 4080 Super', 'RTX 4080', 'RTX 4070 Ti Super', 'RTX 4070 Ti', 'RTX 4070 Super', 'RTX 4070', 'RTX 4060 Ti 16GB', 'RTX 4060 Ti 8GB', 'RTX 4060'],
    'NVIDIA GeForce RTX 30': ['RTX 3090 Ti', 'RTX 3090', 'RTX 3080 Ti', 'RTX 3080', 'RTX 3070 Ti', 'RTX 3070', 'RTX 3060 Ti', 'RTX 3060 12GB', 'RTX 3060 8GB', 'RTX 3050 8GB', 'RTX 3050 6GB'],
    'AMD Radeon RX 9000': ['RX 9070 XT', 'RX 9070', 'RX 9060 XT', 'RX 9060'],
    'AMD Radeon RX 7000': ['RX 7900 XTX', 'RX 7900 XT', 'RX 7900 GRE', 'RX 7800 XT', 'RX 7700 XT', 'RX 7600 XT', 'RX 7600'],
    'AMD Radeon RX 6000': ['RX 6950 XT', 'RX 6900 XT', 'RX 6800 XT', 'RX 6800', 'RX 6750 XT', 'RX 6700 XT', 'RX 6650 XT', 'RX 6600 XT', 'RX 6600', 'RX 6500 XT', 'RX 6400'],
    'Intel Arc': ['Arc B580', 'Arc B570', 'Arc A770 16GB', 'Arc A770 8GB', 'Arc A750', 'Arc A580', 'Arc A380'],
    'AMD Ryzen 9000 – AM5': ['Ryzen 9 9950X3D', 'Ryzen 9 9950X', 'Ryzen 9 9900X3D', 'Ryzen 9 9900X', 'Ryzen 7 9800X3D', 'Ryzen 7 9700X', 'Ryzen 5 9600X', 'Ryzen 5 9600'],
    'AMD Ryzen 7000 – AM5': ['Ryzen 9 7950X3D', 'Ryzen 9 7950X', 'Ryzen 9 7900X3D', 'Ryzen 9 7900X', 'Ryzen 9 7900', 'Ryzen 7 7800X3D', 'Ryzen 7 7700X', 'Ryzen 7 7700', 'Ryzen 5 7600X3D', 'Ryzen 5 7600X', 'Ryzen 5 7600', 'Ryzen 5 7500F'],
    'AMD Ryzen 5000 – AM4': ['Ryzen 9 5950X', 'Ryzen 9 5900X', 'Ryzen 7 5800X3D', 'Ryzen 7 5700X3D', 'Ryzen 7 5800X', 'Ryzen 7 5700X', 'Ryzen 5 5600X', 'Ryzen 5 5600', 'Ryzen 5 5500'],
    'Intel Core Ultra 200S – LGA1851': ['Core Ultra 9 285K', 'Core Ultra 7 265K', 'Core Ultra 7 265KF', 'Core Ultra 5 245K', 'Core Ultra 5 245KF', 'Core Ultra 5 225F'],
    'Intel Core 14. generáció – LGA1700': ['Core i9-14900KS', 'Core i9-14900K', 'Core i9-14900KF', 'Core i9-14900F', 'Core i7-14700K', 'Core i7-14700KF', 'Core i7-14700F', 'Core i5-14600K', 'Core i5-14600KF', 'Core i5-14400F', 'Core i5-14400', 'Core i3-14100F'],
    'Intel Core 12–13. generáció – LGA1700': ['Core i9-13900K', 'Core i7-13700K', 'Core i5-13600K', 'Core i5-13400F', 'Core i5-12600KF', 'Core i5-12400F', 'Core i3-12100F'],
    'Alaplap – AMD AM5 (DDR5)': ['A620', 'B650', 'B650E', 'B840', 'B850', 'X670', 'X670E', 'X870', 'X870E'],
    'Alaplap – AMD AM4 (DDR4)': ['A520', 'B450', 'B550', 'X570'],
    'Alaplap – Intel LGA1851 (DDR5)': ['H810', 'B860', 'Z890'],
    'Alaplap – Intel LGA1700 (modelltől függően DDR4 vagy DDR5)': ['H610', 'B660', 'B760', 'Z690', 'Z790'],
    'Monitor – Gaming': [
        // Ultrawide Gaming
        '34" 3440×1440 165Hz – Asus ROG Ultrawide',
        '34" 3440×1440 240Hz – LG UltraGear OLED',
        '32" 2560×1440 240Hz – Asus ROG Swift Pro',
        '32" 2560×1440 360Hz – MSI MPG 321URF OLED',
        '32" 2560×1440 480Hz – ASUS ROG Swift Pro OLED',
        '27" 2560×1440 240Hz – LG UltraGear OLED',
        '27" 2560×1440 360Hz – Asus ROG Swift Pro OLED',
        '27" 2560×1440 480Hz – MSI MAG 274URRF OLED',
        '27" 1920×1080 360Hz – Asus ROG Swift Pro 1080p',
        '27" 1920×1080 500Hz – LG UltraGear 1080p',
        '24" 1920×1080 240Hz – BenQ EL2870U Gaming',
        '24" 1920×1080 360Hz – LG UltraGear OLED',
        '24" 1920×1080 500Hz – Asus ROG Swift 1080p',
        '28" 4K 144Hz HDMI 2.1 – LG 32UP550',
        '32" 4K 144Hz HDMI 2.1 – Asus PA328QV Pro',
        '30" 5120×1600 60Hz – LG Curved UltraWide',
        '38" 3840×1600 160Hz – LG Curved GamerUpgrade',
        // High Refresh Rate IPS
        '27" 1920×1080 360Hz IPS – LG 27GN950',
        '27" 2560×1440 165Hz IPS – Dell S2721DGF',
        '32" 2560×1440 165Hz IPS – LG 32GN550',
        // High Refresh Rate VA
        '27" 2560×1440 165Hz VA – MSI Curved Gaming',
        '32" 2560×1440 165Hz VA – Asus PA328PV Gaming',
        '27" 1920×1080 240Hz VA – Dell Alienware 27',
        // 4K Gaming
        '32" 4K 144Hz FALD – LG 32UP550',
        '27" 4K 144Hz FALD – LG 27UP550',
        '48" 4K 144Hz OLED – LG OLED Curved',
        // Professional Monitors
        '32" 10-bit 400nits Calibrated – Dell U3224PGK',
        '27" ProMotion 120Hz – Apple Pro Display XDR',
        '32" Mini-LED 1600 nits – LG DualUp 32UP550'
    ],
    'Monitor – Munka/Fejlesztés': [
        // Ultrawide Productivity
        '34" 3440×1440 60Hz USB-C – LG 34UP550',
        '34" 3440×1440 100Hz USB-C – LG Curved UltraWide',
        '38" 3840×1600 60Hz USB-C – Dell UltraSharp 38',
        // 4K Productivity
        '32" 4K 60Hz USB-C – LG 32UP550',
        '27" 4K 60Hz USB-C – Dell UltraSharp 27',
        '24" 4K 60Hz USB-C – LG UltraFine 24',
        // Dual 4K / Multi-Monitor
        '27" 4K 60Hz × 2 Setup',
        '32" 4K 60Hz × 2 Setup',
        '24" 4K 60Hz × 3 Setup',
        // High Color Accuracy
        '32" Thunderbolt 3 – LG UltraFine Ergo',
        '27" 10-bit Professional – Eizo ColorNavigator',
        '24" Reference – BenQ SW240 10-bit',
        // Portable Displays
        '15.6" Portable IPS – ASUS MB16AC',
        '17.3" Portable 165Hz – ViewSonic VP1655',
        '14" USB-C Portable – Lepow L2',
        // Curved Productivity
        '34" 1000R Curved – Dell Alienware AW3420DW',
        '32" Curved 100Hz – LG Curved UltraWide'
    ],
    'Monitor – Általános': [
        // Budget
        '24" 1920×1080 60Hz TN – LG 24MK430H',
        '27" 1920×1080 60Hz TN – Dell S2722DC',
        '24" 1920×1200 60Hz IPS – BenQ GW2480',
        // Mid-Range
        '27" 2560×1440 60Hz IPS – Dell S2721DGF',
        '32" 2560×1440 60Hz IPS – LG 32GN550',
        '24" 1920×1080 144Hz IPS – ASUS VP28U',
        // Premium
        '27" 2560×1440 100Hz IPS – LG 27GP850',
        '32" 2560×1440 100Hz IPS – LG 32GP850',
        '24" 1920×1200 144Hz USB-C – Dell U2424HE'
    ],
    'Monitorlánc (Multi-Monitor Setup)': [
        '2×24" Vertikális',
        '2×27" Vízszintes',
        '3×24" Panoráma',
        '2×27" + 1×24" Center Focus',
        '4×24" Quad Setup',
        'Ultrawide + 2×27" Függőleges',
        '5×24" Surround Setup'
    ],
    'Monitor – Speciális': [
        '7680×4320 Ultra HD – 60Hz',
        'Curved 34" Gaming 240Hz',
        'Touch 32" Interactive Display',
        'VRR G-Sync & FreeSync',
        'HDR Mini-LED Backlight 1000+ nits',
        'Quantum Dot QD-OLED Technology',
        '144Hz+ Portable USB-C Display'
    ],
    'Memória – típus és sebesség': ['DDR4 3200 MHz', 'DDR4 3600 MHz', 'DDR5 5200 MHz', 'DDR5 5600 MHz', 'DDR5 6000 MHz', 'DDR5 6400 MHz', 'DDR5 7200 MHz', 'DDR5 8000+ MHz', 'AMD EXPO', 'Intel XMP'],
    'Memória – kapacitás': ['16 GB (2x8 GB)', '32 GB (2x16 GB)', '48 GB (2x24 GB)', '64 GB (2x32 GB)', '96 GB', '128 GB'],
    'SSD és HDD': ['M.2 NVMe PCIe 5.0 1TB', 'M.2 NVMe PCIe 5.0 2TB', 'M.2 NVMe PCIe 5.0 4TB', 'Crucial T700', 'Crucial T705', 'Corsair MP700', 'Samsung 990 EVO Plus', 'Samsung 9100 Pro', 'M.2 NVMe PCIe 4.0 500GB', 'M.2 NVMe PCIe 4.0 1TB', 'M.2 NVMe PCIe 4.0 2TB', 'M.2 NVMe PCIe 4.0 4TB', 'M.2 NVMe PCIe 4.0 8TB', 'Samsung 990 Pro', 'WD Black SN850X', 'Kingston KC3000', 'Lexar NM790', '2.5 hüvelykes SATA SSD 500GB–4TB', '3.5 hüvelykes HDD 2TB–24TB'],
    'Tápegység – teljesítmény': ['550W', '650W', '750W', '850W', '1000W', '1200W', '1600W'],
    'Tápegység – szabvány és kábelezés': ['ATX 3.0', 'ATX 3.1', '12V-2x6', '12VHPWR', 'Nem moduláris', 'Félmoduláris', 'Teljesen moduláris'],
    'Tápegység – hatásfok és méret': ['80+ Bronze', '80+ Gold', '80+ Platinum', '80+ Titanium', 'ATX', 'SFX', 'SFX-L'],
    'Processzorhűtés': ['Gyári hűtő (Stock)', 'Egytornyos léghűtő 120mm', 'Kéttornyos léghűtő', 'Thermalright Peerless Assassin', 'Thermalright Phantom Spirit', 'Noctua NH-D15', 'Be Quiet! Dark Rock Pro', 'AIO 120mm', 'AIO 240mm', 'AIO 280mm', 'AIO 360mm', 'AIO 420mm'],
    'Számítógépház és ventilátor': ['Mini-ITX ház', 'Micro-ATX torony', 'Mid-Tower', 'Full-Tower', 'Dual-Chamber ház', 'GPU riser kábel', '120mm ventilátor', '140mm ventilátor', 'ARGB ventilátor'],
    'PlayStation SSD és kiegészítők': ['WD_BLACK SN850P 1TB–8TB', 'Samsung 990 Pro Heatsink 1TB–4TB', 'Corsair MP600 Pro LPX 1TB–8TB', 'Kingston Fury Renegade Heatsink', 'Seagate FireCuda 530 Heatsink', 'DualSense kontroller', 'DualSense Edge', 'PS5 Disc Drive Slim/Pro', 'PlayStation Portal', 'Pulse Elite headset', 'Pulse Explore fülhallgató', 'PS VR2'],
    'Xbox SSD és kiegészítők': ['Seagate Storage Expansion Card 512GB', 'Seagate Storage Expansion Card 1TB', 'Seagate Storage Expansion Card 2TB', 'WD_BLACK C50 Expansion Card 512GB', 'WD_BLACK C50 Expansion Card 1TB', 'Xbox Wireless Controller', 'Xbox Elite Series 2', 'Xbox Play & Charge Kit', 'Xbox Wireless Headset'],
    'Nintendo tárhely és kiegészítők': ['Switch 2 microSD Express', 'Switch UHS-I microSDXC', 'SanDisk microSDXC 128GB–1.5TB', 'Samsung EVO Select microSDXC 128GB–1.5TB', 'Joy-Con párok', 'Nintendo Switch Pro Controller', 'Nintendo Switch dokkoló', 'Nintendo Switch védőtok', 'Nintendo Switch üvegfólia'],
    'Kézi PC SSD és kiegészítők': ['Corsair MP600 Mini 1TB', 'Corsair MP600 Mini 2TB', 'WD_BLACK SN770M 1TB', 'WD_BLACK SN770M 2TB', 'Sabrent Rocket 2230 1TB', 'Sabrent Rocket 2230 2TB', 'Kézi PC dokkoló']
};

// Advanced Build Configurations for Smart Configurator
const advancedBuilds = {
    '1080p_esports': {
        name: '1080p E-Sports Beast',
        resolution: '1080p',
        fps: 240,
        price: 400000,
        gpu: 'RTX 5070',
        cpu: 'Ryzen 7 7700X',
        ram: '32GB DDR5 6000MHz',
        psu: '750W'
    },
    '1440p_balanced': {
        name: '1440p Balanced Build',
        resolution: '1440p',
        fps: 144,
        price: 650000,
        gpu: 'RTX 5080',
        cpu: 'Ryzen 7 9700X',
        ram: '32GB DDR5 6000MHz',
        psu: '850W'
    },
    '4k_cinematic': {
        name: '4K Cinematic Build',
        resolution: '4K',
        fps: 60,
        price: 1200000,
        gpu: 'RTX 5090',
        cpu: 'Ryzen 9 9950X',
        ram: '64GB DDR5 6400MHz',
        psu: '1200W'
    },
    'workstation_pro': {
        name: 'Professional Workstation',
        resolution: '4K Multi-Monitor',
        fps: 'N/A',
        price: 950000,
        cpu: 'Ryzen 9 7950X3D',
        ram: '128GB DDR5',
        storage: '8TB NVMe RAID',
        psu: '1000W'
    }
};

// Monitor Pairing Recommendations
const monitorPairingRules = {
    'RTX 5090': ['34" 240Hz Ultrawide', '32" 360Hz 4K', '7680×4320 60Hz'],
    'RTX 5080': ['27" 360Hz', '34" 240Hz Ultrawide', '32" 240Hz'],
    'RTX 4090': ['27" 240Hz', '32" 144Hz', 'Dual 27" 165Hz'],
    'RX 7900 XTX': ['27" 240Hz', '32" 144Hz', '34" Ultrawide'],
    'RTX 4070': ['27" 144Hz', '24" 240Hz', 'Dual 24"'],
    'Development': ['34" Ultrawide', 'Dual 27" 4K', 'Portable Monitor']
};

// Game Performance Profiles
const gameProfiles = {
    'Cyberpunk 2077': { tier: 'extreme', vram: '16GB+', pci: '5.0', monitor: '1440p 120Hz' },
    'Black Myth: Wukong': { tier: 'extreme', vram: '14GB+', pci: '5.0', monitor: '1440p 100Hz' },
    'Avatar: Frontiers of Pandora': { tier: 'ultra', vram: '12GB+', pci: '5.0', monitor: '1440p 100Hz' },
    'Valorant': { tier: 'entry', vram: '4GB+', pci: '3.0', monitor: '1080p 240Hz' },
    'Counter-Strike 2': { tier: 'entry', vram: '4GB+', pci: '3.0', monitor: '1080p 360Hz' }
};

// Export to window for main.js to use
window.gamePlatforms = gamePlatforms;
window.gameGroups = gameGroups;
window.additionalGames = additionalGames;
window.knownGames = knownGames;
window.developmentStacks = developmentStacks;
window.consoleGroups = consoleGroups;
window.hardwareGroups = hardwareGroups;
window.advancedBuilds = advancedBuilds;
window.monitorPairingRules = monitorPairingRules;
window.gameProfiles = gameProfiles;
