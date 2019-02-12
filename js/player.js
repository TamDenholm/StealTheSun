let player = {

    current_position: [5, 5], // start in the middle

    get_position: function(){
        return this.current_position;
    },

    move_left: function(){
        let x = this.current_position[0];
        let y = this.current_position[1];
        // dont fall off the edge
        if(x <= 1){
            return false;
        }
        this.current_position = [x - 1, y];
    },

    move_right: function(){
        let x = this.current_position[0];
        let y = this.current_position[1];
        // dont fall off the edge
        if(x >= map.cols){
            return false;
        }
        this.current_position = [x + 1, y];
    },

    move_up: function(){
        let x = this.current_position[0];
        let y = this.current_position[1];
        // dont fall off the edge
        if(y <= 1){
            return false;
        }
        this.current_position = [x, y - 1];
    },

    move_down: function(){
        let x = this.current_position[0];
        let y = this.current_position[1];
         // dont fall off the edge
         if(y >= map.rows){
            return false;
        }
        this.current_position = [x, y + 1];
    },

}