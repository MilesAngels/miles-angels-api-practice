this.onmessage = function(e) {
    if(e.data.convertTime !== undefined) {
        this.postMessage({result: 
            `${e.data.convertTime.num} hrs is ${e.data.convertTime.num*60} mins`
        });
    }
}
