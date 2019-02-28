const ui = {
    load(){
        this.draw_buttons();
        // setup the different content pages
        $('#goto_map').on('click', () => {
            $('#main').show();
            $('#research').hide();
            $('#leaderboard').hide();
        });
        $('#goto_research').on('click', () => {
            $('#main').hide();
            $('#research').show();
            $('#leaderboard').hide();
        });
        $('#goto_leaderboard').on('click', () => {
            $('#main').hide();
            $('#research').hide();
            $('#leaderboard').show();
        });
    },

    // draw the build buttons
    draw_buttons(){
        for(let item in build){
            if(build[item].button !== false && (resources.all_available(build[item].button) || utilities.state_get('buttons').includes(item))){
                // we have met the available resource requirements
                console.log(`Build button: ${build[item].title}`);
                // work out the cost for the tooltip
                let cost = '';
                for(let resource in build[item].cost){
                    let amount = build[item].cost[resource]
                    cost += `${resource}: ${amount} `;
                }
                let tile = `Build on: ${build[item].requires_tile}`;
                if(build[item].requires_tile === false){
                    tile = '';
                }
                // create the button code
                $('#build_buttons').append(
                    `<a href="#" id="build_${item}" class="list-group-item list-group-item-action disabled">
                    <div class="d-flex w-100 justify-content-between">
                        <h5><i class="${build[item].icon}"></i> &nbsp; ${build[item].title}</h5>
                        <small>Cost: ${cost}
                        </small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        ${build[item].desc}
                        <small>${tile}</small>
                    </div>
                    </a>`
                );
                build[item].button = false; // dont build a second button
                utilities.state_append_unique('buttons', item); // we've unlocked it, keep it unlocked if we die
                actions.attach();
            }
        };
    },

    // enable/disable build buttons based on resources
    build_button_toggle(){
        for(item in build){
            // buttons we can see based on local storage
            if(utilities.state_get('buttons').includes(item)){
                // do we have the resources available and does it not already exist
                if(resources.all_available(build[item].cost) && build[item].exists !== true){
                    $(`#build_${item}`).removeClass('disabled').addClass('list-group-item-primary');
                }else{
                    $(`#build_${item}`).addClass('disabled').removeClass('list-group-item-primary');
                }
            }
        }
    },
}