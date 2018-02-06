import React from 'react';
import {Redirect} from 'react-router';
import './Login.css'
import '../../animate.css';
import {connect} from 'react-redux';
import {updateLoggedInStatus} from '../../Redux/reducer';
import WOW from 'wowjs';

class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        new WOW
            .WOW()
            .init();
    }

    login = () => {
        if (!this.state.username || !this.state.password) {
            this.setState({errorMessage: 'Username and Password is required.'})
        } else {
            this.setState({errorMessage: ''})
            this
                .props
                .updateLoggedInStatus(true);
        }
    }

    changeScreen = (screenToDisplay, screenToHide) => {
        document
            .getElementById(screenToDisplay)
            .style
            .display = 'flex'
        document
            .getElementById(screenToHide)
            .style
            .display = 'none';
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to='/'/>
        }
        return (
            <div className='main_login_page'>
                <img
                    src='https://2.bp.blogspot.com/-0JssU9CnMVw/WObRYGvKTEI/AAAAAAAAnfQ/4HzMzgvEnKUmzP2o1ToNYzSJGNnHMq3kQCLcB/s1600/Uber-and-Lyft-drivers-pulled-off-Massachusetts-streets--1a.jpg'
                    className='main_background_image' alt=''/>
                <div
                    className='fadeIn'
                    style={{
                    animationDuration: '.7s'
                }}id='login_container'>
                    <div className='login_top_container'>
                        <section
                            onClick={() => this.changeScreen('login_content', 'signup_content')}
                            className='login login_buttons'>Log In</section>
                        <section
                            onClick={() => this.changeScreen('signup_content', 'login_content')}
                            className='signup login_buttons'>Sign Up</section>
                    </div>

                    <section id='login_content'>
                        <h1
                            style={{
                            margin: '20px'
                        }}>Log In</h1>
                        <div className='login_buttons_container'>
                            <input
                                onChange={(text) => this.setState({username: text.target.value})}
                                placeholder='Email'/>
                            <input
                                onChange={(text) => this.setState({password: text.target.value})}
                                type='password'
                                placeholder='Password'/>
                        </div>

                        <div>
                            <button
                                onClick={() => this.login()}
                                className='login_button login_button_properties'>Log In</button>
                            <br/> {this.state.errorMessage
                                ? <h1 className='login_error_message'>{this.state.errorMessage}</h1>
                                : null}
                        </div>
                    </section>

                    <section id='signup_content'>
                        <h1
                            style={{
                            margin: '20px'
                        }}>Free Sign Up</h1>
                        <div className='signup_buttons_container'>
                            <input placeholder='First Name'/>
                            <input placeholder='Last Name'/>
                            <input placeholder='Email'/>
                            <input type='password' placeholder='Password'/>
                        </div>

                        <div>
                            <button
                                onClick={() => this.login()}
                                className='login_button login_button_properties'>Sign Up</button>
                            <br/> {this.state.errorMessage
                                ? <h1 className='login_error_message'>{this.state.errorMessage}</h1>
                                : null}
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {isLoggedIn: state.isLoggedIn};
}

export default connect(mapStateToProps, {updateLoggedInStatus})(Login);