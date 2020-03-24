import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from '../../store/actions/authActions';
import './style.css';

class TopHeader extends Component {

    componentDidMount() {
        this.props.getToken();
    }

    render() {
        let guestAccount = <ul className="Dropdown Account">
            <li><Link to="/signup"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>Register</span></Link></li>
            <li><Link to="/login"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>Login</span></Link></li>
        </ul>;
        if(this.props.auth.isAuthenticated){
            guestAccount = <ul className="Dropdown Account">
                <li><Link to="" onClick={() => this.props.logout()}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;<span>Logout</span></Link></li>
            </ul>;
        }

        return (
            <header className="Header">
                <div className="TopHeader">
                    <div>
                        <li className="MenuItem">
                            <i className="far fa-user-circle"></i>
                            <Link to="/account">{this.props.auth.isAuthenticated ? this.props.auth.user: 'My Account'}</Link>
                            {guestAccount}
                        </li>
                    </div>
                </div>
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
        getToken: () => dispatch(authActions.getToken()),
        logout: () => dispatch(authActions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
