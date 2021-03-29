import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity,price, key} = props.product;
    const style = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '150px'
    }
    return (
        <div style={style}>
            <h4 className="product-name">{name}</h4>
            <p>quantity: {quantity}</p>
            <p>Price: {price}</p>
            <br/>
            <button onClick={()=> props.removeItem(key)} className="btn">Remove</button>
        </div>
    );
};

export default ReviewItem;