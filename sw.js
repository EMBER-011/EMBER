/* 殘火 :: Ember — 앱 설치용 서비스 워커
   게임 파일은 자주 바뀌므로 저장해 두지 않고 늘 새로 받습니다 (인터넷이 끊겼을 때만 마지막으로 받은 화면). */
const C = "ember-v1";
self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(r).then(res => {
      if (r.mode === "navigate" && res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); }
      return res;
    }).catch(() => caches.match(r))
  );
});
