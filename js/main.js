const main = {

    game_tick: 1000,
    load: true,
    save: true,

    // main loop of the game
    run(){
        // initial load
        resources.update();
        main.draw_buttons();
        if(this.load === true){
            main.load_state();
        }
        map.init();

        // begin loop
        setInterval(() => {

            // production & consumption
            main.production_consumption();
            resources.update();
            main.draw_buttons();
            main.build_button_toggle();
            if(this.save === true){
                main.save_state();
            }

        }, this.game_tick);
    },

    die(){
        resources.energy.amount = 50;
        resources.wood.amount = 0;
        resources.stone.amount = 0;
        resources.metal.amount = 0;
        resources.silicon.amount = 0;
        main.save_state();
        $('body').html('<p class="container mt-5">You died sucka!<br>You lost all of your resources but your buildings remain.<br><button onclick="location.reload();">Try again</button></p>');
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
                    if(main.wont_hit_cap(resource, amount)){ // we're using this wrong, it doesnt take arguments, need to refactor this
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
    // this should be in resources class
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
                });
            });
        });
        // all good in the hood, proceed
        return return_val;
    },

    // draw the build buttons
    draw_buttons(){
        $.each(build, (item) => {
            if(build[item].button !== false && (resources.all_available(build[item].button) || utilities.state_get('buttons').includes(item))){
                // we have met the available resource requirements
                console.log(`Build button: ${build[item].title}`);
                // work out the cost for the tooltip
                let cost = '';
                $.each(build[item].cost, (resource, amount) => {
                    cost += `${resource}: ${amount} `;
                });
                // create the button code
                $('#build_buttons').append(
                    `<a href="#" id="build_${item}" class="list-group-item list-group-item-action disabled">
                    <div class="d-flex w-100 justify-content-between">
                        <h5>${build[item].title}</h5>
                        <i class="${build[item].icon}"></i>
                    </div>
                    <p>${build[item].desc}</p>
                    <small>${cost}</small></a>`
                );
                build[item].button = false; // dont build a second button
                utilities.state_append_unique('buttons', item); // we've unlocked it, keep it unlocked if we die
                actions.attach();
            }
        });
    },

    // enable/disable build buttons based on resources
    build_button_toggle(){
        for(item in build){
            // buttons we can see based on local storage
            if(utilities.state_get('buttons').includes(item)){
                // do we have the resources available and does it not already exist
                if(resources.all_available(build[item].cost) && build[item].exists !== true){
                    $(`#build_${item}`).removeClass('disabled').addClass('list-group-item-primary');
                }else{
                    $(`#build_${item}`).addClass('disabled').removeClass('list-group-item-primary');
                }
            }
        }
    },

    // keep the state of the game in localstorage
    save_state(){
        const state = window.localStorage;
        // resources
        state.setItem('resources', JSON.stringify(resources));
        // player
        state.setItem('pl_pos', JSON.stringify(player.get_position()));
        // items
        state.setItem('build', JSON.stringify(build));
    },

    // load the state of the game from the localstorage
    load_state(){
        const state = window.localStorage;
        // load the resources
        const obj = JSON.parse(state.getItem('resources'));
        for(item in obj){
            if(resources.hasOwnProperty(item)){
                resources[item] = obj[item];
            }
        }
        resources.update();

        // load the player position
        if(state.getItem('pl_pos')){
            player.current_position = JSON.parse(state.getItem('pl_pos'));
        }
        // load the items
        if(state.getItem('build')){
            const items = JSON.parse(state.getItem('build'));
            for(item in items){
                build[item].exists = items[item].exists;
                build[item].position = items[item].position;
            }
        }
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