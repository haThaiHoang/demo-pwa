importScripts('https://www.gstatic.com/firebasejs/7.2.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.2/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '469986151760'
})
const messaging = firebase.messaging();
