import { useMemo, useCallback } from 'react'
import CodeMirror from '@renderer/src/ui/components/codemirror'
import { css } from '@codemirror/lang-css'

function CssEditor(): React.JSX.Element {
  const extensions = useMemo(() => [css()], [])
  const onSubmit = useCallback(async (value: string) => {
    await window.uiapi.insertCss(value)
  }, [])

  return <CodeMirror extensions={extensions} onSubmit={onSubmit} title="CSS挿入" />
}

export default CssEditor
