import React from 'react';
import styles from './styles.css';
import Logo from '../../../Logo';

const StoreFrontHeader: React.FC = () => {
  return(
    <div className={styles.background}>
     <div className="flex-none w-8">
       Logo
     </div>
     <div className="flex-none w-4">
       <div className="flex">

       </div>
     </div>
    </div>
  )
}

export default StoreFrontHeader;