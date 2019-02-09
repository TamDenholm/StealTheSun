var main = {

    game_tick: 1000,

    // main loop of the game
    run: function(){
        // initial load
        resources.update();
        actions.attach();

        // begin loop
        setInterval(function(){
            resources.energy--;
            resources.update();

        }, this.game_tick);
    },

    die: function(){
        $('body').html('<p class="container mt-5">You died sucka!<br><button onclick="location.reload();">Try again</button></p>');
    },


};

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
        $('#energy').text(resources.energy);
        $('#wood').text(resources.wood);
        $('#stone').text(resources.stone);
        $('#metal').text(resources.metal);
        $('#silicon').text(resources.silicon);
    },

    add_energy: function(i){
        this.energy += i;
        this.update();
    }
};

var actions = {

    // attach the actions to the DOM
    attach: function(){
        // add energy button
        $('#add_energy').on('click', function(){
            resources.add_energy(1);
        });
    }

}