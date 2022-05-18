import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { IntranetProvider } from './context'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <IntranetProvider>
    <App />
  </IntranetProvider>,

  document.getElementById('root')
)
registerServiceWorker()
