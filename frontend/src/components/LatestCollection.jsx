import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title } from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {

    const {products} = useContext(ShopContext);
    const [latestProducts , setLatestProducts] = useState([]);
    
    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[])
    // console.log(latestProducts);
    
  return (
    <div className='my-10'>
    <div className='text-center py-8 text-3xl'>
    <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className=' w-full m-auto-xs sm:text-sm md:text-base text-gray-600 '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, officiis?
        </p>
    </div>
        {/* Rendring products*/}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-col5 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index)=>{
                  return  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                })
            }
        </div>

    </div>
  )
}

export default LatestCollection