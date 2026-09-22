import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { Page } from "./Page"

export function render(pathname) {
  return renderToString(<StrictMode><Page pathname={pathname} /></StrictMode>)
}
