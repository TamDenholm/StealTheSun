var items = {

    build: function(item){
        if(build.hasOwnProperty(item) && build[item].exists != true){
            $.each(build[item].cost, function(resource, amount){
                if(resources.edit(resource, (0-amount))){
                    build[item].exists = true;
                }
            });
        }
        this.update();
    },

    update: function(){
        $('#stuff').html('');
        $.each(items.get_active(), function(k, item){
            $('#stuff').append('\
            <div class="col-4 item card" id="'+item+'">\
                <div class="card-body">\
                    <img src="images/'+build[item].img+'">\
                    <h5 class="card-title">'+build[item].title+'</h5>\
                </div>\
            </div>\
            ');
        });
    },

    get_active: function(){
        var active_items = [];
        for(var property in build){
            if(build[property].exists == true){
                active_items.push(property);
            }
        }
        return active_items;
    }

};