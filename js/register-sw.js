// REGISTER SERVICE WORKER
import runtime from "serviceworker-webpack-plugin/lib/runtime";

if ("serviceWorker" in navigator) {
  registerServiceWorker();
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
