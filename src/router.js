import React from 'react';

import {Route, Switch} from 'react-router-dom';
import Home from './Components/Landing/Landing';
import Cart from './Components/Cart/Cart.js';
// import Login from './Components/Login/Login';
import Account from './Components/Account/Account';
import Transactions from './Components/Account/Transactions/Transactions';

export default(
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/cart' component={Cart}/>
        {/* <Route path='/login' component={Login}/> */}
        <Route path='/my-account' component={Account}/>
        <Route path='/certificates/:category' component={Transactions}/>
    </Switch>
)