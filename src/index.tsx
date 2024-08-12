import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { rootStore, persist } from './redux/config'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={rootStore}>
        <PersistGate persistor={persist}>
            <App />
        </PersistGate>
    </Provider>
)
