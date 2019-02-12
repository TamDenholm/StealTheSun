let map = {

    cols: 9,
    rows: 9,
    tile_size: 64,
    spritesheet: null,
    context: null,
    resources: {
        'stone': [[1,3],[4,4],[8,1]],
        'wood': [[5,2],[6,6],[2,5]]
    },

    // initialisation
    init: function(){
        this.context = document.getElementById('map').getContext('2d');
        // fix this load image thing
        this.spritesheet = document.getElementById('spritesheet');

        // draw the map
        this.draw_map();
    },

    draw_map: function(){
        // place the sprites onto the canvas
        for(let x = 0; x < this.cols; x++){
            for(let y = 0; y < this.rows; y++){
                // default grass everywhere
                this.draw_tile('grass', x, y);
            }
        }
        // after we've drawn the map
        // place the resources
        $.each(this.resources, function(resource,positions){
            $.each(positions, function(k, position){
                map.draw_tile(resource, position[0]-1, position[1]-1);    
            })
        });
        // get the player position
        let human = player.get_position();
        this.draw_tile('player', human[0]-1, human[1]-1);
    },

    // tell this what to place, and where to place it on the map
    draw_tile: function(sprite, x, y){
        this.context.drawImage(
            this.spritesheet,            // spritesheet image for map
            (this.get_sprite(sprite) - 1) * this.tile_size, // spritesheet start x
            0,                      // spritesheet start y
            this.tile_size,              // how much of spritesheet to move x
            this.tile_size,              // how much of spritesheet to move x
            x * this.tile_size,          // where to place on canvas x
            y * this.tile_size,          // where to place on cavas y
            this.tile_size,              // how much of canvas to draw x
            this.tile_size               // how much of canvas to draw y
        );
    },

    // lookup function that makes it easier to specify a sprite
    get_sprite: function(name, level = 3){
        if(name == 'stone'){
            switch (level) {
                case 1: return 1;
                case 2: return 2;
                case 3: return 3;
                case 4: return 4;
                default: return 1;
            }
        }
        if(name == 'wood'){
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