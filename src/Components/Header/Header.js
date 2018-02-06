import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import styled from 'styled-components';
import ShoppingCartIcon from '../../resources/online-shopping-cart.png';
import Tire from '../../resources/tire.png';
import More from '../../resources/ellipsis.png';
import Oil from '../../resources/gasoline.png';
import JiffyLubeLogo from '../../resources/JL_eCommerce.png';
import { allProducts } from '../../Products';
import Menu from '../Menu/Menu';
import { updateProductsToDisplay } from '../../Redux/reducer';

let SearchContainer = styled.div`
    width: 26%;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 3% 0 3%;

    @media only screen and (max-width: 800px) {
        width: 45%;

        input {
            height: 30px !important;
            font-size: 10px !important;
            font-weight: normal !important;
            padding: 0 10px 0 25px !important;
            background-size: 14px 14px !important;
            background-position: 5px !important;
        }

        button {
            width: 30px !important;
            height: 30px !important;
            border: none;
            font-size: 18px;
            font-weight: lighter;
            background-color: #5e001e;
            color: white;
            cursor: pointer;
            margin: 2px 0 0 0 !important;
            background-position: center;
            background-image: url('http://www.clker.com/cliparts/n/U/H/1/H/u/search-icon-white-one-hi.png');
            background-size: 20px !important;
        }
    }
    input {
        width: 90%;
        height: 40px;
        font-size: 18px;
        font-weight: lighter;
        box-sizing: border-box;
        padding: 0 20px 0 45px;
        border: none;
        background-image: url('https://founderspledge.com/assets/tool-eb55fd48ba43e5215980829385a8058d2ec5f357ab63be0d4c7758ccf0a4db77.svg');
        background-repeat: no-repeat;
        background-size: 24px 24px;
        background-position: 10px;
        border-radius: 2px;
    }

    button {
        width: 40px;
        height: 40px;
        border: none;
        font-size: 18px;
        font-weight: lighter;
        background-color: #5e001e;
        color: white;
        cursor: pointer;
        margin-left: 10px;
        border-radius: 2px;
        background-position: center;
        background-image: url('http://www.clker.com/cliparts/n/U/H/1/H/u/search-icon-white-one-hi.png');
        background-size: 27px;
        background-repeat: no-repeat;
    }
`;
let CategoryContainer = styled.section`
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    margin: 0 3% 0 0;

    @media only screen and (max-width: 800px) {
        display: none;
    }
`;
let Category = styled.h1`
    font-size: 14px;
    font-weight: bold;
    line-height: 18px;
`;
let IconContainer = styled.div`
    display: ${props => props.mobile ? 'none' : 'flex'};
    align-items: center;
    height: 40px;

    @media only screen and (max-width: 800px) {
        display: ${props => props.mobile ? 'flex' : 'none'};
    }
    
    section {
        border: 1px solid white;
        border-radius: 100%;
        min-width: 32px;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }
    
    img {
        width: 20px;
        height: 20px;
    }
`;

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            searchInput: '',
            isIE: false
        }
    }

    componentDidMount() {
        if (document.documentMode || /Edge/.test(navigator.userAgent)) {
            this.setState({ isIE: true })
        }
    }

    filterProducts = () => {
        let productsToDisplay = [];
        for (let i = 0; i < allProducts.length; i++) {
            for (let j = 0; j < allProducts[i].length; j++) {
                if (allProducts[i][j].productTitle.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
                    productsToDisplay.push(allProducts[i][j])
                }
            }
        }
        if (this.props.scrollToProducts) {
            this.props.scrollToProducts(230);
        }
        if (this.props.updateState)
            this.props.updateState();
        this.props.updateProductsToDisplay(productsToDisplay);
    }

    render() {
        console.log(this.state)
        return (
            <header className='main_header'>
                <section className='main_logo_container'>
                    <Link to='/'>
                        <img src={JiffyLubeLogo} alt='' />
                    </Link>
                </section>

                <SearchContainer>
                    <input onChange={(text) => { this.setState({ searchInput: text.target.value }); }} placeholder='Search products...' />
                    <Link to={{ pathname: '/', query: { fromLanding: false } }}><button style={this.state.isIE ? { marginTop: '2px' } : null} onClick={() => this.filterProducts()} /></Link>
                </SearchContainer>

                <CategoryContainer>
                    <Link onClick={() => { this.props.fromLanding && this.props.changeCategory('4PackContainer', -120) }} to={{ pathname: '/', query: { productInfo: 'oil' } }} >
                        <IconContainer>
                            <section>
                                <img src={Oil} alt='' />
                            </section>

                            <Category>Oil<br />Changes</Category>
                        </IconContainer>
                    </Link>

                    <Link onClick={() => { this.props.fromLanding && this.props.changeCategory('AdditionalPackContainer', -120) }} to={{ pathname: '/', query: { productInfo: 'additional' } }} >
                        <IconContainer>
                            <section>
                                <img src={Tire} alt='' />
                            </section>

                            <Category>Additonal<br />Products</Category>
                        </IconContainer>
                    </Link>

                    <Link onClick={() => { this.props.fromLanding && this.props.changeCategory('AllProductsContainer', -120) }} to={{ pathname: '/', query: { productInfo: 'all' } }} >
                        <IconContainer>
                            <section>
                                <img src={More} alt='' />
                            </section>

                            <Category>All<br />Products</Category>
                        </IconContainer>
                    </Link>

                    {/* {this.props.isLoggedIn
                        ? <Link to='/my-account'>
                            <div className='header_options_container'>
                                <section>
                                    <img src={UserIcon} alt='' />
                                </section>
                                <h1>My Account</h1>
                            </div>
                        </Link>
                        : <Link to='/login'>
                            <div className='header_options_container'>
                                <section>
                                    <img src={UserIcon} alt='' />
                                </section>
                                <h1>Log In</h1>
                            </div>
                        </Link>
                    } */}
                    <Link to='/cart'>
                        <IconContainer>
                            <section>
                                <img src={ShoppingCartIcon} alt='' />
                            </section>

                            <Category>{this.props.cartItems.length}</Category>
                        </IconContainer>
                    </Link>
                </CategoryContainer>

                <IconContainer mobile>
                    <Menu fromLanding={this.props.fromLanding} changeCategory={this.props.changeCategory} />
                </IconContainer>


            </header>
        )
    }
}

function mapStateToProps(state) {
    return { isLoggedIn: state.isLoggedIn, cartItems: state.cartItems };
}

export default connect(mapStateToProps, { updateProductsToDisplay })(Header);