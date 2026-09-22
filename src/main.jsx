import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { Page } from "./Page"
import "./styles/tokens.css"
import "./styles/global.css"
import "./styles/app.css"

const root = document.getElementById("root")
const app = (
  <StrictMode>
    <Page pathname={window.location.pathname} />
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
