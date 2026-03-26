import { dialog } from 'electron'

const errorDialog = (m: string): void => {
  console.log(m)
  dialog.showErrorBox('Error', m)
}

export { errorDialog }
