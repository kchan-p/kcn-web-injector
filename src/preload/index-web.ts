import { contextBridge } from 'electron'
import { cssInject } from '@preload/utils/css_inject'
import { htmlInject } from '@preload/utils/html_inject'

const api = {
  insertCss: cssInject,
  insertHtml: htmlInject
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('webapi', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.webapi = api
}

export type API = typeof api
