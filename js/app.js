if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('service worker register', reg)
    }).catch((err) => {
        console.log('service worker is not register', err)
    })
}

console.log('hellooo')