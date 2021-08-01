if (navigator.serviceWorker) {
    window.addEventListener('load', async () => {
        try { await navigator.serviceWorker.register('./service.worker.js', { scope: './' }) } catch { console.error };
    });
    navigator.serviceWorker.addEventListener('message', e => console.log(e.data));
    window.addEventListener('keydown', e => {
        navigator.serviceWorker.controller.postMessage('Hi~');
    });
} else {
    document.body.style="width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;"
    document.body.innerHTML = '<div style="color:red;font-size:18px;">Ваш браузер не поддерживает кеширование!</div>';
}
// const worker = new Worker('./src/js/web.worker.js');
// worker.addEventListener('message', console.log);
// worker.addEventListener('error', console.error);
// worker.postMessage('Hello in main!');