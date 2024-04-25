import { createRoot } from 'react-dom/client'
import App from './App';
import { Provider } from './contexts/products';

const renderedApp = (
    <Provider>
        <App />
    </Provider>
)

createRoot(document.querySelector('#root')).render(renderedApp)
