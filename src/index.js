import { jsx as _jsx } from 'react/jsx-runtime'
import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App/App'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }))
}
