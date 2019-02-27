const actions = {
    // this is hacky as fuck but i had to add off()
    // into the method chain to stop events being triggered multiple times

    // attach the actions to the DOM
    attach(){
        console.log('run attach');
        // add energy button
        $('#gather').off().on('click', () => {
            // get the position
            actions.gather();
        });

        // create button events
        for(let item in build){
            $(`#build_${item}`).off().on('click', () => {
                items.build(item);
            });
        };

        // player movement
        // left
        $('#move_left').off().on('click', () => {
            player.move('left');
            map.draw_map();
        });
        // right
        $('#move_right').off().on('click', () => {
            player.move('right');
            map.draw_map();
        });
        // up
        $('#move_up').off().on('click', () => {
            player.move('up');
            map.draw_map();
        });
        // down
        $('#move_down').off().on('click', () => {
            player.move('down');
            map.draw_map();
        });
        // keybrindings for players movement
        $(document).off().on('keydown', (e) => {
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

        // reset the game
        $('#reset_game').off().on('click', () => {
            const areyousure = confirm('Are you sure?');
            if(areyousure){
                main.reset();
            }
        });
    },

    // the "action" click event
    gather(){
        // player position
        const pl_pos = player.get_position();
        // get the resource of the tile we're on
        const resource = map.get_resource(pl_pos[0], pl_pos[1]);
        // does the tile we're on have a resource we can gather?
        if(resource !== false){
            // gather the resource
            if(resources.edit(resource, utilities.random(1,2))){
                // use energy
                resources.edit('energy', -1);
            }
        }
        // are we on a building?
        for(let item in build){
            // check all the buildings
            if(build[item].exists === true && Array.isArray(build[item].position)){
                // are we standing on it?
                let item_pos = build[item].position;
                if(pl_pos[0] === item_pos[0] && pl_pos[1] === item_pos[1]){
                    // check resources are available
                    if(resources.all_available(build[item].gather) && !resources.all_hit_cap(build[item].gather)){
                        // cool, make the resource changes
                        $.each(build[item].gather, (resource, amount) => {
                            resources.edit(resource, amount);
                        });
                    }
                    // cannot brim
                }
            }
        };
    }
};
