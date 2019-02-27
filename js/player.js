const player = {

    current_position: [5, 5], // start in the middle

    get_position(){
        return this.current_position;
    },

    move(direction){
        let x = this.current_position[0];
        let y = this.current_position[1];

        // make the movement
        switch(direction){
            case 'left':
                if(x > 1){
                    this.current_position = [x - 1, y];
                    resources.edit('energy', -2);
                }
                break;
            case 'right':
                if(x < map.cols){
                    this.current_position = [x + 1, y];
                    resources.edit('energy', -2);
                }
                break;
            case 'up':
                if(y > 1){
                    this.current_position = [x, y - 1];
                    resources.edit('energy', -2);
                }
                break;
            case 'down':
                if(y < map.rows){
                    this.current_position = [x, y + 1];
                    resources.edit('energy', -2);
                }
                break;
        }
    },

    // is the player standing on a building
    on_building(){
        const pl_pos = this.get_position();
        for(item in build){
            if(JSON.stringify(build[item].position) === JSON.stringify(pl_pos)){
                return true;
            }
        }
        return false;
    }

}
