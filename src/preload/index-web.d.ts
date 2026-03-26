import { API } from '@preload/index-web'

declare global {
  interface Window {
    webapi: API
  }
}
