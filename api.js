const url = 'http://www.boredapi.com/api/';
const randomActivityBtn = document.getElementById('activity');
const filterBtn = document.getElementById('dropdown');

async function getActivity(endpoint){
    try{
        const response = await fetch(`${url}${endpoint}`);
        if (response.error) {
            alert(error);
        }
        else {
            console.log(response)
            let data = await response.json();
            return data;
        }
    }
    catch(error) {
        alert(error);
    }
}


async function displayRandomActivity() {
    const activity = await getActivity('activity')
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

async function displayTypeActivity() {
    let type = filterBtn.value;
    const activity = await getActivity(`activity?type=${type}`);
    const card = document.createElement('div');
    const close = document.createElement('button');
    const cardBody = document.createElement('div');
    card.classList = 'card';
    close.classList = 'btn-close';
    close.id = 'closeBtn';
    close.type = 'button';
    cardBody.classList = 'card-body';
    cardBody.innerHTML = 
        `
        <h5 class="card-title">Activity: ${activity.activity}</h5>
        <span class="badge rounded-pill text-bg-primary">Type: ${activity.type}</span>
        <p class="card-text">Price: ${activity.price}</p>
        <p class="card-text">Participants: ${activity.participants}</p>
        `;
    card.appendChild(close);
    card.appendChild(cardBody);
    document.getElementById('root').append(card);
}

filterBtn.addEventListener('change', displayTypeActivity);

randomActivityBtn.addEventListener('click', displayRandomActivity);