
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const savedCart = getDatabaseCart();

    const onSubmit = data => {
      const orderDetails = {...loggedInUser, products: savedCart, Shipment: data, orderTime: new Date()}
      fetch('https://secure-brook-83268.herokuapp.com/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('Your order placed successful')
        }
      })
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{textAlign: 'center', marginTop: '50px'}}>

        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
        <br/>
        <br/>
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
        <br/>
        <br/>
        <input name="address" placeholder="Your Address" ref={register({ required: true })} />
        <br/>
        <br/>
        <input name="phone_number" placeholder="Your Phone Number" ref={register({ required: true })} />
        <br/>
        <br/>
        {errors.exampleRequired && <span>This field is required</span>}
        <br/>
        <input type="submit" />
      </form>
    );
};

export default Shipment;