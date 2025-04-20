import { StrictMode } from 'react';
import { Container, createRoot } from 'react-dom/client';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './redux/store';

createRoot(document.getElementById('root') as Container).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
)
