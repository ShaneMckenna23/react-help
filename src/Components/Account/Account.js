import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import './Account.css';

class Account extends React.Component {

    constructor() {
        super();

        this.state = {
            isRedirected: false
        }
    }
    componentDidMount() {
        // if (!this.props.isLoggedIn) {     this.setState({isRedirected: true}) }
    }

    render() {
        if (this.state.isRedirected) {
            return <Redirect to='/login'/>
        }
        return (
            <div className='main_myaccount_container'>
                <h1>Your Account</h1>
                <div className='boxes_myaccount_container'>
                    <Link to='/certificates/redeemable'>
                        <section className='half-box'>
                            <img
                                src='https://www.jinnah.edu/wp-content/uploads/2016/12/certificate-flat.png'
                                alt=''/>
                            <h1>Available Certificates</h1>
                        </section>
                    </Link>

                    <Link to='/certificates/redeemed'>
                        <section className='half-box'>
                            <img
                                src='https://images.vexels.com/media/users/3/135116/isolated/lists/e4f239d23ddc87321c65a604b45a82c8-file-document-sign-with-round-background.png'
                                alt=''/>
                            <h1>Redeemed Certificates</h1>
                        </section>
                    </Link>

                    <Link to='/certificates/all'>
                        <section className='full-box'>
                            <img
                                src='http://free-icon-rainbow.com/i/icon_00456/icon_004560_256.png'
                                alt=''/>
                            <h1>All Certificates</h1>
                        </section>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {isLoggedIn: state.isLoggedIn};
}

export default connect(mapStateToProps)(Account);