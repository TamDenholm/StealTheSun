const main = {

    game_tick: 1000,

    // main loop of the game
    run(){
        // initial load
        resources.update();
        actions.attach();
        map.init();

        // begin loop
        setInterval(() => {

            // production & consumption
            main.production_consumption();

            // only lose energy at night, staying warm
            resources.update();

        }, this.game_tick);
    },

    die(){
        $('body').html('<p class="container mt-5">You died sucka!<br><button onclick="location.reload();">Try again</button></p>');
    },

    production_consumption(){
        // get all the active items
        $.each(items.get_active(), (k, item) => {
            // is the player standing on the tile?
            const pl_pos = player.get_position();
            const item_pos = build[item].position;
            if(pl_pos[0] === item_pos[0] && pl_pos[1] === item_pos[1]){
                // get everything the item consumes
                $.each(build[item].consumes, (resource, amount) => {
                    const result = main.wont_hit_cap(resource, amount);
                    console.log(`result of wont_hit_cap(${resource}, ${amount}) is ${result}`)
                    if(main.wont_hit_cap(resource, amount)){
                        // edit resource
                        if(resources.edit(resource, (0-amount))){
                            console.log('consumed');
                            // if consumed, then produce
                            $.each(build[item].produces, (resource, amount) => {
                                // edit resource
                                resources.edit(resource, amount);
                                console.log('produced');
                            });
                        }
                    }
                });
            }
        });
    },

    // checks the resource caps to see if we can consume
    wont_hit_cap(){
        let return_val = true;
        // get all the active items
        $.each(items.get_active(), (k, item) => {
            // in order to consume
            $.each(build[item].consumes, (c_resource, c_amount) => {
                // first check what it produces
                $.each(build[item].produces, (p_resource, p_amount) => {
                    // if what it produces will hit the cap
                    if(resources.hit_cap(p_resource, p_amount)){
                        // do not consume, just stop
                        console.log(`Cannot consume ${c_resource} because adding ${p_amount} to ${p_resource} would hit its cap`);
                        return_val = false;
                    }
                });
            });
        });
        // all good in the hood, proceed
        return return_val;
    },


};