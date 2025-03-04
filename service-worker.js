const sCacheName = 'hello-pwa'; // 캐시제목 선언
const urlsToCache = [ // 캐시할 파일 선언
  './',
  './index.html',
  './manifest.json',
  './app.js',
  './style.css',
  './images'
];

// 서비스워커 설치 및 캐시 저장
self.addEventListener('install', pEvent => {
  console.log('Service Worker Installed');
  pEvent.waitUntil(
    caches.open(sCacheName)
    .then(pCache => {
      console.log('Files Saved into Cache');
      return pCache.addAll(urlsToCache);
    })
  );
});

// 고유번호 할당받은 서비스 워커 동작 시작
self.addEventListener('activate', pEvent => {
  console.log('Service Worker Activated');
});

// 데이터 요청시 네트워크 또는 캐시에서 찾아 반환 
self.addEventListener('fetch', pEvent => {
  pEvent.respondWith(
    caches.match(pEvent.request)
    .then(response => {
      if (!response) {
        console.log("Data Request from Network", pEvent.request)
        return fetch(pEvent.request);
      }
      console.log("Data Request from Cache", pEvent.request)
      return response;
    }).catch(err => console.log(err))
  );
});