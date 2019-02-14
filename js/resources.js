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
        $.each(['energy', 'wood', 'stone', 'metal', 'silicon'], function(k, resource){
            let el = $('#'+resource);
            el.text(resources[resource].amount+'/'+resources[resource].cap).css('width', resources.pct(resource)+'%');
            if(resources.pct(resource) <= 10){
                el.css('color', '#000');
            }else{
                el.css('color', '#fff');
            }
        });
    },

    // work out a percentage for the resource
    pct: function(resource){
        return ((this[resource].amount / this[resource].cap) * 100);
    },

    // edit how much of any resource we have
    edit: function(resource, i){
		let success = true;
		
		// If i is negative and the result is at least zero, or
		//	i is positive and the resource is not capped, or
		//	resource is energy (which is allowed to run out)
		if((i < 0 && this[resource].amount + i >= 0) ||
			(i > 0 && this[resource].amount < this[resource].cap) ||
			(resource == 'energy')){
			// make the edit
			this[resource].amount += i;
			
			// check and edit within bounds
			if(this[resource].amount < 0){
				this[resource].amount = 0;
			}
			if(this[resource].amount > this[resource].cap){
				this[resource].amount = this[resource].cap;
			}
			
			this.update();
			console.log('Resource: '+resource+' change: '+i);
		} else {
			success = false;
		}
		
		return success;
    },

    // check to see if player has resources
    available: function(resource, amount){
        if(this[resource].amount >= amount){
            return true;
        }
        return false;
    },

    // checks to see if you've hit the resource cap
    hit_cap: function(resource, i){
		let return_val = false;
		if(this[resource].amount >= this[resource].cap){
			console.log('hit '+resource+' cap');
			return_val = true;
		}
		return return_val;
    }
};
