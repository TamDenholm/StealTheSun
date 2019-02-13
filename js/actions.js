let actions = {

    // attach the actions to the DOM
    attach: function(){
        // add energy button
        $('#gather').on('click', function(){
            // get the position
            actions.gather();
        });

        // campfire
        $('#build_campfire').on('click', function(){
            items.build('campfire');
        });

        // player movement
        // left
        $('#move_left').on('click', function(){
            player.move('left');
            map.draw_map();
        });
        // right
        $('#move_right').on('click', function(){
            player.move('right');
            map.draw_map();
        });
        // up
        $('#move_up').on('click', function(){
            player.move('up');
            map.draw_map();
        });
        // down
        $('#move_down').on('click', function(){
            player.move('down');
            map.draw_map();
        });
        // keybrindings for players movement
        $(document).keydown(function(e){
            switch(e.which){
                case 37:
                    player.move('left');
                    break;
                case 38:
                    player.move('up');
                    break
                case 39:
                    player.move('right');
                    break;
                case 40:
                    player.move('down');
                    break;
                default: return;
            }
            map.draw_map();
            e.preventDefault();
        });
    },


    gather: function(){
        // player position
        let pl_pos = player.get_position();
        // get the resource of the tile we're on
        let resource = map.get_resource(pl_pos[0], pl_pos[1]);
        // does the tile we're on have a resource we can gather?
        if(resource != false){
            // gather the resource
            if(resources.edit(resource, utilities.random(1,2))){
                // use energy
                resources.edit('energy', -1);
            }
        }
    }
};