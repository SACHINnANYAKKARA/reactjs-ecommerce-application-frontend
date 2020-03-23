import React, {Component} from 'react';
import {Form, Input, Button, Radio, Card} from 'antd';
import './style.css';
import * as authActions from "../../store/actions/authActions";
import {connect} from 'react-redux';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class SignUp extends Component {

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

    onFinish = (e) => {

        const signupForms = this.state.signupForm;
        const updateSignupForm = {
            ...signupForms,
            username: e.username,
            email: e.email,
            phone: e.phone,
            address: e.address,
            password: e.password
        }
        this.setState({
            signupForm: updateSignupForm
        })

        const {signupForm} = this.state;

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
        if (!this.props.auth.isAuthenticated) {
            this.props.getToken()
                .then(result => {
                    // result will be either true or false
                    if (result) {
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

        const {SignUpForm} = this.state;

        return (
            <div className="signup-border-less-wrapper">
                <Card className="card-body" title="Login Form">
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={this.onFinish}
                        initialValues={{remember: true}}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            value={this.state.username}
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            value={this.state.email}
                            rules={[{required: true, message: 'Please input your email!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            value={this.state.phone}
                            rules={[{required: true, message: 'Please input your phone!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            value={this.state.phone}
                            rules={[{required: true, message: 'Please input your phone!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            value={this.state.address}
                            rules={[{required: true, message: 'Please input your address!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            value={this.state.password}
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
