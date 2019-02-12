let actions = {

    // attach the actions to the DOM
    attach: function(){
        // add energy button
        $('#gather_wood').on('click', function(){
            resources.edit('energy', -1);
            resources.edit('wood', utilities.random(1,2));
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


};