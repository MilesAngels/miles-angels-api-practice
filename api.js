const url = 'http://www.boredapi.com/api/';
const randomActivityBtn = document.getElementById('activity');
const filterBtn = document.getElementById('dropdown');
const accessibilityBtn = document.getElementById('accessible');
const priceBtn = document.getElementById('price');
const worker = new Worker('./worker.js');

async function getActivity(endpoint) {
    try {
        const response = await fetch(`${url}${endpoint}`)
        .then(
            document.getElementById('root').textContent = "Start Promise..."
        );

        if (response.error) {
            alert(error);
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    catch (error) {
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

async function accessibility() {
    const activity = await Promise.all([
        getActivity('activity?accessibility=1'),
        getActivity('activity?accessibility=0'),
        getActivity('activity?accessibility=0')
    ]);

    activity.forEach(activity => {
        const card = document.createElement('div');
        card.classList = 'card';
        card.innerHTML =
            `<div class="card-body">
            <h5 class="card-title">Activity: ${activity.activity}</h5>
            <span class="badge rounded-pill text-bg-primary">Type: ${activity.type}</span>
            <p class="card-text">Accessibility: ${activity.accessibility}</p>
            <p class="card-text">Price: ${activity.price}</p>
            <p class="card-text">Participants: ${activity.participants}</p>
        </div>`;
        document.getElementById('root').append(card);
    })

}

async function price() {
    const activity = await Promise.any([
        getActivity('activity?minprice=0.06&maxprice=0.1'),
        getActivity('activity?minprice=0&maxprice=0.05'),
    ])
    const card = document.createElement('div');
    card.classList = 'card';
        card.innerHTML =
            `<div class="card-body">
            <h5 class="card-title">Activity: ${activity.activity}</h5>
            <span class="badge rounded-pill text-bg-primary">Type: ${activity.type}</span>
            <p class="card-text">Accessibility: ${activity.accessibility}</p>
            <p class="card-text">Price: ${activity.price}</p>
            <p class="card-text">Participants: ${activity.participants}</p>
        </div>`;
    document.getElementById('root').append(card);
   
}

// Worker
const timeDateBtn = document.getElementById('time-date');
timeDateBtn.addEventListener('click', () => {
    worker.postMessage({
        command: 'generate'
    });
});

worker.addEventListener('message', message => {
    document.getElementById('root').textContent = `Today's date and current time is: ${message.data}`;
});

priceBtn.addEventListener('click', price);
accessibilityBtn.addEventListener('click', accessibility);
filterBtn.addEventListener('change', displayTypeActivity);
randomActivityBtn.addEventListener('click', displayRandomActivity);