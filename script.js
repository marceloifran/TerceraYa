
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('exitoso',reg))
    .catch(err=>console.warn('error',err))
} 