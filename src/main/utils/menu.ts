import { app, Menu } from 'electron'

// macOS判定
const isMac = process.platform === 'darwin'

// 基本メニュー
const template: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'ファイル',
    submenu: [isMac ? { label: '終了', role: 'close' } : { label: '終了', role: 'quit' }]
  }
]
// macOS 向けメニュー
if (isMac) {
  template.unshift({
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })
}

// 基本メニューにaddMenuを追加してアプリにメニューセット
function getMenu(addMenu: Electron.MenuItemConstructorOptions[]): Electron.Menu {
  return Menu.buildFromTemplate(template.concat(addMenu))
}

export { getMenu }
