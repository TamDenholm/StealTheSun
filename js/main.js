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
                var result = main.can_consume(resource, amount);
                console.log('result of can_consume('+resource+', '+amount+') is '+result);
                if(main.can_consume(resource, amount)){
                    // edit resource
                    if(resources.edit(resource, (0-amount))){
                        console.log('consumed');
                        // if consumed, then produce
                        $.each(build[item].produces, function(resource, amount){
                            // edit resource
                            resources.edit(resource, amount);
                            console.log('produced');
                        });        
                    }
                }
            });
        });
    },

    can_consume: function(){
        var return_val = true;
        // get all the active items
        $.each(items.get_active(), function(k, item){
            // in order to consume
            $.each(build[item].consumes, function(c_resource, c_amount){
                // first check what it produces
                $.each(build[item].produces, function(p_resource, p_amount){
                    // if what it produces will hit the cap
                    if(resources.hit_cap(p_resource, p_amount)){
                        // do not consume, just stop
                        console.log('Cannot consume '+c_resource+' because adding '+p_amount+' to '+p_resource+' would hit its cap');
                        return_val = false;
                    }
                });
            });
        });
        // all good in the hood, proceed
        return return_val;
    },


};