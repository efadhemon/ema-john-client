
import React from 'react';

const Inventory = () => {

    const product = {};

    const handleAddProduct = () => {
        fetch('https://secure-brook-83268.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <form action="">
            <p><span>Name: </span><input type="text"/></p>
            <p><span>Price: </span><input type="text"/></p>
            <p><span>Quantity: </span><input type="text"/></p>
            <p><span>Image: </span><input type="file"/></p>
            <p><input type="submit" value="add product"/></p>
        </form>
    );
};

export default Inventory;