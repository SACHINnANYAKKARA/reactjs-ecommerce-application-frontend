import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PageHeader } from 'antd';
import * as authActions from '../../store/actions/authActions';
import './style.css';

class Header extends Component {

    componentDidMount() {
        this.props.getToken();
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Title"
                    subTitle="This is a subtitle"
                />,
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken()),
        logout: () => dispatch(authActions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
