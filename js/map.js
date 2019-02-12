let map = {

    // initialisation
    init: function(){
        this.draw_map();
    },

    draw_map: function(){
        let context = document.getElementById('map').getContext('2d');
        // figure out a better way to load images
        let spritesheet = document.getElementById('spritesheet');

        let cols = 9;
        let rows = 9;
        let tile_size = 64;

        // could make this better, obj maybe?
        let stone_1 = 1;
        let stone_2 = 2;
        let stone_3 = 3;
        let stone_4 = 4;
        let tree_1 = 5;
        let tree_2 = 6;
        let tree_3 = 7;
        let tree_4 = 8;
        let grass_1 = 9;
        let grass_2 = 10;
        let player = 11;

        // place the sprites onto the canvas
        for(let c = 0; c < cols; c++){
            for(let r = 0; r < rows; r++){
                // place ground
                context.drawImage(
                    spritesheet,            // spritesheet image for map
                    (utilities.random(9,10) - 1) * tile_size, // spritesheet start x
                    0,                      // spritesheet start y
                    tile_size,              // how much of spritesheet to move x
                    tile_size,              // how much of spritesheet to move x
                    c * tile_size,          // where to place on canvas x
                    r * tile_size,          // where to place on cavas y
                    tile_size,              // how much of canvas to draw x
                    tile_size               // how much of canvas to draw y
                );
                // place objects over ground
                if(this.get_tile((c + 1), (r + 1))){
                    context.drawImage(
                        spritesheet,            // spritesheet image for map
                        (this.get_tile((c + 1),(r + 1)) - 1) * tile_size, // spritesheet start x
                        0,                      // spritesheet start y
                        tile_size,              // how much of spritesheet to move x
                        tile_size,              // how much of spritesheet to move x
                        c * tile_size,          // where to place on canvas x
                        r * tile_size,          // where to place on cavas y
                        tile_size,              // how much of canvas to draw x
                        tile_size               // how much of canvas to draw y
                    );
                }
            }
        }
    },

    get_tile: function(x,y){
        // get the player position
        let human = player.get_position();
        if(x == human[0] && y == human[1]){
            return 11;
        }
        // trees
        if(x == 4 && y == 4){
            return 7;
        }
        // stone
        if(x == 4 && y == 6){
            return 3;
        }
        return false;
        //return utilities.random(9,10);
    }

}