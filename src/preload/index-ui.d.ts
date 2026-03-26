import { API } from '@preload/index-ui'

declare global {
  interface Window {
    uiapi: API
  }
}
