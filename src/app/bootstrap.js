import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'

// eslint-disable-next-line no-unused-expressions
import('./app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        // eslint-disable-next-line no-console
        console.log('SW registered: ', registration)
      }).catch((registrationError) => {
      // eslint-disable-next-line no-console
        console.log('SW registration failed: ', registrationError)
      })
  })
}
