if (navigator.serviceWorker) {
    let serWork = null;
    window.addEventListener('load', async () => {
        try { serWork = await navigator.serviceWorker.register('./service.worker.js', { scope: './' }) } catch { console.error };
    });
    let flag = false;
    window.addEventListener('keydown', e => {
        if (e.code === 'ControlLeft') flag = true;
        if (e.code === 'F5' && flag === true) clearCache();
    });
    const clearCache = async e => {
        await serWork.unregister()
        let data = await caches.open('ahj-v1'),
            keys = await data.keys();
        keys.map(el => data.delete(el));
    }
} else {
    document.body.style="width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;"
    document.body.innerHTML = '<div style="color:red;font-size:18px;">Ваш браузер не поддерживает кеширование!</div>';
}
// const worker = new Worker('./src/js/web.worker.js');
// worker.addEventListener('message', console.log);
// worker.addEventListener('error', console.error);
// worker.postMessage('Hello in main!');