import { useState, useCallback } from 'react'

function Tabs({
  contents
}: {
  contents: { label: string; element: React.JSX.Element }[]
}): React.JSX.Element {
  const [activeTab, setActiveTab] = useState(0)
  const tabLength = contents.length
  const lebelStyle = { width: `calc(100% / ${tabLength.toString()})` }

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      const dataId = Number(e.currentTarget.dataset.id)
      if (isNaN(dataId) || dataId < 0 || dataId > tabLength) {
        return
      }
      setActiveTab(dataId)
    },
    [tabLength]
  )

  return (
    <div className="tab_area">
      <div className="tab_label_wrap">
        {contents.map((c, index) => (
          <div
            key={`tab_label_${index}`}
            data-id={index.toString()}
            className={'tab_label' + (index === activeTab ? ' activeTab' : '')}
            style={lebelStyle}
            onClick={onClick}
          >
            {c.label}
          </div>
        ))}
      </div>
      <div className="tab_content_wrap">
        {contents.map((c, index) => (
          <div
            key={`tab_content_${index}`}
            data-id={index.toString()}
            className={'tab_content' + (index === activeTab ? ' activeTab' : '')}
          >
            {c.element}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs
