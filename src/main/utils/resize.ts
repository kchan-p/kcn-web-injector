import { BaseWindow, WebContentsView } from 'electron'

const setResize = (
  win: BaseWindow,
  webView: WebContentsView,
  uiView: WebContentsView,
  panelWidth: number
): void => {
  const setBounds = (): void => {
    const { width, height } = win.getContentBounds()

    const w = Math.max(width - panelWidth - 5, 0)
    webView.setBounds({ x: 0, y: 0, width: w, height: height - 3 })
    uiView.setBounds({ x: w, y: 0, width: panelWidth, height: height - 3 })
  }

  setBounds()

  win.on('resize', () => {
    setBounds()
  })
}
export { setResize }
