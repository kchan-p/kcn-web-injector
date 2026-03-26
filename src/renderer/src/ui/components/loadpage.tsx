import { useState } from 'react'

function PageLoad(): React.JSX.Element {
  const [url, setUrl] = useState('')

  async function load(): Promise<void> {
    window.uiapi.loadPage(url)
  }

  return (
    <>
      <input
        id="url"
        type="text"
        placeholder="https://example.com"
        size={50}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={load}>load</button>
    </>
  )
}

export default PageLoad
