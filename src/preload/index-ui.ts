import { contextBridge, ipcRenderer } from 'electron'

const api = {
  loadPage: (url: string): Promise<null | undefined> => ipcRenderer.invoke('loadPage', url),
  insertCss: (css: string, key: null | string): Promise<null | string> =>
    ipcRenderer.invoke('insertCss', css, key),
  insertJs: (js: string): Promise<null> => ipcRenderer.invoke('insertJs', js),
  insertHtml: (selector: string, html: string, position: string) =>
    ipcRenderer.invoke('insertHtml', selector, html, position)
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('uiapi', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.uiapi = api
}

export type API = typeof api
