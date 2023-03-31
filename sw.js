self.addEventListener("install", (e) => {
  e.waitUntill(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "https://asmmbd.github.io",
        "https://raw.githubusercontent.com/alsaifdev/alsaifdev.github.io/main/src/style.css",
        "https://raw.githubusercontent.com/alsaifdev/alsaifdev.github.io/main/src/index.js",
        "https://raw.githubusercontent.com/alsaifdev/alsaifdev.github.io/main/src/script.js",
        "https://raw.githubusercontent.com/alsaifdev/alsaifdev.github.io/main/src/other.js",
        "https://github.com/alsaifdev/alsaifdev.github.io/blob/main/images/android-icon-144x144.png?raw=true",
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
