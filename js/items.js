const items = {

    build(item){
        // check if item exists in the build object
        if(build.hasOwnProperty(item) && build[item].exists !== true){
            console.log(`${item} defined and doesnt already exist`);
            // can we afford this item?
            $.each(build[item].cost, (resource, amount) => {
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
                        $.each(build[item].caps, (resource, cap) => {
                            resources[resource].cap = cap;
                        });
                        map.draw_map();
                    }
                }
            });
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