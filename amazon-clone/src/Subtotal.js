import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from "react-router-dom"

function Subtotal() {

  
    const navigate = useNavigate();
    const [{ basket ,user }, dispatch] = useStateValue();
    
  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        prefix={"₹"}
      />
      <button onClick={e => user?navigate('/payment'):alert("please Log in")}>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal
