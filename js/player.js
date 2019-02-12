let player = {

    current_position: [5, 5], // start in the middle

    get_position: function(){
        return this.current_position;
    },

    move: function(direction){
        let x = this.current_position[0];
        let y = this.current_position[1];

        // dont fall off the edge
        if(x <= 1 || x >= map.cols || y <= 1 || y >= map.rows){
            return false;
        }

        // make the movement
        switch(direction){
            case 'left':
                this.current_position = [x - 1, y];
                break;
            case 'right':
                this.current_position = [x + 1, y];
                break;
            case 'up':
                this.current_position = [x, y - 1];
                break;
            case 'down':
                this.current_position = [x, y + 1];
                break;
        }
    },

}