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
        produces: {
            energy: 2,
        },
        consumes: {
            wood: 1,
        }
    },
    stonestore: {
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
        produces: {
        },
        consumes: {
        },
        caps: {
            wood: 250
        }
    },
    quarry:{},
    sawmill: {}
}