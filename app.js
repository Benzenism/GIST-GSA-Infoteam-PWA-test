if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => console.log('Service Worker Regist Succeed', registration))
        .catch(error => console.log('Service Worker Regist Failed', error));
}

// Check for service worker updates
function checkForUpdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.update();
    });
  }
}

// Function to show update notification
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

// Check for updates when the page becomes visible
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    checkForUpdate();
  }
});

// Listen for controlling service worker changes
navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload();
});

// Check for updates periodically (e.g., every hour)
setInterval(checkForUpdate, 3600000);

// Initial update check
checkForUpdate();

// Listen for update found event
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
}