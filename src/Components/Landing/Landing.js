import React, { Component } from 'react'
import './Landing.css'
import { Link } from 'react-router-dom';
import { updateCartItems, updateProductsToDisplay } from '../../Redux/reducer.js'
import { connect } from 'react-redux';
import DownArrow from '../../resources/down-arrow.png';
import { allProducts } from '../../Products.js'
import { scroller } from 'react-scroll'
import Header from '../Header/Header';
import DisplayProducts from './DisplayProducts';
import Popup from '../Popup/Popup';
import styled from 'styled-components';

let PurchaseButton = styled.button`
    width: 350px;
    height: 45px;
    border: 1px solid rgb(30, 184, 30);
    color: white;
    font-size: 18px;
    background-color: rgb(30, 184, 30);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: white;
        color: rgb(30, 184, 30);
    }
`;

class Landing extends Component {

    constructor() {
        super();

        this.state = {
            productsToDisplay: [],
            headerText: '4-Pack Oil Change Products',
            showPopup: false
        }
    }

    componentDidMount() {
        if (this.props.location.query) {
            if (this.props.location.query.productInfo === '4pack') {
                this.changeCategoryColor('4PackContainer')
            } else if (this.props.location.query.productInfo === 'single') {
                this.changeCategoryColor('SinglePackContainer')
            } else if (this.props.location.query.productInfo === 'additional') {
                this.changeCategoryColor('AdditionalPackContainer')
            } else if (this.props.location.query.productInfo === 'all') {
                this.changeCategoryColor('AllProductsContainer')
            } else if (this.props.location.query.fromLanding === false) {
                this.setState({ headerText: 'Search Results' })
            }
            this.scrollToProducts();
        } else {
            this.changeCategoryColor('4PackContainer')
        }
    }

    scrollToProducts = (offset) => {
        if (!offset) { offset = -120; }
        scroller.scrollTo('scroll_to', {
            duration: 700,
            smooth: true,
            offset: offset,
            ignoreCancelEvents: true
        })
    }

    addToCart = (item) => {
        if (this.state.showPopup === false) {
            this.setState({ showPopup: true })
            setTimeout(() => { this.setState({ showPopup: false }) }, 2000)
        }
        new Promise((resolve, reject) => {
            this.props.updateCartItems(item);
            resolve();
        }).then(() => {
            localStorage.setItem('cartItems', JSON.stringify(this.props.cartItems));
        })
    }

    changeCategoryColor = (elementID, scrollAmount) => {
        document.getElementById(elementID).classList.add('category_clicked');
        switch (elementID) {
            case '4PackContainer':
                this.setState({ headerText: '4-Pack Oil Change Products' })
                this.props.updateProductsToDisplay(allProducts[0]);
                document.getElementById('SinglePackContainer').className = 'category_default';
                document.getElementById('AdditionalPackContainer').className = 'category_default';
                document.getElementById('AllProductsContainer').className = 'category_default';
                break;
            case 'SinglePackContainer':
                this.setState({ headerText: 'Single Oil Change Products' })
                this.props.updateProductsToDisplay(allProducts[1]);
                document.getElementById('4PackContainer').className = 'category_default';
                document.getElementById('AdditionalPackContainer').className = 'category_default';
                document.getElementById('AllProductsContainer').className = 'category_default';
                break;
            case 'AdditionalPackContainer':
                this.setState({ headerText: 'Additional Products' })
                this.props.updateProductsToDisplay(allProducts[2]);
                document.getElementById('4PackContainer').className = 'category_default';
                document.getElementById('SinglePackContainer').className = 'category_default';
                document.getElementById('AllProductsContainer').className = 'category_default';
                break;
            case 'AllProductsContainer':
                let tempProducts = [];
                for (let i = 0; i < allProducts.length; i++) {
                    for (let j = 0; j < allProducts[i].length; j++)
                        tempProducts.push(allProducts[i][j])
                }
                this.setState({ headerText: 'All Products' })
                this.props.updateProductsToDisplay(tempProducts);
                document.getElementById('4PackContainer').className = 'category_default';
                document.getElementById('AdditionalPackContainer').className = 'category_default';
                document.getElementById('SinglePackContainer').className = 'category_default';
                break;
            default:
                document.getElementById('4PackContainer').className = 'category_default';
                document.getElementById('SinglePackContainer').className = 'category_default';
                document.getElementById('AdditionalPackContainer').className = 'category_default';
                document.getElementById('AllProductsContainer').className = 'category_default';
                break;
        }
        if (scrollAmount) { this.scrollToProducts(scrollAmount) }
    }

    scrollOnMobile = () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.scrollToProducts(450)
        }
    }

    updateProductsFromHeader = (productsToDisplay, headerText) => {
        this.scrollToProducts();
        this.setState({ productsToDisplay, headerText })
        document.getElementById('4PackContainer').className = 'category_default';
        document.getElementById('SinglePackContainer').className = 'category_default';
        document.getElementById('AdditionalPackContainer').className = 'category_default';
        document.getElementById('AllProductsContainer').className = 'category_default';
    }

    render() {
        return (
            <div className='landing_page_container'>
                <Header changeCategory={this.changeCategoryColor} fromLanding={true} scrollToProducts={this.scrollToProducts} updateState={() => { this.setState({ headerText: 'Search Results' }) }} />
                <Popup isOpen={this.state.showPopup} addToCart={true} />
                <section className='hero_background_container'>
                    <div className='hero_text_container'>
                        <h1>THE <span className='hero_text_bold'>BEST DEALS</span> ON<br /><span className='hero_text_bold'>PRE-PAID</span> SERVICE PACKS</h1>
                    </div>
                    <section onClick={() => this.scrollToProducts()}>
                        <img src={DownArrow} alt='' />
                    </section>
                </section>

                <section name='scroll_to' className='landing_page_section-title'>
                    <h1>AVAILABLE SERVICE PACKS</h1>
                </section>

                <section className='landing_page_product-category-container'>
                    <div id='4PackContainer' onClick={() => { this.changeCategoryColor('4PackContainer'); this.scrollOnMobile(); }}>
                        <span className='product_category-text-header'>4 Pack</span>
                        <span className='product_category-text-bottom'>Oil Changes</span>
                    </div>

                    <div id='SinglePackContainer' onClick={() => { this.changeCategoryColor('SinglePackContainer'); this.scrollOnMobile(); }}>
                        <span className='product_category-text-header'>Single</span>
                        <span className='product_category-text-bottom'>Oil Changes</span>
                    </div>

                    <div id='AdditionalPackContainer' onClick={() => { this.changeCategoryColor('AdditionalPackContainer'); this.scrollOnMobile(); }}>
                        <span className='product_category-text-header'>Additional</span>
                        <span className='product_category-text-bottom'>Products</span>
                    </div>

                    <div id='AllProductsContainer' onClick={() => { this.changeCategoryColor('AllProductsContainer'); this.scrollOnMobile(); }}>
                        <span className='product_category-text-header'>All</span>
                        <span className='product_category-text-bottom'>Products</span>
                    </div>
                </section>

                {this.props.productsToDisplay.length ?
                    <section className='landing_products_container'>
                        <section className='landing_page_products-header'>
                            <h1>{this.state.headerText}</h1>
                        </section>

                        <DisplayProducts products={this.props.productsToDisplay} addToCart={this.addToCart} />

                        <Link to='/cart'>
                            <PurchaseButton className='landing_page_purchase-button'>CONTINUE TO PURCHASE</PurchaseButton>
                        </Link>
                    </section>
                    :
                    <section className='landing_products_container'>
                        <section className='landing_page_products-header'>
                            <h1 style={{ marginBottom: '50px' }}>No Products Found...</h1>
                        </section>
                    </section>
                }

                <footer className='landing_page_footer-container'>
                    <h1>Copyright 2018</h1>
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cartItems: state.cartItems,
        productsToDisplay: state.productsToDisplay
    };
}

export default connect(mapStateToProps, { updateCartItems, updateProductsToDisplay })(Landing);