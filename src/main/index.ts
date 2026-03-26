import { app, BaseWindow, WebContentsView } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { setMenu } from '@main/utils/setmenu'
import { setIpc } from '@main/utils/ipc'
import { loadURLFilter } from '@main/utils/filter'
import { errorDialog } from '@main/utils/dialog'
import { onWebMenu } from '@main/utils/menu-web'
import { setResize } from '@main/utils/resize'

import icon from '@resources/icon.png?asset'

const windowWidth = 1800 // 全体の初期幅
const windowHeight = 1000 // 初期高さ
const panelWidth = 400 // UI部の幅（固定）

const INDEX_UI = 'index-ui.html'
const INDEX_WEB = 'index-web.html'

const PRELOAD_UI = 'index-ui.js'
const PRELOAD_WEB = 'index-web.js'

function createWindow(): { uiView: WebContentsView; webView: WebContentsView } {
  // view作成＆表示位置設定
  const win = new BaseWindow({
    width: windowWidth,
    height: windowHeight,
    ...(process.platform === 'linux' ? { icon } : {})
  })
  // Webページ表示用View
  const webView = new WebContentsView({
    webPreferences: {
      preload: join(__dirname, `../preload/${PRELOAD_WEB}`),
      nodeIntegration: false,
      sandbox: true,
      contextIsolation: true,
      webviewTag: false
    }
  })
  // window.openとtarget="_blank"での読み込み無効化
  webView.webContents.setWindowOpenHandler(() => {
    errorDialog('ページ遷移をキャンセルしました')
    return { action: 'deny' }
  })

  win.contentView.addChildView(webView)
  onWebMenu(webView)

  //UI表示用View
  const uiView = new WebContentsView({
    webPreferences: {
      preload: join(__dirname, `../preload/${PRELOAD_UI}`),
      nodeIntegration: false,
      sandbox: false,
      contextIsolation: true
    }
  })
  win.contentView.addChildView(uiView)

  // ビュー表示位置設定
  setResize(win, webView, uiView, panelWidth)

  win.on('closed', () => {
    webView.webContents.close()
    uiView.webContents.close()
  })

  // メニュー設定
  setMenu(webView, uiView)
  // ipc設定
  setIpc(webView)
  // 外部URL読み込みフィルター設定
  loadURLFilter()

  // ビューコンテンツロード
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const path = process.env['ELECTRON_RENDERER_URL'] + '/'
    uiView.webContents.loadURL(path + INDEX_UI)
    webView.webContents.loadURL(path + INDEX_WEB)
  } else {
    const path = join(__dirname, '../renderer')
    uiView.webContents.loadFile(join(path, INDEX_UI))
    webView.webContents.loadFile(join(path, INDEX_WEB))
  }
  return { uiView, webView }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.affi-sapo-sv.note')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BaseWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
