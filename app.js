if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => console.log('Service Worker Regist Succeed', registration))
        .catch(error => console.log('Service Worker Regist Failed', error));
}