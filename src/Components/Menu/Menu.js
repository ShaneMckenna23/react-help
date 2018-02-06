import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

let MenuContainer = styled.div`
    display: block;
    position: absolute;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
`;

let ToggleButton = styled.input`
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
    -webkit-touch-callout: none;

    &:checked ~ ul
    {
      transform: scale(1.0, 1.0) !important;
      opacity: 1;
    }
    &:checked ~ span
    {
      opacity: 1;
      transform: rotate(45deg) translate(-2px, -1px);
      background: #232323;
    }
    &:checked ~ span:nth-last-child(3)
    {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }
    &:checked ~ span:nth-last-child(2)
    {
      opacity: 1;
      transform: rotate(-45deg) translate(0, -1px);
    }
`;

let MenuLine = styled.span`
    display: block;
    width: 30px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: white;
    z-index: 1;
    transform-origin: 1px 0px;
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
    background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
    opacity 0.55s ease;

    &:first-child { transform-origin: 0% 0%; }
    &:nth-last-child(2) { transform-origin: 0% 100%; }
`;
let MenuListContainer = styled.ul`
    position: absolute;
    width: 280px;
    margin: -100px 0 0 0;
    padding: 30px;
    padding-top: 100px;
    right: -100px;

    overflow-x: hidden;
    background: white;
    box-shadow: 1px 1px 4px gray;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    /* to stop flickering of text in safari */

    transform-origin: 0% 0%;
    transform: translate(100%, 0);

    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);

    li {
        padding: 10px 0;
        font-size: 18px;
    }
    li:hover {
        background-color: gray;
        color: white;
    }
    li:active {
        ${MenuLine} {
            background: red !important;
        }
    }
`;

class Menu extends React.Component {
    render() {
        return (
            <nav style={{ margin: '-20px 0 0 10px' }}>
                <MenuContainer>

                    <ToggleButton type="checkbox" id='menuController'/>

                    <MenuLine />
                    <MenuLine />
                    <MenuLine />
                    <MenuListContainer id="menu">
                        <Link to='/' onClick={() => document.getElementById('menuController').checked = false}><li>Home</li></Link>
                        <Link onClick={() => { this.props.fromLanding && this.props.changeCategory('4PackContainer', 450); document.getElementById('menuController').checked = false }} to={{ pathname: '/', query: { productInfo: '4pack' } }} ><li>4-Pack Oil Changes</li></Link>
                        <Link onClick={() => { this.props.fromLanding && this.props.changeCategory('SinglePackContainer', 450); document.getElementById('menuController').checked = false }} to={{ pathname: '/', query: { productInfo: 'single' } }} ><li>Single Oil Changes</li></Link>
                        <Link onClick={() => { this.props.fromLanding && this.props.changeCategory('AdditionalPackContainer', 450); document.getElementById('menuController').checked = false }} to={{ pathname: '/', query: { productInfo: 'additional' } }} ><li>Additional Products</li></Link>
                        <Link onClick={() => { this.props.fromLanding && this.props.changeCategory('AllProductsContainer', 450); document.getElementById('menuController').checked = false }} to={{ pathname: '/', query: { productInfo: 'all' } }} ><li>All Products</li></Link>
                        <Link to='/cart' onClick={() => document.getElementById('menuController').checked = false}><li>Cart ({this.props.cartItems.length})</li></Link>
                    </MenuListContainer>
                </MenuContainer>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return { cartItems: state.cartItems };
}

export default connect(mapStateToProps)(Menu);