import React from 'react';
import FuelPriceImg from '../image/phone.svg';
import { useGlobalContext } from './context';
import '../styles/background.css'

const Background = () => {
  const { closeSubmenu } = useGlobalContext();
  return (
    <section className='background' onMouseOver={closeSubmenu}>
      <div className='background-center'>
        <article className='background-info'>
          <h1>
            American Fuel for <br />
            Global Markets
          </h1>
          <p>
            Millions of companies of all sizes—from startups to 
              Fortune 500s—use our software to view fuel price, 
              make an order, and manage their businesses 
              online.
          </p>
          {/* <button className='btn'>Start now</button> */}
        </article>
        <article className='background-images'>
          <img src={FuelPriceImg} className='phone-img' alt='phone' />
        </article>
      </div>
    </section>
  );
};

export default Background;
