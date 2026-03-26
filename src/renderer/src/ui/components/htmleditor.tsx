import { useMemo, useCallback, useState } from 'react'
import CodeMirror from '@renderer/src/ui/components/codemirror'
import { html } from '@codemirror/lang-html'

const buttonDatas = [
  // name: Element:insertAdjacentHTML()のposition値
  { name: 'beforebegin', title: '挿入先セレクタの前に挿入' },
  { name: 'afterend', title: '挿入先セレクタの後ろに挿入' },
  { name: 'afterbegin', title: '挿入先セレクタの中（最初）に挿入' },
  { name: 'beforeend', title: '挿入先セレクタの中（最後）に挿入' }
]
const buttonTitles = buttonDatas.map((b) => b.title)

function HtmlEditor(): React.JSX.Element {
  const [inputSelector, setInputSelector] = useState('')

  const extensions = useMemo(() => [html()], [])

  const onSubmit = useCallback(
    async (value: string, title: string) => {
      const buttonData = buttonDatas.find((b) => b.title === title)
      if (!buttonData) {
        return
      }
      await window.uiapi.insertHtml(inputSelector, value, buttonData.name)
    },
    [inputSelector]
  )

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputSelector(e.target.value)
  }, [])

  return (
    <>
      <div className="insert_html_option">
        <p>挿入先セレクタ</p>
        <input type="text" size={50} value={inputSelector} onChange={onInputChange} />
      </div>
      <CodeMirror extensions={extensions} onSubmit={onSubmit} title={buttonTitles} />
    </>
  )
}

export default HtmlEditor
