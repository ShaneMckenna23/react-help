import React from 'react';
import styled from 'styled-components';

let ProductContainer = styled.div`
    width: 100%;
    min-height: 170px;
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    padding: 15px;
    box-sizing: border-box;
    margin-top: 50px;
    border-bottom: 1px solid lightgray;

    @media only screen and (max-width: 800px) {
        flex-direction: column;
    }
`;
let DescriptionContainer = styled.section`
    width: 60%;
    display: flex;

    img {
        width: 10%;
        max-width: 80px;
        height: 130px;
        margin-right: 20px;
    }
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        img {
            width: auto !important;
        }
   }

    div {
        h1 { 
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
        }
        p {
            font-size: 15px;
            font-weight: 200;
        }
    }

    @media only screen and (max-width: 800px) {
        width: 100%;

        img {
            width: 16%;
        }
    }
`;
let PricingContainer = styled.section`
    float: right;
    width: 22%;

    & > h1 {
        float: right;
        display: flex;
        align-items: center;
        height: 15%;
        font-size: 14px;
        color: red;
        text-decoration: line-through;
    }

    section {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        border: 1px solid rgb(30, 184, 30);
        margin-bottom: 10px;

        h1 {
            margin-left: 10px;
            font-weight: 700;
        }

        h2 {
            font-weight: 500;
            font-size: 13px;
        }
    }

    span {
        height: 100%;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 22px;
        font-weight: 500;
        background-color: rgb(30, 184, 30);
    }

    button {
        width: 100%;
        height: 40px;
        border: 1px solid rgb(30, 184, 30);
        color: rgb(21, 124, 21);
        font-size: 18px;
        font-weight: 200;
        transition: all 0.3s ease;
        background-color: white;
        margin-top: 10px;

        &:hover {
            background-color: rgb(30, 184, 30);
            color: white;
        }
    }

    @media only screen and (max-width: 800px) {
        width: 70%;
        align-self: center;
        margin-top: 20px;
        max-width: 300px;
    }
`;

export default class DisplayProducts extends React.Component {
    render() {
        let products = this.props.products;
        return products.map((product, index) => {
            return (
                <ProductContainer key={index}>
                    <DescriptionContainer>
                        <img src={product.productImage} alt='' />
                        <div>
                            <h1>{product.productTitle}</h1>
                            <p>{product.productDescription}</p>
                        </div>
                    </DescriptionContainer>

                    <PricingContainer>
                        <section>
                            <span>$</span>
                            <h1>{product.productPrice.toFixed(2)}&#160;</h1>
                            /
                        {product.productPriceEach ?
                                <h2>&#160;${product.productPriceEach} each</h2>
                                :
                                <h2>&#160;each</h2>}
                        </section>
                        <h1>${product.productSavings}</h1>
                        <button onClick={() => this.props.addToCart(product)}>ADD TO CART</button>
                    </PricingContainer>
                </ProductContainer>
            )
        })
    }
}