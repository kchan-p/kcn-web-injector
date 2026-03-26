import { Menu, WebContentsView } from 'electron'

const onWebMenu = (view: WebContentsView): void => {
  view.webContents.on('context-menu', (_, params) => {
    const menu = Menu.buildFromTemplate([
      { label: 'コピー', role: 'copy' },
      { type: 'separator' },
      { label: '検証', click: () => view.webContents.inspectElement(params.x, params.y) }
    ])
    menu.popup()
  })
}

export { onWebMenu }
