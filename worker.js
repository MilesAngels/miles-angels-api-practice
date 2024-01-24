addEventListener('message', message => {
    if(message.data.command === 'generate') {
        today();
    }
});

function today() {
    const today = new Date()
    postMessage(today.toLocaleString()); 
}
