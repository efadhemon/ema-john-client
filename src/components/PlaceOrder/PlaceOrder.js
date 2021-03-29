import React from 'react';
import happyImage from '../../images/giphy.gif';

const PlaceOrder = () => {
    const style = {
        textAlign: 'center',
        marginTop: '20px'
    }
    return (
        <div style={style}>
            <img src={happyImage} alt=""/>
        </div>
    );
};

export default PlaceOrder;