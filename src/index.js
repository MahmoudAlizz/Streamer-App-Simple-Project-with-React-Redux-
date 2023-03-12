import React from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import reducers from './reducers';
import App from './components/App';

const root = createRoot(document.querySelector('#root'));
const store=createStore(reducers,applyMiddleware(thunk));

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)