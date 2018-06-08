import React, {Component} from 'react';
import {BrowserRouter, Route, Switch,Link, NavLink} from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import DashboardPage from '../components/DashboardPage';
import SingleBookPage from '../components/SingleBookPage';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import SearchForm from '../components/SearchForm';
import Navbar from '../components/Navbar';
import {connect} from 'react-redux';
import {setAuthToken, setCurrentUser} from '../actions/authActions';
import jwt_decode from 'jwt-decode';
import store from '../store';

class AppRouter extends Component {

    componentDidMount() {
        if(localStorage.jwtToken) {
            const token = localStorage.jwtToken;
            console.log('token is', token);
            //if there's a token, set it as the default
            setAuthToken(token);
            //get user data
            const decodedUser = jwt_decode(token);
            console.log('decodedUser is', decodedUser);
            //set the current user by dispatching
            store.dispatch(setCurrentUser(decodedUser));
            //put time expiration code here
        }
    }

  render() {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/dashboard" component={DashboardPage}/>
                    <Route exact path="/book" component={SingleBookPage}/>
                    <Route exact path="/login" component={LoginForm}/>
                    <Route exact path="/register" component={RegisterForm}/>
                    <Route exact path="/search" component={SearchForm}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
  }
}

// const AppRouter = ()=> (
//     <BrowserRouter>
//         <div>
//             <Navbar />
//             <Switch>
//                 <Route exact path="/" component={LandingPage}/>
//                 <Route exact path="/dashboard" component={DashboardPage}/>
//                 <Route exact path="/book" component={SingleBookPage}/>
//                 <Route exact path="/login" component={LoginForm}/>
//                 <Route exact path="/register" component={RegisterForm}/>
//                 <Route exact path="/search" component={SearchForm}/>
//             </Switch>
//         </div>
//     </BrowserRouter>
// )

export default connect()(AppRouter);