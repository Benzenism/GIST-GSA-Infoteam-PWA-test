const sCacheName = 'hello-pwa-v2'; // 캐시의 제목과 버전 선언
const urlsToCache = [ // 캐시할 파일 선언
  './',
  './index.html',
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

// 고유번호 할당받은 서비스 워커 동작 시작 및 오래된 캐시 삭제
self.addEventListener('activate', pEvent => {
  console.log('Service Worker Activated');
  pEvent.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== sCacheName) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 데이터 요청시 네트워크 또는 캐시에서 찾아 반환 
self.addEventListener('fetch', pEvent => {
  pEvent.respondWith(
    caches.match(pEvent.request)
    .then(response => {
      if (!response) {
        console.log("Data Request from Network", pEvent.request);
        return fetch(pEvent.request).then(networkResponse => {
          // 네트워크 응답을 캐시에 저장
          return caches.open(sCacheName).then(cache => {
            cache.put(pEvent.request, networkResponse.clone());
            return networkResponse;
          });
        });
      }
      console.log("Data Request from Cache", pEvent.request);
      return response;
    }).catch(err => console.log(err))
  );
});

// 자동 업데이트 기능
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// 클라이언트 코드
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // 새 버전이 설치됨
            if (confirm('새 버전이 사용 가능합니다. 업데이트하시겠습니까?')) {
              newWorker.postMessage('skipWaiting');
              window.location.reload();
            }
          }
        });
      });
    }).catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
