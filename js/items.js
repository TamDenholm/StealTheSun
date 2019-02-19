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
                    // not resource tile, no tile requirement
                    if(map.get_resource(pl_pos[0], pl_pos[1]) === false && build[item].requires_tile === false){
                        console.log(`${item} is available to build`);
                        // build on tile
                        build[item].exists = true;
                        build[item].position = pl_pos;
                        //map.draw_tile('campfire', pl_pos[0], pl_pos[1]);
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