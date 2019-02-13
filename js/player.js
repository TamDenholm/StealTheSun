let player = {

    current_position: [5, 5], // start in the middle

    get_position: function(){
        return this.current_position;
    },

    move: function(direction){
        let x = this.current_position[0];
        let y = this.current_position[1];

        // make the movement
        switch(direction){
            case 'left':
                if(x > 0){
                    this.current_position = [x - 1, y];
                }
                break;
            case 'right':
                if(x < map.cols - 1){
                    this.current_position = [x + 1, y];
                }
                break;
            case 'up':
                if(y > 0){
                    this.current_position = [x, y - 1];
                }
                break;
            case 'down':
                if(y < map.rows - 1){
                    this.current_position = [x, y + 1];
                }
                break;
        }
        // deplete energy
        resources.edit('energy', -2);
    },

}
