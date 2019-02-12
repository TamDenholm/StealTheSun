let utilities = {

    // generate random numbers between 2 integers
    random: function(min, max){
        if(min > max){
            return 0
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}