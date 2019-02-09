var resources = {

    energy: 10,
    wood: 0,
    stone: 0,
    metal: 0,
    silicon: 0,

    // update the UI with the resources
    update: function(){
        // die condition
        if(this.energy < 1){
            main.die();
        }

        // update resource UI
        $('#energy').text(this.energy);
        $('#wood').text(this.wood);
        $('#stone').text(this.stone);
        $('#metal').text(this.metal);
        $('#silicon').text(this.silicon);
    },

    edit: function(resource, i){
        var left_over = this[resource];// this is piss poor, recode this later....
        left_over += i;
        if(left_over >= 0){
            this[resource] += i;
            this.update();
            console.log('Resource: '+resource+' change: '+i);
            return true;
        }
        this.update();
        return false;
    },
};

var actions = {

    // attach the actions to the DOM
    attach: function(){
        // add energy button
        $('#gather_wood').on('click', function(){
            resources.edit('energy', -1);
            resources.edit('wood', actions.random(1,2));
        });

        // campfire
        $('#build_campfire').on('click', function(){
            items.build('campfire');
        });
    },

    random: function(min, max){
        return Math.floor((Math.random() * max) + min);
    }

};

var items = {

    build: function(item){
        if(build.hasOwnProperty(item) && build[item].exists != true){
            $.each(build[item].cost, function(resource, amount){
                if(resources.edit(resource, (0-amount))){
                    build[item].exists = true;
                }
            });
        }
        this.update();
    },

    update: function(){
        $('#stuff').html('');
        $.each(items.get_active(), function(k, item){
            $('#stuff').append('<div class="col-2 item" id="'+item+'">'+item+'</div>');
        });
    },

    get_active: function(){
        var active_items = [];
        for(var property in build){
            if(build[property].exists == true){
                active_items.push(property);
            }
        }
        return active_items;
    }

};

var build = {
    campfire: {
        cost: {
            wood: 5,
        },
        produces: {
            energy: 2,
        },
        consumes: {
            wood: 1,
        }
    }
}

var main = {

    game_tick: 1000,

    // main loop of the game
    run: function(){
        // initial load
        resources.update();
        actions.attach();

        // begin loop
        setInterval(function(){

            // production & consumption
            main.production_consumption();
    
            // only lose energy at night, staying warm
            resources.update();

        }, this.game_tick);
    },

    die: function(){
        $('body').html('<p class="container mt-5">You died sucka!<br><button onclick="location.reload();">Try again</button></p>');
    },

    production_consumption: function(){
        // get all the active items
        $.each(items.get_active(), function(k, item){
            // get everything the item consumes
            $.each(build[item].consumes, function(resource, amount){
                // edit resource
                if(resources.edit(resource, (0-amount))){
                    // if consumed, then produce
                    $.each(build[item].produces, function(resource, amount){
                        // edit resource
                        resources.edit(resource, amount);
                    });        
                }
            });
        });
    }


};