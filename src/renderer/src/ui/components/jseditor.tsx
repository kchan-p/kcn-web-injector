import { useMemo, useCallback, useRef } from 'react'
import CodeMirror from '@renderer/src/ui/components/codemirror'
import { javascript } from '@codemirror/lang-javascript'

function JsEditor(): React.JSX.Element {
  const extensions = useMemo(() => [javascript()], [])
  const cssKey = useRef(null)
  const onSubmit = useCallback(async (value: string) => {
    cssKey.current = await window.uiapi.insertJs(value)
  }, [])

  return <CodeMirror extensions={extensions} onSubmit={onSubmit} title="JS挿入" />
}

export default JsEditor
