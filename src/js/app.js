if (navigator.serviceWorker) {
  let serWork = null;
  let flag = false;

  const clearCache = async () => {
    await serWork.unregister();
    const data = await caches.open('ahj-v1');
    const keys = await data.keys();
    keys.map((el) => data.delete(el));
  };

  const errInit = function () { document.getElementById('load_err').style.display = 'flex'; };

  const createNews = (data) => {
    document.getElementsByTagName('li').forEach((el, i) => {
      const title = el.querySelector('div.new_title');
      const img = el.querySelector('img');
      const text = el.querySelectorAll('div.new_text');
      const text1 = text[0];
      const text2 = text[1];

      title.classList.remove('bg');
      img.classList.remove('bg');
      text1.classList.remove('bg');
      text2.classList.remove('bg');

      title.innerText = data[i].title;
      img.src = `/news/${data[i].image}`;
      img.style.display = 'block';

      if (data[i].description.length <= 54) text1.innerText = data[i].description;
      else {
        text1.innerText = data[i].description.substr(0, 54);
        text2.innerText = data[i].description.substr(54);
      }
    });
  };

  window.addEventListener('keydown', (e) => {
    if (e.code === 'ControlLeft') flag = true;
    if (e.code === 'F5' && flag === true) clearCache();
  });

  window.addEventListener('load', async () => {
    try {
      serWork = await navigator.serviceWorker.register('./service.worker.js', { scope: './' });
      const id = setTimeout(() => {
        clearTimeout(id);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/news/news.json', true);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => (xhr.status === 200) && createNews(xhr.response));
        xhr.addEventListener('error', errInit);
        xhr.send();
      }, 5000);
    } catch (e) { console.error(e); }
  });
} else document.body.innerHTML = '<div style="color:red;font-size:18px;">Ваш браузер не поддерживает кеширование!</div>';
