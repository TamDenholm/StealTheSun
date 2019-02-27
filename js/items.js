const items = {

    active_items: [],

    build(item){
        // make sure we're not already standing on a building
        if(player.on_building()){
            return false;
        }
        // check if item exists in the build object
        if(build.hasOwnProperty(item) && build[item].exists !== true){
            console.log(`${item} defined and doesnt already exist`);
            // can we afford this item?
            for(let resource in build[item].cost){
                let amount = build[item].cost[resource]
                if(resources.available(resource, amount)){
                    console.log(`${item} is affordable`);
                    // can we build on this tile?
                    const pl_pos = player.get_position();
                    const res_tile = map.get_resource(pl_pos[0], pl_pos[1]);
                    console.log(`Currently standing on resource: ${res_tile}`);
                    // meet player position tile requirements
                    if(map.get_resource(pl_pos[0], pl_pos[1]) === res_tile && build[item].requires_tile === res_tile){
                        console.log(`${item} is available to build`);
                        // build on tile
                        build[item].exists = true;
                        build[item].position = pl_pos;
                        resources.edit(resource, amount * -1);
                        for(let resource in build[item].caps){
                            let cap = build[item].caps[resource]
                            resources[resource].cap = cap;
                        };
                        map.draw_map();
                    }
                }
            };
        }
    },

    // searches the build object and builds an array of active items
    get_active(){
        for(const item in build){
            if(build[item].exists === true && !this.active_items.includes(item)){
                this.active_items.push(item);
            }
        }
        return this.active_items;
    }

};