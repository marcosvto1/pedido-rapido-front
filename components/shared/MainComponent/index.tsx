import React from 'react';
import Header from '../Header/StoreFrontHeader';

const MainComponent: React.FC = ({ children }) => {
  return(
    <div className="flex stick-footer-wrapper">
      <Header />
      <div class="container flex">
      { children }
      </div>
      Footer     
    </div>
  )
}

export default MainComponent;