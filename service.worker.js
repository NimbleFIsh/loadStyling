const cacheName="ahj-v1",files=["/","/main.css","/main.js","/images/favicon.png","/images/bg.svg"];async function putFilesToCache(file){const cache=await caches.open("ahj-v1");await cache.addAll(file)}async function removeOldCache(retain){const keys=await caches.keys();return Promise.all(keys.filter(wnd=>!retain.includes(wnd)).map(request=>caches.delete(request)))}function fromNetwork(request){return new Promise((fulfill,reject)=>fetch(request).then(response=>fulfill(response),err=>reject(err)))}function fromCache(request){return caches.open("ahj-v1").then(cache=>cache.match(request).then(matching=>matching||Promise.reject("no-match")))}self.addEventListener("install",e=>{e.waitUntil((async()=>{await putFilesToCache(files),await self.skipWaiting()})())}),self.addEventListener("activate",e=>{e.waitUntil((async()=>{await removeOldCache(["ahj-v1"]),await self.clients.claim()})())}),self.addEventListener("fetch",e=>e.respondWith(fromCache(e.request).catch(()=>fromNetwork(e.request))));