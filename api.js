const url = 'http://www.boredapi.com/api/activity/';
const activityBtn = document.getElementById('activity');
async function getActivity(){
    try{
        const response = await fetch(url);
        const activity = await response.json();
        displayActivity(activity);
    }
    catch(error) {
        alert(error);
    }
}

function displayActivity(activity) {
    console.log(activity);
    const card = document.createElement('div');
    card.classList = 'card';
    card.innerHTML = 
        `<div class="card-body">
            <h5 class="card-title">Activity: ${activity.activity}</h5>
            <span class="badge rounded-pill text-bg-primary">Type: ${activity.type}</span>
            <p class="card-text">Price: ${activity.price}</p>
            <p class="card-text">Participants: ${activity.participants}</p>
        </div>`;

    document.getElementById('root').append(card);
}
activityBtn.addEventListener('click', getActivity);