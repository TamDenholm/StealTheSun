let resources = {

    energy: {
        amount: 50,
        cap: 50
    },
    wood: {
        amount: 0,
        cap: 50
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
        if(this.energy.amount < 1){
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
        let left_over = this[resource].amount;// this is piss poor, recode this later....
        left_over += i;
        // if we're now going below 0
        if(left_over >= 0){
            // if we're above the cap
            if(this.hit_cap(resource, i)){
                // update return false
                this.update();
                return false;
            }else{
                // make the normal edit
                this[resource].amount += i;
            }
            // update and return true
            this.update();
            console.log('Resource: '+resource+' change: '+i);
            return true;
        }
        // allow energy to run out so that it triggers die condition
        if(resource == 'energy'){
            this['energy'].amount = 0;
        }
        // update and return false
        this.update();
        return false;
    },

    // checks to see if you've hit the resource cap
    hit_cap: function(resource, i){
        let left_over = this[resource].amount; // this is piss poor, recode this later....
        left_over += i;
        if(left_over > this[resource].cap){
            // hit cap
            console.log('hit '+resource+' cap');
            return true;
        }
        // didnt hit cap
        return false;
    }
};
