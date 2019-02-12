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
            player.move_left();
            map.draw_map();
        });
        // right
        $('#move_right').on('click', function(){
            player.move_right();
            map.draw_map();
        });
        // up
        $('#move_up').on('click', function(){
            player.move_up();
            map.draw_map();
        });
        // down
        $('#move_down').on('click', function(){
            player.move_down();
            map.draw_map();
        });
    },


};