let player = {

    current_position: [5, 5], // start in the middle

    get_position: function(){
        return this.current_position;
    },

    move_left: function(){
        let x = this.current_position[0];
        let y = this.current_position[1];
        this.current_position = [x - 1, y];
    },

    move_right: function(){
        let x = this.current_position[0];
        let y = this.current_position[1];
        this.current_position = [x + 1, y];
    },

    move_up: function(){
        let x = this.current_position[0];
        let y = this.current_position[1];
        this.current_position = [x, y - 1];
    },

    move_down: function(){
        let x = this.current_position[0];
        let y = this.current_position[1];
        this.current_position = [x, y + 1];
    },

}