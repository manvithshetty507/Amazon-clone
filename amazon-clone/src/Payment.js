import React, { createContext, useEffect, useState } from "react";
import './Payment.css';
import { Link, Navigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import { useStateValue } from "./StateProvider";
import { getBasketTotal } from './reducer';
import CheckoutProduct from './CheckoutProduct.js';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase.js';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from './axios';

function Payment() {

    const [{ basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret ] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(""); 

    useEffect(() => {
        //generate stripe secrete which allows us to charrge, whenever basket change secrete also changes

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payment/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket]);

    

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        console.log(CardElement);
        
        const payload = stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
              },
              receipt_email: 'manvithshetty18@gmail.com', // Add the customer's email address
              
          }).then((result) => {
            if (result.error) {
              // Handle error case
              setError(result.error.message);
              setProcessing(false);
              setSucceeded(false);
            } else {
                const paymentIntent = result.paymentIntent;

                // Store order details in the database
                db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });

                setSucceeded(true);
                setError(null);
                setProcessing(false);
                // Dispatch action, navigate, etc.
                dispatch({
                    type: 'EMPTY_BASKET',
                });
                navigate('/orders');
            }
          }).catch((error) => {
            // Handle error case
            setError(error.message);
            setProcessing(false);
            setSucceeded(false);
          });
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
                        <button disabled={processing || disabled || succeeded}>
                            <span>{processing ? <p>Processing</p> : <p>Buy Now</p>}</span>
                        </button>
                    </div>
                    {/* errors */}
                    {error && <div>{error}</div>}
                 </form>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Payment
