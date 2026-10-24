const CACHE="manara-prototype-v22";
const FILES=["./","./index.html","./styles.css","./app.js","./manifest.json","./cards-bundle.js","./cards-lessons.js","./cards-study.js","./cards-major-1.json","./cards-major-2.json","./cards-major-3.json","./cards-fire.json","./cards-water.json","./cards-air.json","./cards-earth.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>caches.match("./index.html")))));




