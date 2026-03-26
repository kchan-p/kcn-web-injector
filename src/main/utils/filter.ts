import { session } from 'electron'

const loadURLFilter = (): void => {
  const filter = {
    urls: [
      '*://*.doubleclick.net/*',
      '*://*.googlesyndication.com/*',
      '*://*.googleadservices.com/*',
      '*://*.google-analytics.com/*',
      '*://pagead2.googlesyndication.com/*'
    ]
  }
  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    console.log('Blocked:', details.url)
    callback({ cancel: true })
  })
}
export { loadURLFilter }
