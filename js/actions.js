var actions = {

    // attach the actions to the DOM
    attach: function(){
        // add energy button
        $('#gather_wood').on('click', function(){
            let gain = actions.random(1,Math.min(2,resources['wood'].cap-resources['wood'].amount))
            if (gain!==0 && resources.editable('wood',gain) && resources.edit('energy', -1)) {
                resources.edit('wood', gain);
            }
        });

        // campfire
        $('#build_campfire').on('click', function(){
            items.build('campfire');
        });
    },

    random: function(min, max){
        if (min>max) return 0
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

};