import React, {useState} from 'react'
import './Payment.css';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import { useStateValue } from "./StateProvider";
import { getBasketTotal } from './reducer';
import CheckoutProduct from './CheckoutProduct.js';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function Payment() {

    const [{ basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const handleSubmit = (e) => {
        //implement stripe
    }

    const handleChange = (event) => {
        //listen changes in card element and display any errors as customer types
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

  return (
    <div className='payment'>
      <div className='payment__container'>

        <h1>
            Checkout (<Link to="/checkout">{basket?.length} items 
            </Link>)
        </h1>
        {/* payment-section-delivery */}

        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment__address'>
                <p>{user && user.email}</p>
                <p>123 React Lane</p>
                <p>Mangaluru ,IND</p>
            </div>
        </div>

        {/* payment-section-basket */}

        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Review items and delivery</h3>
            </div>

            <div className='payment__items'>
                {basket.map(item => (
                <CheckoutProduct 
                    key={item.id}      // Make sure to include a unique key for each rendered component
                    id={item.id}
                    img={item.image}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                />
                ))}
            </div>
        </div>
        
        {/* payment-section-payment */}

        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Payment Method</h3>
            </div>

            <div className='payment__details'>
                {/* stripe */}
                 <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange}/>

                    <div className='payment__priceContainer'>
                        <CurrencyFormat
                            renderText = {(value) =>(
                                <h4>Order Total: {value}</h4>
                            )}
                            decimalScale ={2}
                            value={getBasketTotal(basket)}
                            displayType = "text"
                            thousandSeparator ={true}
                            prefix={"₹"}
                        ></CurrencyFormat>
                    </div>
                 </form>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Payment
