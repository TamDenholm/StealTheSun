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
            let canProduce = true

            // check if resource getting consumed is enough
            $.each(build[item].consumes, function(resource, amount){
                if (!resources.editable(resource,-amount)) canProduce = false
            });
            
            // check if resource produced don't go above the cap
            $.each(build[item].produces, function(resource, amount){
                if (!resources.editable(resource,amount)) canProduce = false
            });

            if(canProduce) {
                // consume the resource
                $.each(build[item].consumes, function(resource, amount){
                    resources.edit(resource, -amount)
                });
                // finally gain the resources that are "made"
                $.each(build[item].produces, function(resource, amount){
                    resources.edit(resource, amount);
                });        
            }
        });
    }


};