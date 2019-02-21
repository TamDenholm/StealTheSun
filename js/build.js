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
            wood: 100,
        },
        cost: {
            wood: 150,
            stone: 50,
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
            wood: 50,
        },
        caps: {
            wood: 250
        }
    },
    quarry:{
        title: 'Quarry',
        icon: 'fas fa-tools',
        sprite: 12,
        requires_tile: 'stone',
        button: {
            wood: 220,
            stone: 220,
        },
        cost: {
            wood: 250,
            stone: 250,
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
            wood: 200,
            stone: 200,
        },
        cost: {
            wood: 250,
            stone: 250,
        },
        gather: {
            wood: utilities.random(10, 15),
            energy: -10
        }
    }
}