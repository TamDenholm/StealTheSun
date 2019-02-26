const build = {
    campfire: {
        title: 'Campfire',
        icon: 'fab fa-gripfire',
        sprite: 1,
        requires_tile: false,
        button: {
            energy: 50 // show when game loads
        },
        cost: {
            wood: 5,
        },
        gather: {
            energy: 2,
            wood: -1
        }
    },
    stonestore: {
        title: 'Stone Store',
        icon: 'fas fa-warehouse',
        sprite: 14,
        requires_tile: false,
        button: {
            wood: 80,
        },
        cost: {
            wood: 150,
            stone: 45,
        },
        caps: {
            stone: 350
        }
    },
    woodstore: {
        title: 'Wood Store',
        icon: 'fas fa-warehouse',
        sprite: 15,
        requires_tile: false,
        button: {
            wood: 30,
        },
        cost: {
            wood: 45,
        },
        caps: {
            wood: 250
        }
    },
    shelter: {
        title: 'Shelter',
        icon: 'fas fa-warehouse',
        sprite: 15,
        requires_tile: false,
        button: {
            wood: 15,
            stone: 15,
        },
        cost: {
            wood: 40,
            stone: 40
        },
        caps: {
            energy: 125
        }
    },
    quarry:{
        title: 'Quarry',
        icon: 'fas fa-tools',
        sprite: 12,
        requires_tile: 'stone',
        button: {
            wood: 90,
            stone: 90,
        },
        cost: {
            wood: 150,
            stone: 120,
        },
        gather: {
            stone: utilities.random(10, 15),
            energy: -10
        },
    },
    sawmill: {
        title: 'Sawmill',
        icon: 'fas fa-tools',
        sprite: 13,
        requires_tile: 'wood',
        button: {
            wood: 90,
            stone: 90,
        },
        cost: {
            wood: 120,
            stone: 150,
        },
        gather: {
            wood: utilities.random(10, 15),
            energy: -10
        }
    },
    smelter: {
        title: 'Smelter',
        icon: 'fas fa-tools',
        sprite: 15,
        requires_tile: false,
        button: {
            wood: 20,
            stone: 40,
        },
        cost: {
            stone: 100,
        },
        gather: {
            wood: -2,
            stone: -1,
            energy: -3,
            metal: 1
        }
    }
}