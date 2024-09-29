import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { Title } from "../components/Title";
import ProductItem from "../components/ProductItem";

function collection() {
  const { products ,search , showSearch } = useContext(ShopContext); 
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category , setCategory] = useState([]);
  const [subCategory , setSubCategory] = useState([]);
  const [sortType , setSortType] = useState('relavent');
  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(category.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev=>[...prev , e.target.value]);
    }
  }

  const toggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(subCategory.filter(item => item !== e.target.value));
    }else{
      setSubCategory(prev=>[...prev , e.target.value]);
    }
  }

  
  
  const applyfilter = ()=>{
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length > 0){
      productsCopy = productsCopy.filter((item)=>category.includes(item.category));

    }
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter((item)=>subCategory.includes(item.subCategory));
      
    }
    setFilterProducts(productsCopy);
  }
  
  const sortProduct = ()=>{
    let fpCopy = products.slice();
       switch(sortType){
           case 'low-high':
           setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
           break;
           case 'high-low':
           setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
           break;
           default:
           setFilterProducts(fpCopy);
       }
  }
  useEffect(()=>{
    applyfilter();
  },[category,subCategory,search ,showSearch])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Option */}

      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* Catogery Filter */}

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium"> CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2 ">
              <input className="w-3 cursor-pointer" id="Men" type="checkbox"  onChange={toggleCategory} value={"Men"} />
              <label htmlFor="Men">Man</label>
            </p>
            <p className="flex gap-2  ">
              <input type="checkbox" id="Women" className="w-3 cursor-pointer" onChange={toggleCategory} value={"Women"} />
              <label htmlFor="Women">Women</label>
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3  cursor-pointer"  id="Kids" onChange={toggleCategory} value={"Kids"} /> 
              <label htmlFor="Kids">Kids</label>
            </p>
          </div>
        </div>

        {/* subCatogety filter */}

        <div
          className={`border border-gray-300 pl-5 py-5 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium"> TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2  cursor-pointer">
              <input className="w-3 cursor-pointer" type="checkbox" id="Topwear"  onChange={toggleSubCategory}  value={"Topwear"} />{" "}
              <label htmlFor="Topwear">Topwear</label>
            </p>
            <p className="flex gap-2 cursor-pointer">
              <input type="checkbox" className="w-3 cursor-pointer" id="Bottomwear" onChange={toggleSubCategory}   value={"Bottomwear"} />{" "}
              <label htmlFor="Bottomwear">Bottomwear</label>
            </p>
            <p className="flex gap-2 cursor-pointer">
              <input type="checkbox" className="w-3 cursor-pointer" id="Winterwear" onChange={toggleSubCategory}   value={"Winterwear"} />{" "}
              <label htmlFor="Winterwear">Winterwear</label>
              
            </p>
          </div>
        </div>
      </div>

      {/*Right Side */}

      <div className="flex-1 ">
            <div className="flex justify-between text-base sm:text-2xl mb-4" >
              <Title text1={'ALL'} text2={"COLLECTION"}/>
              {/** Product sort */}
              <select onChange={(e)=>setSortType(e.target.value)}  className="border-2 border-gray-300 text-sm px-2 sm:p-0 md:p-0 lg:p-0">
                <option value="relavent">Sort by: Relavent</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
            {/** Map products */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {
              filterProducts.map((item,index)=>{
                return(<ProductItem key={index} name={item.name} id={item._id} image={item.image} price={item.price}/>)
              })
          }
            </div>
            
      </div>
    </div>
  );
}

export default collection;
