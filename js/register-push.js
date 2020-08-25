// REGISTER SERVICE WORKER
import runtime from "serviceworker-webpack-plugin/lib/runtime";

if ("serviceWorker" in navigator) {
  registerServiceWorker();
  requestPermission();
} else {
  console.log("ServiceWorker belum didukung browser");
}

function registerServiceWorker() {
  const registration = runtime.register();
  registration
    .then(function() {
      console.log("Pendaftaran ServiceWorker sukses");
    })
    .catch(function() {
      console.log("Pendaftaran ServiceWorker gagal");
    });
}

function requestPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function(result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diizinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kontak dialog permintaan izin.");
        return;
      }
      // Berlangganan pesan push
      if (("PushManager" in window)) {
        navigator.serviceWorker.getRegistration().then(function(registration) {
          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BEUqZO3lnxxErblxASSeUOh2J-xMjseIoQwLFq5B5rV6JwjEFqyU2vWlriiwveGpL7xNPvvjzxJneYfy962wORE")
          }).then(function(subscribe) {
            console.log("Berhasil melakukan subscribe dengan endpoint: ", subscribe.endpoint);
            console.log("Berhasil melakukan subscribe dengan p256dh key: ", btoa(String.fromCharCode.apply(
              null, new Uint8Array(subscribe.getKey("p256dh")))));
            console.log("Berhasil melakukan subscribe dengan auth key: ", btoa(String.fromCharCode.apply(
              null, new Uint8Array(subscribe.getKey("auth")))));
          }).catch(function(e) {
            console.error("Tidak dapat melakukan subscribe ", e.message);
          });
        });
      }
    });
  }
}

// Mengubah string menjadi Uint8Array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
