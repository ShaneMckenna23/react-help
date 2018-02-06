import React from 'react';
import { connect } from 'react-redux';
import './Cart.css'
import swal from 'sweetalert';
import { Redirect, Link } from 'react-router-dom';
import { disableCheckoutPrompt, removeCartItem, clearCart } from '../../Redux/reducer'
import Header from '../Header/Header';
import styled from 'styled-components';
import Popup from '../Popup/Popup';

import Stripe from '../Stripe/Stripe';

let RemoveButton = styled.button`
    width: 40px;
    height: 40px;
    background-color: #97002f;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: default;
    transition: all 0.3s ease;
    border: none;
    font-weight: lighter;

    &:hover {
        border: 1px solid #97002f;
        background-color: white;
        color: #97002f;
        font-weight: bold;
    }

    @media only screen and (max-width: 800px) {
        width: 30px;
        height: 30px;
    }
`;

let CheckoutButton = styled.button`
    border-style: none;
    font-size: 16px;
    color: white;
    width: 100%;
    height: 50px;
    cursor: pointer;
    border-radius: 0;
    font-weight: normal;
    background-color: ${props => props.color};
    border: 1px solid ${props => props.color};
    transition: all 0.2s ease;
    padding: 0;

    &:hover {
        background-color: white;
        color: ${props => props.color};
        font-weight: 400;
    }
`;
class Cart extends React.Component {

    constructor() {
        super();

        this.state = {
            isRedirect: false,
            redirectPath: '/login',
            showPopup: false,
            askedUser: false,
            cartTotal: 0,
            savingsTotal: 0,
            orderTotal: 0
        }
    }

    removeItemFromCart = (index) => {
        if (this.state.showPopup === false) {
            this.setState({ showPopup: true })
            setTimeout(() => { this.setState({ showPopup: false }) }, 2000)
        }

        new Promise((resolve, reject) => {
            this.props.removeCartItem(index);
            resolve();
        }).then(() => {
            this.calculateTotal();
            localStorage.setItem('cartItems', JSON.stringify(this.props.cartItems));
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.calculateTotal();
        // if (!this.props.checkoutPrompt && !this.props.isLoggedIn) {
        //     this
        //         .props
        //         .disableCheckoutPrompt();
        //     swal("Creating an account allows you to keep track and view all of your purchases onli" +
        //         "ne, as well as redeem them from your mobile device!", {
        //             buttons: {
        //                 cancel: "No thanks.", catch: {
        //                     text: "Log me in!",
        //                     value: "login"
        //                 }
        //             }
        //         }).then((value) => {
        //             switch (value) {
        //                 case "login":
        //                     this.setState({ isRedirect: true });
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         });
        // }
    }

    checkout = () => {
        swal("Purchased!", "Your payment went through! You can now check your email or view your puchases fr" +
            "om the 'My Account' tab.",
            "success").then(() => {
                if (this.props.isLoggedIn) {
                    this.setState({ redirectPath: '/certificates/redeemable', isRedirect: true })
                }
                this
                    .props
                    .clearCart();
            })
    }

    calculateTotal = () => {
        if (this.props.cartItems.length) {
            let cartTotal = 0;
            let savingsTotal = 0;
            for (let property in this.props.cartItems) {
                let price = this.props.cartItems[property].productPrice;
                let savings = this.props.cartItems[property].productSavings;
                savingsTotal += savings;
                cartTotal += price;
            }

            this.setState({
                cartTotal: (cartTotal).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }),
                savingsTotal: (savingsTotal - cartTotal).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }),
                orderTotal: (cartTotal + 3).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })
            })
        }
    }

    render() {
        if (this.state.isRedirect) {
            return <Redirect to={this.state.redirectPath} />
        }
        if (this.props.cartItems.length) {
            return (
                <div className='cart_page_container'>
                    <Header />
                    <Popup isOpen={this.state.showPopup} addToCart={false} />
                    {/* Products View Container */}
                    <h1 className='cart_page_header'>YOUR CART</h1>
                    <section className='cart_container'>
                        <header>
                            <h1>#</h1>
                            <h2>PRODUCT</h2>
                            <h3>SAVINGS</h3>
                            <h4>PRICE</h4>
                            <h5>REMOVE</h5>
                        </header>

                        {/* Product Container */}
                        {this.mapThroughCart()}

                    </section>

                    {/* Payment and Checkout Container */}
                    <section className='cart_paymentcheckout_container'>

                        {/* Payment Details Container */}
                        <div className='paymentcheckout_details_container'>
                            <header className='cart_container_header'>
                                <h1>PAYMENT DETAILS</h1>
                            </header>
                            <section style={{ marginTop: '30px' }}>
                                <h1>Cart Total</h1>
                                <h1>{this.state.cartTotal}</h1>
                            </section>

                            <section>
                                <h1>Fee</h1>
                                <h1>$3.00</h1>
                            </section>

                            <section className='paymentcheckout_details_savings'>
                                <h1>Savings</h1>
                                <h1>{this.state.savingsTotal}</h1>
                            </section>

                            <section className='paymentcheckout_details_total'>
                                <h1>Order Total</h1>
                                <h1>{this.state.orderTotal}</h1>
                            </section>

                        </div>

                        {/* Checkout Buttons Container */}
                        <div className='paymentcheckout_checkout_container'>
                            <header className='cart_container_header'>
                                <h1>CHECKOUT</h1>
                            </header>
                            <Stripe amount={Number(this.state.orderTotal)}/>
                            <Link to={{ pathname: '/', query: { productInfo: '4pack' } }} style={{ width: '100%' }}>
                                <CheckoutButton color='#42a8ff'>Add More Items</CheckoutButton>
                            </Link>
                            <CheckoutButton color='#737373'>Log In - Coming Soon</CheckoutButton>
                        </div>
                    </section>
                </div>
            )
        } else {
            return (
                <div className='cart_page_container'>
                    <Header />
                    <section className='cart_page_empty-container'>
                        <div>
                            <img src='http://www.free-icons-download.net/images/clear-cart-icon-70563.png' alt='' />
                            <h1>There are no items in your cart.</h1>
                        </div>
                        <Link to={{ pathname: '/', query: { productInfo: '4pack' } }}><button>VIEW PRODUCTS</button></Link>
                    </section>
                </div>
            )
        }
    }

    mapThroughCart = () => {
        return this.props.cartItems.map((product, index) => {
            return (
                <div key={index} className='cart_product-info-container'>
                    <h1>{index + 1}</h1>
                    <section className='cart_product_info-container'>
                        <img src={product.productImage} alt='' />
                        <div>
                            <h1>{product.productTitle}</h1>
                            <p>{product.productDescription}</p>
                        </div>
                    </section>

                    <h2 className='cart_product_info-savings'>${product.productSavings}</h2>
                    <h2 className='cart_product_info-price'>${product.productPrice.toFixed(2)}</h2>

                    <section className='cart_product_info-remove'>
                        <RemoveButton onClick={() => this.removeItemFromCart(index)}>X</RemoveButton>
                    </section>
                </div>
            )
        })
    }
}

function mapStateToProps(state) {
    return { cartItems: state.cartItems, checkoutPrompt: state.checkoutPrompt, isLoggedIn: state.isLoggedIn };
}

export default connect(mapStateToProps, { disableCheckoutPrompt, removeCartItem, clearCart })(Cart);