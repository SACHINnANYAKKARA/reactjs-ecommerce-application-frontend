import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
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


class Login extends Component {
    state = {
        redirectToreferrer: false,
        username: '',
        password: ''
    }

    onFinish = (values) => {

        this.setState({
            username: values.username,
            password: values.password
        })

        this.props.authenticate(this.state.username, this.state.password).then(response => {

            if (response.hasOwnProperty('token')) {
                window.localStorage.setItem('auth', JSON.stringify(response))
                this.setState({
                    redirectToReferrer: true
                });
            }
        })

        // if(this.state.redirectToReferrer){
        //     this.props.history.push('/products');
        // }

    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.getTokens()
                .then(result => {
                    // result will be either true or false
                    if (result) {
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

        return (
            <div className="site-card-border-less-wrapper">

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

                    {/*<Radio.Group className="radio-button-size">*/}
                    {/*    <Radio.Button value="large" onClick>Large</Radio.Button>*/}
                    {/*    <Radio.Button value="small">Small</Radio.Button>*/}
                    {/*</Radio.Group>*/}

                </Card>

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
