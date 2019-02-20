const items = {

    build(item){
        const i = build[item];

        // checks if it doesnt already exist
        if(i && i.exists !== true){

            console.log(`${item} defined and doesnt already exist`);
            const pl_pos = player.get_position();
            const res_tile = map.get_resource(pl_pos[0], pl_pos[1]);

            // checks if the player is on the right tile
            if(i.requires_tile === res_tile){

                console.log(`Currently standing on resource: ${res_tile}`);
                // checks if the player has all the needed resources
                const { cost } = i;
                const hasResources = Object.keys(cost).every((resource) => {
                    const amount = cost[resource];
                    console.log(resource, amount);
                    return resources.available(resource, amount);
                });
                if (hasResources) {
                    console.log(`${item} is affordable`);
                    i.exists = true;
                    i.position = pl_pos;
                    Object.keys(i.cost).forEach((resource) => {
                        const amount = i.cost[resource]
                        resources.edit(resource, amount * -1);
                    })
                    Object.keys(i.caps || {}).forEach((resource) => {
                        const newCap = i.caps.resource;
                        resources.resource.cap = newCap
                    });
                    map.draw_map();
                }
            }
        }
    },

    get_active(){
        const active_items = [];
        for(const property in build){
            if(build[property].exists === true){
                active_items.push(property);
            }
        }
        return active_items;
    }

};