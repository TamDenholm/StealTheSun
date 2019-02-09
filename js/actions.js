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