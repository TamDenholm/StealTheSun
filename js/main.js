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

    edit_energy: function(i){
        this.energy += i;
        this.update();
    },

    edit_wood: function(i){
        this.wood += i;
        this.update();
    },
};

var actions = {

    // attach the actions to the DOM
    attach: function(){
        // add energy button
        $('#gather_wood').on('click', function(){
            resources.edit_energy(-1);
            resources.edit_wood(actions.random(1,2));
        });
    },

    random: function(min, max){
        return Math.floor((Math.random() * max) + min);
    }

};

var main = {

    game_tick: 1000,

    // main loop of the game
    run: function(){
        // initial load
        resources.update();
        actions.attach();

        // begin loop
        /*
        setInterval(function(){
            // only lose energy at night, staying warm
            //resources.energy--;
            resources.update();

        }, this.game_tick);
        */
    },

    die: function(){
        $('body').html('<p class="container mt-5">You died sucka!<br><button onclick="location.reload();">Try again</button></p>');
    },


};