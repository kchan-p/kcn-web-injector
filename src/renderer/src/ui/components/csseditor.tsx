import { useMemo, useCallback, useRef } from 'react'
import CodeMirror from '@renderer/src/ui/components/codemirror'
import { css } from '@codemirror/lang-css'

function CssEditor(): React.JSX.Element {
  const extensions = useMemo(() => [css()], [])
  const cssKey = useRef<null | string>(null)
  const onSubmit = useCallback(async (value: string) => {
    cssKey.current = await window.uiapi.insertCss(value, cssKey.current)
  }, [])

  return <CodeMirror extensions={extensions} onSubmit={onSubmit} title="CSS挿入" />
}

export default CssEditor
