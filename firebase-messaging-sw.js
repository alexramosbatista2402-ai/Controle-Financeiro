// firebase-messaging-sw.js
// Este arquivo precisa ficar na RAIZ do site (mesmo nível do index.html),
// junto com o sw.js já existente. Não mude o nome do arquivo.

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Mesma configuração usada no index.html
firebase.initializeApp({
    apiKey: "AIzaSyAY5tu71WVL4fL3QdfTI_JP8LiGQe08Wc0",
    authDomain: "financas-512d1.firebaseapp.com",
    projectId: "financas-512d1",
    storageBucket: "financas-512d1.firebasestorage.app",
    messagingSenderId: "90413198549",
    appId: "1:90413198549:web:fc65253e68d6897cf0465c"
});

const messaging = firebase.messaging();

// Chamado quando a notificação chega e o app está FECHADO ou em segundo plano.
messaging.onBackgroundMessage((payload) => {
    const titulo = payload.notification?.title || 'Contas a Pagar';
    const opcoes = {
        body: payload.notification?.body || '',
        icon: 'icone.png',
        badge: 'icone.png',
        data: payload.data || {}
    };
    self.registration.showNotification(titulo, opcoes);
});

// Ao clicar na notificação, abre (ou foca) o app.
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
