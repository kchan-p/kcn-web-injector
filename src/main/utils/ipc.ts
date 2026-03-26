import { WebContentsView, ipcMain } from 'electron'
import { errorDialog } from '@main/utils/dialog'
import { minify as minifyJs } from 'terser'

const buildJsCode = (apiName: string, data: { [key: string]: string }): string => {
  const json = JSON.stringify(data)
  return `(data=>{window.webapi.${apiName}(data)})(JSON.parse(${JSON.stringify(json)}))`
}
const setIpc = (webView: WebContentsView): void => {
  // URL読み込み要求
  ipcMain.handle('loadPage', async (_, url: string) => {
    return webView.webContents.loadURL(url).catch((e) => {
      errorDialog(`Load Faild:${e}\n${url}`)
      return null
    })
  })

  // CSS挿入要求
  ipcMain.handle('insertCss', async (_, css: string) => {
    const code = buildJsCode('insertCss', { css })

    webView.webContents.executeJavaScript(code).catch((e) => {
      errorDialog(`CSS Insert Faild:${e}`)
      return null
    })
  })
  // JS挿入要求
  ipcMain.handle('insertJs', async (_, js: string) => {
    const _js = await minifyJs(js)
    const execJs = `(function() {${_js.code}})();`
    return webView.webContents.executeJavaScript(execJs).catch((e) => {
      errorDialog(`JS Insert Faild:${e}`)
      return null
    })
  })
  // HTML挿入要求
  ipcMain.handle('insertHtml', async (_, selector: string, html: string, position: string) => {
    const code = buildJsCode('insertHtml', { selector, html, position })

    return webView.webContents.executeJavaScript(code).catch((e) => {
      errorDialog(`HTML Insert Faild:${e}`)
      return null
    })
  })
}

export { setIpc }
