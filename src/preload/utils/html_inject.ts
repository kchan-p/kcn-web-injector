const htmlInject = (data: { selector: string; html: string; position: InsertPosition }): void => {
  const { selector, html, position } = data
  const e = document.querySelector(selector)
  if (!e) {
    throw new Error('セレクターに一致する要素がありません')
  }
  e.insertAdjacentHTML(position, html)
}

export { htmlInject }
