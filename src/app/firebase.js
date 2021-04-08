import firebase from 'firebase/app'
// eslint-disable-next-line
import '@firebase/messaging'

import Storage from '@/utils/storage'

let messaging = null

if (!firebase.apps.length) {
  console.log('initialing firebase...')
  firebase.initializeApp({
    apiKey: 'AIzaSyCu290sCD5ZFLPWeMvqMY8w_lOpLYSU8b8',
    authDomain: 'fir-pwa-cd62b.firebaseapp.com',
    projectId: 'fir-pwa-cd62b',
    storageBucket: 'fir-pwa-cd62b.appspot.com',
    messagingSenderId: '469986151760',
    appId: '1:469986151760:web:b473a11c0507d4ca3a7055'
  })

  if (firebase.messaging.isSupported()) {
    console.log('config messaging...')
    messaging = firebase.messaging()
    messaging
      .usePublicVapidKey('BI6Fsye8MFsWao9fRTI88mJaG4i9RjOtgrmNG6JGn95_fcp8aqa8psNtpIfRzcnWJ6T51B7dyoqoYMp_vyilVjA')
  }
}

function subscribeTokenToTopic(token) {
  fetch('http://192.168.77.36:3000/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      token
    })
  }).then((response) => {
    if (response.status < 200 || response.status >= 400) {
      throw `Error subscribing to topic: ${response.status} - ${response.text()}`
    }
    console.log(`Subscribed to topic send all`)
  }).catch((error) => {
    console.error(error)
  })
}

const createNotificationListeners = async () => {
  try {
    await messaging.requestPermission()

    let fcmToken = Storage.get('FCM_TOKEN')

    const newFcmToken = await messaging.getToken()
    if (fcmToken !== newFcmToken) {
      Storage.set('FCM_TOKEN', newFcmToken)
    }
    subscribeTokenToTopic(newFcmToken)

    console.log('ready onmessage')
    messaging.onMessage(() => {
      console.log('receive a message')
    })

    messaging.onTokenRefresh(async () => {
      fcmToken = await messaging.getToken()
      if (fcmToken) {
        Storage.set('FCM_TOKEN', fcmToken)
      }
    })
  } catch (e) {
    // eslint-disable-next-line
    console.log(e)
  }
}

const initFirebase = () => {
  if (messaging) {
    createNotificationListeners()
  }
}

initFirebase()
