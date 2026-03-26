const cssInject = (data: { css: string }): void => {
  const name = '___injected_style_1___'
  const css = data.css
  let styleTag = document.getElementById(name)
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = name
    document.body.appendChild(styleTag)
  }
  styleTag.textContent = css
}

export { cssInject }
