import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('https://secure-brook-83268.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://secure-brook-83268.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])

    const handleAddProduct   // console.log('Added', product);
        = (product) => {
            const toBeAdded = product.key;
            const sameProduct = cart.find(pd => pd.key === toBeAdded);
            let count = 1;
            let newCart;
            if (sameProduct) {
                count = sameProduct.quantity + 1;
                sameProduct.quantity = count;
                const otherProduct = cart.filter(pd => pd.key !== toBeAdded);
                newCart = [...otherProduct, sameProduct];
            }
            else {
                product.quantity = 1;
                newCart = [...cart, product];
            }
            setCart(newCart)
            addToDatabaseCart(product.key, count)
        }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product showAddToCart={true} handleAddProduct={handleAddProduct} product={product} key={product.key}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className="btn">Review order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;