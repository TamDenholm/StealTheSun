var resources = {

    energy: {
        amount: 10,
        cap: 15
    },
    wood: {
        amount: 0,
        cap: 15
    },
    stone: {
        amount: 0,
        cap: 50
    },
    metal: {
        amount: 0,
        cap: 50
    },
    silicon: {
        amount: 0,
        cap: 50
    },

    // update the UI with the resources
    update: function(){
        // die condition
        if(this.energy < 1){
            main.die();
        }

        // update resource UI
        $('#energy').text(this.energy.amount+'/'+this.energy.cap);
        $('#wood').text(this.wood.amount+'/'+this.wood.cap);
        $('#stone').text(this.stone.amount+'/'+this.stone.cap);
        $('#metal').text(this.metal.amount+'/'+this.metal.cap);
        $('#silicon').text(this.silicon.amount+'/'+this.silicon.cap);
    },

    // edit how much of any resource we have
    edit: function(resource, i){
        let edited = false
        if (resources.editable(resource, i)) {
            this[resource].amount += i
            edited = true
        }
        this.update()
        return edited
    },
    
    // check if a resource is "editable"
    editable: function(resource, i) {
        let edited = this[resource].amount + i
        return edited>=0 && edited<=this[resource].cap
    }
};
