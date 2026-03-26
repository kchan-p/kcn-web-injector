import { WebContentsView, Menu } from 'electron'
import { getMenu } from '@main/utils/menu'

const setMenu = (webView: WebContentsView, uiView: WebContentsView): void => {
  const AddMenu = [
    {
      label: '表示',
      submenu: [
        {
          label: 'DevTool',
          click: () => {
            webView.webContents.openDevTools()
          }
        },
        {
          label: 'DevTool(UI)',
          click: () => {
            uiView.webContents.openDevTools()
          }
        }
      ]
    }
  ]
  Menu.setApplicationMenu(getMenu(AddMenu))
}

export { setMenu }
