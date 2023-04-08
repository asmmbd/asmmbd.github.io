self.addEventListener("install", (e) => {
  e.waitUntill(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "https://asmmbd.github.io",
        "/",
        "/src/js/index.js",
        "/src/css/index.css",
        "index.html",
        "admission.html",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  //   console.log(`refdsf ${e.request.url}`);
  caches.match(e.request).then((response) => {
    return response || fetch(e.request);
  });
});
