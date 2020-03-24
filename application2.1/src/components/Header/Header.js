import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainHeader from './MainHeader/MainHeader';
import * as authActions from '../../store/actions/authActions';

import './style.css';

class Header extends Component {

    componentDidMount() {}

    logout = () => {
        this.props.logout();
    }

    render() {

        return (
            <header className="Header">
                <MainHeader logout={this.logout} />
            </header>
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
        logout: () => dispatch(authActions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
