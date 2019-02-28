const main = {

    game_tick: 1000,
    load: true,
    save: true,

    // main loop of the game
    run(){
        // initial load
        resources.update();
        ui.load();
        if(this.load === true){
            utilities.load_state();
        }
        map.init();

        // begin loop
        setInterval(() => {

            // production & consumption
            main.production_consumption();
            resources.update();
            ui.draw_buttons();
            ui.build_button_toggle();
            if(this.save === true){
                utilities.save_state();
            }

        }, this.game_tick);
    },

    die(){
        resources.energy.amount = 50;
        resources.wood.amount = 0;
        resources.stone.amount = 0;
        resources.metal.amount = 0;
        resources.silicon.amount = 0;
        utilities.save_state();
        $('body').html('<p class="container mt-5">You died sucka!<br>You lost all of your resources but your buildings remain.<br><button onclick="location.reload();">Try again</button></p>');
    },

    production_consumption(){
        // get all the active items
        items.get_active().forEach((item) => {
            // is the player standing on the tile?
            const pl_pos = player.get_position();
            const item_pos = build[item].position;
            if(pl_pos[0] === item_pos[0] && pl_pos[1] === item_pos[1]){
                // get everything the item consumes
                for(let resource in build[item].consumes){
                    let amount = build[item].consumes[resource]
                    const result = main.wont_hit_cap(resource, amount);
                    console.log(`result of wont_hit_cap(${resource}, ${amount}) is ${result}`)
                    if(main.wont_hit_cap(resource, amount)){ // we're using this wrong, it doesnt take arguments, need to refactor this
                        // edit resource
                        if(resources.edit(resource, (0-amount))){
                            console.log('consumed');
                            // if consumed, then produce
                            for(let resource in build[item].produces){
                                // edit resource
                                let amount = build[item].produces[resource]
                                resources.edit(resource, amount);
                                console.log('produced');
                            };
                        }
                    }
                };
            }
        });
    },

    // checks the resource caps to see if we can consume
    // this should be in resources class
    wont_hit_cap(){
        let return_val = true;
        // get all the active items
        items.get_active().forEach((item) => {
            // in order to consume
            for(let c_resource in build[item].consumes){
                // first check what it produces
                let c_amount = build[item].consumes[c_resource]
                for(let p_resource in build[item].produces){
                    // if what it produces will hit the cap
                    let p_amount = build[item].produces[p_resource]
                    if(resources.hit_cap(p_resource, p_amount)){
                        // bring the resource to its cap
                        if(resources[p_resource].amount < resources[p_resource].cap){
                            // fill to the brim
                            resources[p_resource].amount = resources[p_resource].cap;
                            // consume one last time
                            resources.edit(c_resource, 0-c_amount);
                            console.log('Fill to the brim');
                        }
                        // do not consume, just stop
                        console.log(`Cannot consume ${c_resource} because adding ${p_amount} to ${p_resource} would hit its cap`);
                        return_val = false;
                    }
                };
            };
        });
        // all good in the hood, proceed
        return return_val;
    },

    // reset the game and start from scratch
    reset(){
        // suspend loading and saving
        this.load = false;
        this.save = false;
        // clear localstorage
        window.localStorage.clear();
        // refresh the page
        location.reload();

    }

};
