import firebase from 'firebase/app'
// eslint-disable-next-line
import '@firebase/messaging'

import Storage from '@/utils/storage'

let messaging = null

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCu290sCD5ZFLPWeMvqMY8w_lOpLYSU8b8',
    authDomain: 'fir-pwa-cd62b.firebaseapp.com',
    projectId: 'fir-pwa-cd62b',
    storageBucket: 'fir-pwa-cd62b.appspot.com',
    messagingSenderId: '469986151760',
    appId: '1:469986151760:web:b473a11c0507d4ca3a7055'
  })

  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging()
    messaging
      .usePublicVapidKey('BI6Fsye8MFsWao9fRTI88mJaG4i9RjOtgrmNG6JGn95_fcp8aqa8psNtpIfRzcnWJ6T51B7dyoqoYMp_vyilVjA')
  }
}

const createNotificationListeners = async () => {
  try {
    await messaging.requestPermission()

    let fcmToken = Storage.get('FCM_TOKEN')

    const newFcmToken = await messaging.getToken()
    if (fcmToken !== newFcmToken) {
      Storage.set('FCM_TOKEN', newFcmToken)
    }

    messaging.onMessage(() => {
      alert('NEW message')
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
