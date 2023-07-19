import React from 'react'
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct.js'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from './reducer';

function Order({ order }) {
    
    const [{ basket, user}, dispatch] = useStateValue();

  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>

      <p className='order__id'>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map(item => (
        <CheckoutProduct
            key={item.id}      // Make sure to include a unique key for each rendered component
            id={item.id}
            img={item.image}
            title={item.title}
            price={item.price}
            rating={item.rating}
            hidebutton
        />
      ))}
      <CurrencyFormat
        renderText = {(value) =>(
            <h4>Order Total: {value}</h4>
        )}
        decimalScale ={2}
        value={order.data.amount / 100}
        displayType = "text"
        thousandSeparator ={true}
        prefix={"₹"}
    ></CurrencyFormat>
    </div>
  )
}

export default Order
