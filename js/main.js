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
                    console.log('consumed');
                    // if consumed, then produce
                    $.each(build[item].produces, function(resource, amount){
                        // edit resource
                        resources.edit(resource, amount);
                        console.log('produced');
                    });        
                }
            });
        });
    }


};