import { useRef, useCallback } from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import { Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'

type Props = {
  extensions?: Extension[]
  onSubmit?: null | ((value: string, title: string) => void)
  title?: string | string[]
}

function CodeMirror({
  extensions = [],
  onSubmit = null,
  title = '送信'
}: Props): React.JSX.Element {
  const viewRef = useRef<EditorView | null>(null)

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      const title = e.currentTarget.dataset.title ?? ''
      const value = viewRef.current?.state.doc.toString() ?? ''
      onSubmit?.(value, title)
    },
    [onSubmit]
  )

  const titles = Array.isArray(title) ? title : [title]

  return (
    <>
      <div className="codemirror-button-wrap">
        {titles.map((t, i) => (
          <button
            data-title={t}
            key={`button_${i}`}
            className="codemirror-button"
            onClick={onClick}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="codemirror-editor">
        <ReactCodeMirror
          value=""
          extensions={[basicSetup, ...extensions]}
          onCreateEditor={(view) => {
            viewRef.current = view
          }}
        />
      </div>
    </>
  )
}

export default CodeMirror
