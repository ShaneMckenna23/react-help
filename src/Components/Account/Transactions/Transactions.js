import React from 'react';
import {purchasedProducts} from '../../../Purchases';
import {allProducts} from '../../../Products';
import './Transactions.css';

class Transactions extends React.Component {
    constructor(props) {
        super();

        this.state = {
            productsByCategory: [],
            productsToDisplay: [],
            category: props.match.params.category
        }
    }

    componentDidMount() {
        this.updateCategory();
    }

    updateCategory = () => {
        let productsByCategory = [];
        if (this.props.match.params.category !== 'all') {
            productsByCategory = purchasedProducts.filter(product => {
                return product
                    .productStatus
                    .toLowerCase() === this.props.match.params.category
            })
        } else {
            productsByCategory = purchasedProducts;
        }

        this.setState({productsByCategory})

        let productsToDisplay = productsByCategory.slice();

        for (let i = 0; i < productsByCategory.length; i++) {
            productsToDisplay[i].productInfo = allProducts.filter(product => {
                return product.productNumber === productsToDisplay[i].productNumber
            })
        }
        this.setState({productsToDisplay})
    }


    render() {
        return (
            <div
                style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div className='category_bar_container'>
                        <section onClick={() => this.setState({category: 'Redeemable'})} className='change_category_button'>
                            <img
                                src='https://www.jinnah.edu/wp-content/uploads/2016/12/certificate-flat.png'
                                alt=''/>
                            <h1>Redeemable</h1>
                        </section>

                        <section onClick={() => this.setState({category: 'Redeemed'})} className='change_category_button'>
                            <img
                                src='https://images.vexels.com/media/users/3/135116/isolated/lists/e4f239d23ddc87321c65a604b45a82c8-file-document-sign-with-round-background.png'
                                alt=''/>
                            <h1>Redeemed</h1>
                        </section>

                        <section
                            style={{
                            backgroundColor: 'rgb(79, 132, 153)'
                        }} onClick={() => this.setState({category: 'All'})} className='change_category_button'>
                            <img
                                src='http://free-icon-rainbow.com/i/icon_00456/icon_004560_256.png'
                                alt=''/>
                            <h1>All</h1>
                        </section>
                </div>
                <div className='all_products_container'>
                    {this.mapProductsToDisplay(this.state.category)}
                </div>
            </div>
        )
    }

    mapProductsToDisplay = (category) => {
        return this
            .state
            .productsToDisplay
            .map((product, index) => {
                let color = 'lime'
                if (product.productStatus === 'Redeemed') 
                    color = 'lightcoral'
                return (
                    <section
                        key={index}
                        className='product_container'
                        style={{
                        borderLeft: '4px solid ' + color
                    }}>
                        <img src={product.productInfo[0].productImage} alt=''/>
                        <section className='product_information'>
                            <h2>{product.productInfo[0].productTitle}</h2>
                            <br/> {product.productStatus === 'Redeemable'
                                ? <section>{product.productInfo[0].productDescription}</section>
                                : <ul>
                                    <li>
                                        {product.redeemedBy}
                                    </li>
                                    <li>
                                        {product.dateRedeemed}
                                    </li>
                                    <li>
                                        {product.redeemLocation}
                                    </li>
                                </ul>}
                        </section>
                        <section className='product_pricing'>
                            <h1 className='current_price'>{product.productInfo[0].productPrice}</h1>
                            <h1 className='old_price'>{product.productInfo[0].productOldPrice}</h1>
                            {product.productStatus === 'Redeemable'
                                ? <button className='add_to_cart landing_button'>
                                        Redeem
                                    </button>
                                : <button className='remove_from_cart landing_button'>
                                    Details
                                </button>}
                        </section>
                    </section>
                )
            })
    }
}

export default Transactions;