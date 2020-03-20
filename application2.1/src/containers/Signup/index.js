import React, { Component } from 'react';
import './style.css';
import * as authActions from '../../store/actions/authActions';
import MobileTypeInput from '../../components/UI/MobileTypeInput';
import SubmitGradientButton from '../../components/UI/SubmitGradientButton';
import  { connect } from 'react-redux';
import { Form } from 'antd';

class Signup extends Component {

    state = {
        redirectToreferrer: false,
        signupForm: {
            username: '',
            email: '',
            phone: '',
            address: '',
            password: ''
        }
    }

    textHandler = (e) => {
        const signupForm = this.state.signupForm;
        const updateSignupForm = {
            ...signupForm,
            [e.target.name] : e.target.value
        }
        this.setState({
            signupForm: updateSignupForm
        })
    }

    signupHandler = (e) => {
        console.log('p');
        e.preventDefault();
        const { signupForm } = this.state;

        const user = {
            username: signupForm.username,
            email: signupForm.email,
            phone: signupForm.phone,
            address: signupForm.address,
            password: signupForm.password,
        }

        this.props.signup(user);
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    // result will be either true or false
                    if(result){
                        this.setState({
                            redirectToreferrer: true
                        });
                    }

                })
                .catch(er => {
                    console.log(er);
                });
        }
    }

    render() {

        const { signupForm, redirectToreferrer }  = this.state;

        return (
            <div className="LoginContainer">
                <div className="WelcomeText">
                    <h3>Signup</h3>
                </div>
                <div className="LoginWrapper">
                    <form onSubmit={this.signupHandler} autoComplete="off">

                        <MobileTypeInput
                            type="text"
                            placeholder="Username"
                            value={signupForm.username}
                            textHandler={this.textHandler}
                            name="username"
                        />
                        <MobileTypeInput
                            type="text"
                            placeholder="Email"
                            value={signupForm.email}
                            textHandler={this.textHandler}
                            name="email"
                        />
                        <MobileTypeInput
                            type="text"
                            placeholder="Phone number"
                            value={signupForm.phone}
                            textHandler={this.textHandler}
                            name="phone"
                        />
                        <MobileTypeInput
                            type="text"
                            placeholder="Address"
                            value={signupForm.address}
                            textHandler={this.textHandler}
                            name="address"
                        />
                        <MobileTypeInput
                            type="password"
                            placeholder="Password"
                            value={signupForm.password}
                            textHandler={this.textHandler}
                            name="password"
                        />

                        <SubmitGradientButton
                            label="Signup"
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
        signup: (user) => dispatch(authActions.signup(user)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
