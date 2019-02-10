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
            //Check that all products can be put without exceeding cap
            //Used to determine if there is enough available space
            var should_produce = true;
            $.each(build[item].produces, function(resource, amount){
                // checks the resource if there is enough remaining room
                if(!resources.canAdd(resource,amount))
                {
                  //It should not be produced if it would exceed the cap
                  should_produce = false;
                  return false;
                }
            });
            //checking and continuing the each loop if we should not produce
            if(!should_produce)
            {
              return true;
            }
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
