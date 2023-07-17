import React from 'react';
import './Checkout.css'
import Subtotal from "./Subtotal.js";
import CheckoutProduct from './CheckoutProduct'

import { useStateValue } from "./StateProvider";

function Checkout() {

    const [{ basket,user }, dispatch] = useStateValue();

  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img className='checkout__ad'
            src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492688_.jpg'
            alt='ads'
        ></img>

        <div>
          <h3>Hello, {user && user.email}</h3>
            <h2 className='checkout__title'>Your Shopping Basket</h2>
            {/* BasketItems */}
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

      <div className='checkout__right'>
             <Subtotal /> 
      </div>
    </div>
  )
}

export default Checkout;
