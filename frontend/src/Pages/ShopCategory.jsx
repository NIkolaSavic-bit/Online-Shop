import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
const ShopCategory = () => {
    const {all_product} = useContext(ShopContext); 
  return (
    <div className='shop-category'>
      
    </div>
  )
}

export default ShopCategory
