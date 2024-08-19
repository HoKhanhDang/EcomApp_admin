import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { rootStore, persist } from './redux/config'
//live chat
import { CometChat } from '@cometchat-pro/chat'
const config = {
    appID: '2625228e90b6d2ce',
    agentUID: '1723871226111'
}
CometChat.init(config.appID)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={rootStore}>
        <PersistGate persistor={persist}>
            <App />
        </PersistGate>
    </Provider>
)
