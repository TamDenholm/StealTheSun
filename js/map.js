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

        // wait for the spritesheet to load before loading the map
        this.spritesheet = new Image();
        this.spritesheet.onload = function(){
            map.draw_map();
        };
        this.spritesheet.src = '/images/spritesheets/map.png';
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
        console.log('drawing tile');
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
        // could do with putting this data in an object or something
        if(name == 'stone'){
            switch (level) {
                case 1: return 5;
                case 2: return 6;
                case 3: return 7;
                case 4: return 8;
                default: return 7;
            }
        }
        if(name == 'wood'){
            switch (level) {
                case 1: return 9;
                case 2: return 10;
                case 3: return 11;
                case 4: return 12;
                default: return 11;
            }
        }
        if(name == 'grass'){
            return 2;
        }
        if(name == 'player'){
            return 4;
        }
        if(name == 'campfire'){
            return 1;
        }
        console.log('Specified a sprite that doesnt exist!');
        return false;
    },

    // give coordinates, get the resource, or false
    get_resource: function(x,y){
        let rtn = false;
        $.each(this.resources, function(resource,positions){
            $.each(positions, function(k, position){
                if(position[0] == x && position[1] == y){
                    rtn = resource;
                }
            })
        });
        return rtn;
    },

}