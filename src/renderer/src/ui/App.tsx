import PageLoad from '@renderer/src/ui/components/loadpage'
import Tabs from '@renderer/src/ui/components/tabs'
import CssEditor from '@renderer/src/ui/components/csseditor'
import JsEditor from '@renderer/src/ui/components/jseditor'
import HtmlEditor from '@renderer/src/ui/components/htmleditor'

function App(): React.JSX.Element {
  const tabContents: { label: string; element: React.JSX.Element }[] = [
    { label: 'CSS', element: <CssEditor /> },
    { label: 'JS', element: <JsEditor /> },
    { label: 'HTML', element: <HtmlEditor /> }
  ]

  return (
    <main>
      <div className="load-wrap">
        <PageLoad />
      </div>
      <Tabs contents={tabContents} />
    </main>
  )
}

export default App
