const utilities = {

    // generate random numbers between 2 integers
    random(min, max){
        if(min > max){
            return 0
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // append to the localstorage
    state_append(item, data){
        const current = this.state_get(item);
        if(Array.isArray(current)){
            current.push(data);
            this.state_set(item, JSON.stringify(current));
        }else{
            this.state_set(item, JSON.stringify([data]));
        }
    },

    // same as above but keep array unique
    state_append_unique(item, data){
        const current = this.state_get(item);
        const set = new Set(current); // Set is unique
        set.add(data);
        this.state_set(item, Array.from(set));
    },

    // get an item from the localstorage, just shorthand
    state_get(item){
        return JSON.parse(window.localStorage.getItem(item));
    },

    // set item to localstorage, again, shorthand
    state_set(item, data){
        return window.localStorage.setItem(item, JSON.stringify(data));
    }
}