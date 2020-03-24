import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Products from './Products';
import SignUp from './SignUp';
import Login from './Login';

import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducers from '../store/reducers/authReducers';
import productReducers from '../store/reducers/productReducers';
import cartReducers from '../store/reducers/cartReducers';


const rootReducers = combineReducers({
    auth: authReducers,
    products: productReducers,
    cart: cartReducers
});

const store = createStore(rootReducers, applyMiddleware(thunk));

window.store = store;

function App() {
    return (

        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={Products}/>
                        <Route path="/signup" component={SignUp} />
                    </Switch>
                </div>
            </Router>
        </Provider>

    );
}

export default App;
