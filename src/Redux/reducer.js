import {allProducts} from '../Products';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
    isLoggedIn: false,
    checkoutPrompt: false,
    productsToDisplay: allProducts[0]
}

const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const CLEAR_CART = 'CLEAR_CART';
const UPDATE_LOGGED_IN_STATUS = 'UPDATE_LOGGED_IN_STATUS';
const PROMPT_LOGGED_IN = 'PROMPT_LOGGED_IN';
const UPDATE_PRODUCTS_TO_DISPLAY = 'UPDATE_PRODUCTS_TO_DISPLAY';

export function updateCartItems(item) {
    return { type: UPDATE_CART_ITEMS, payload: item }
}

export function removeCartItem(index) {
    return { type: REMOVE_CART_ITEM, payload: index }
}

export function clearCart() {
    return { type: CLEAR_CART }
}

export function updateLoggedInStatus(status) {
    return { type: UPDATE_LOGGED_IN_STATUS, payload: status }
}

export function disableCheckoutPrompt() {
    return { type: PROMPT_LOGGED_IN }
}

export function updateProductsToDisplay(products) {
    return { type: UPDATE_PRODUCTS_TO_DISPLAY, payload: products }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CART_ITEMS:
            return Object.assign({}, state, {
                cartItems: [
                    ...state.cartItems,
                    action.payload
                ]
            })
        case REMOVE_CART_ITEM:
            return Object.assign({}, state, {
                cartItems: [
                    ...state.cartItems.slice(0, action.payload),
                    ...state.cartItems.slice(action.payload + 1)
                ]
            })
        case CLEAR_CART:
            return Object.assign({}, state, { cartItems: [] })
        case UPDATE_LOGGED_IN_STATUS:
            return Object.assign({}, state, { isLoggedIn: action.payload })
        case PROMPT_LOGGED_IN:
            return Object.assign({}, state, { checkoutPrompt: true })
        case UPDATE_PRODUCTS_TO_DISPLAY:
            return Object.assign({}, state, { productsToDisplay: action.payload })
        default:
            return state;
    }
}