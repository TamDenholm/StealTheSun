let map = {

    cols: 9,
    rows: 9,
    tile_size: 64,

    // initialisation
    init: function(){
        this.draw_map();
    },

    draw_map: function(){
        let context = document.getElementById('map').getContext('2d');
        // figure out a better way to load images
        let spritesheet = document.getElementById('spritesheet');

        // place the sprites onto the canvas
        for(let c = 0; c < this.cols; c++){
            for(let r = 0; r < this.rows; r++){
                // place ground
                context.drawImage(
                    spritesheet,            // spritesheet image for map
                    (this.get_sprite('grass') - 1) * this.tile_size, // spritesheet start x
                    0,                      // spritesheet start y
                    this.tile_size,              // how much of spritesheet to move x
                    this.tile_size,              // how much of spritesheet to move x
                    c * this.tile_size,          // where to place on canvas x
                    r * this.tile_size,          // where to place on cavas y
                    this.tile_size,              // how much of canvas to draw x
                    this.tile_size               // how much of canvas to draw y
                );
                // place objects over ground
                if(this.get_tile((c + 1), (r + 1))){
                    context.drawImage(
                        spritesheet,            // spritesheet image for map
                        (this.get_tile((c + 1),(r + 1)) - 1) * this.tile_size, // spritesheet start x
                        0,                      // spritesheet start y
                        this.tile_size,              // how much of spritesheet to move x
                        this.tile_size,              // how much of spritesheet to move x
                        c * this.tile_size,          // where to place on canvas x
                        r * this.tile_size,          // where to place on cavas y
                        this.tile_size,              // how much of canvas to draw x
                        this.tile_size               // how much of canvas to draw y
                    );
                }
            }
        }
    },

    get_sprite: function(name, level = 0){

        if(name == 'stone'){
            switch (level) {
                case 1: return 1;
                case 2: return 2;
                case 3: return 3;
                case 4: return 4;
                default: return 1;
            }
        }
        if(name == 'tree'){
            switch (level) {
                case 1: return 5;
                case 2: return 6;
                case 3: return 7;
                case 4: return 8;
                default: return 5;
            }
        }
        if(name == 'grass'){
            return 9;
        }
        if(name == 'player'){
            return 11;
        }
        console.log('Specified a sprite that doesnt exist!');
        return false;
    },

    get_tile: function(x,y){
        // get the player position
        let human = player.get_position();
        if(x == human[0] && y == human[1]){
            return this.get_sprite('player');
        }
        // trees
        if(x == 4 && y == 4){
            return this.get_sprite('tree', 3);
        }
        // stone
        if(x == 4 && y == 6){
            return this.get_sprite('stone', 3);
        }
        return false;
        //return utilities.random(9,10);
    }

}