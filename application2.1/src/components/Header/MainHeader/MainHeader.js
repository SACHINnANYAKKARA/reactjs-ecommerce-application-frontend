import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActions from '../../../store/actions/authActions';

import './style.css';

class MainHeader extends Component {

    componentDidMount() {
        this.props.getToken();
    }

    render() {
        let guestAccount = <ul className="Dropdown Account">
            <li><Link to="/signup"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>Register</span></Link></li>
            <li><Link to="/login"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>Login</span></Link></li>
        </ul>;
        if (this.props.auth.isAuthenticated) {
            guestAccount = <ul className="Dropdown Account">
                <li><Link to="" onClick={() => this.props.logout()}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;
                    <span>Logout</span></Link></li>
            </ul>;
        }

        return (
            <div className="MainHeader">
                <div>
                    <ul className="MainMenu">
                        <li className="MenuItem">
                            <i className="far fa-user-circle"></i>
                            <Link
                                to="/account">{this.props.auth.isAuthenticated ? this.props.auth.user : 'My Account'}</Link>
                            {guestAccount}
                        </li>
                    </ul>
                </div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
