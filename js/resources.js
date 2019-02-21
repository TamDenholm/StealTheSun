const resources = {

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
    update(){
        // die condition
        if(this.energy.amount < 1){
            main.die();
        }

        // update resource UI
        ['energy', 'wood', 'stone', 'metal', 'silicon'].forEach((k, resource) => {
            const el = $(`#${resource}`);
            el.text(resources[resource].amount+'/'+resources[resource].cap).css('width', `${resources.pct(resource)}%`);
            if(resources.pct(resource) <= 10){
                el.css('color', '#000');
            }else{
                el.css('color', '#fff');
            }
        });
    },

    // work out a percentage for the resource
    pct(resource){
        return ((this[resource].amount / this[resource].cap) * 100);
    },

    // edit how much of any resource we have
    edit(resource, i){
        // if we're not going below 0
        if((this[resource].amount + i) >= 0){
            // if we're above the cap
            if(this.hit_cap(resource, i)){
                this.update();
                return false;
            }else{
                // make the normal edit
                this[resource].amount += i;
            }
            // update and return true
            this.update();
            console.log(`Resource: ${resource} change: ${i}`);
            return true;
        }
        // allow energy to run out so that it triggers die condition
        if(resource === 'energy'){
            this['energy'].amount = 0;
        }
        // update and return false
        this.update();
        return false;
    },

    // check to see if player has resources
    available(resource, amount){
        if(this[resource].amount >= amount){
            return true;
        }
        return false;
    },

    // check mutltiple resources for availability
    all_available(obj){
        if(typeof obj === 'object'){
            for(let k in obj){
                if(!this.available(k, obj[k])){
                    return false;
                }
            }
            return true;
        }
        return false;
    },

    // checks to see if you've hit the resource cap
    hit_cap(resource, i){
        let left_over = this[resource].amount; // this is piss poor, recode this later....
        left_over += i;
        if(left_over > this[resource].cap){
            // hit cap
            console.log(`hit ${resource} cap`);
            return true;
        }
        // didnt hit cap
        return false;
    }
};
