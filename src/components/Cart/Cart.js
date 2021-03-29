import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    // const quantity = Number(cart.find(pd=> pd.quantity));
    // const total = cart.reduce((total, prd)=> total+prd.price * quantity, 0);
    let total = 0;
    let productQuantity = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total= total + product.price * product.quantity || 1;
        productQuantity = productQuantity + product.quantity || 1;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;   
    }
    else if (total > 0) {
        shipping = 12.99;
    }
    const numFormat = num => {
        const formatNumber = num.toFixed(2);
        return Number(formatNumber);
    }
    const tax = numFormat(total/10);
    const grandTotal = numFormat(total+shipping+tax);
    return (
        <div className="cart">
            <h4>Order Summary</h4>
            <p>Items Ordered: {productQuantity}</p>
            <p><small>Product Price: {numFormat(total)}</small></p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Vat + Tax: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;