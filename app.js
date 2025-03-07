if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => console.log('Service Worker Regist Succeed', registration))
        .catch(error => console.log('Service Worker Regist Failed', error));
}

function checkForUpdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.update();
    });
  }
}

function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.textContent = 'A new version is available. Click here to update.';
  notification.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; background: #4CAF50; color: white; text-align: center; padding: 16px; cursor: pointer;';
  notification.onclick = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage('skipWaiting');
    }
  };
  document.body.appendChild(notification);
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    checkForUpdate();
  }
});

navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload();
});

setInterval(checkForUpdate, 3600000);

checkForUpdate();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateNotification();
        }
      });
    });
  });
}if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            if (confirm('New version available! Refresh to update?')) {
              registration.waiting.postMessage('SKIP_WAITING');
              window.location.reload();
            }
          }
        });
      });
    });
  });

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
}