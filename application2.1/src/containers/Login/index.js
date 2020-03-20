import React, {Component} from 'react';
import {connect} from 'react-redux';

import MobileTypeInput from '../../components/UI/MobileTypeInput';
import SubmitGradientButton from '../../components/UI/SubmitGradientButton';

import * as authActions from '../../store/actions/authActions';

class Login extends Component {
    state = {
        redirectToreferrer: false,
        username: '',
        password: ''
    }

    textHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginHandler = (e) => {
        e.preventDefault();

        this.props.authenticate(this.state.username, this.state.password).then(response => {
            console.log(response);
            if(response.hasOwnProperty('token')){
                window.localStorage.setItem('auth', JSON.stringify(response))
                this.setState({
                   redirectToReferrer: true
                });
            }
        })
    }

    componentDidMount(){
       if(!this.props.auth.isAuthenticated){
           this.props.getTokens()
               .then(result => {
                   // result will be either true or false
                   if(result){
                       this.setState({
                           redirectToReferrer: true
                       });
                   }

               })
               .catch(er => {
                   console.log(er);
               });
       }
    }

    render() {

        const {loginForm} = this.state;

        return (
            <div className="LoginContainer">
                <div className="WelcomeText">
                    <h3>Login</h3>
                </div>

                <div className="LoginWrapper">
                    <p></p>
                    <form onSubmit={this.loginHandler} autoComplete="off">

                        <MobileTypeInput
                            type="text"
                            placeholder="Username"
                            value={this.state.username}
                            textHandler={this.textHandler}
                            name="username"
                        />
                        <MobileTypeInput
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            textHandler={this.textHandler}
                            name="password"
                        />

                        <SubmitGradientButton
                            label="Login"
                            style={{marginTop: '30px'}}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (username, password) => dispatch(authActions.authenticate(username, password)),
        getTokens: () => dispatch(authActions.getToken())
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
