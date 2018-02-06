import React from 'react';
import styled, { keyframes } from 'styled-components';
import './Popup.css';

let ConatinerFade = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    right: 0;
    opacity: 1;
  }
  85% {
    right: 0;
    opacity: 1;
  }
  90% {
    right: 0;
  }
  100% {
    right: -100px;
    opacity: 0;
  }
`;
let TextFade = keyframes`
  from { opacity: 0;}
  to { opacity: 1;}
`

let PopupContainer = styled.div`
    z-index: 110;
    width: 240px;
    height: 60px;
    font-size: 16px;
    align-items: center;
    justify-content: space-around;
    background-color: ${props => props.color};
    color: white;
    right: -100px;
    margin: 120px 20px 0 0;
    position: fixed;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    opacity: 1;
    animation: ${ConatinerFade} 2s ease;
    box-shadow: 1px 1px 4px ${props => props.color};

    @media only screen and (max-width: 800px) {
      width: 190px !important;
      margin: 95px 10px 0 0;
      font-size: 14px;
    }

    h1 {
        animation: ${TextFade} 1s ease;
    }
`;
let CheckMark = styled.div`
    background-color: white;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
      margin-bottom: 5px;
      content: '';
      display: block;
      width: 10px;
      height: 20px;
      border: 1px solid ${props => props.color};
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
  }
`;

export default class Popup extends React.Component {
  constructor() {
    super();

    this.state = {
      text: 'Removed from Cart!',
      color: '#A4012E',
      isIE: false
    }
  }

  componentDidMount() {
    if (this.props.addToCart) {
      this.setState({ text: 'Added to Cart!', color: '#2bbf2d' })
    }
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      this.setState({ isIE: true })
    }
  }

  render() {
    return (
      <PopupContainer isOpen={this.props.isOpen} color={this.state.color}>
        {this.state.isIE ?
          <CheckMark color={this.state.color}/>
          :
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" style={{ stroke: this.state.color }} viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
        }
        <h1>{this.state.text}</h1>
      </PopupContainer>
    )
  }
}