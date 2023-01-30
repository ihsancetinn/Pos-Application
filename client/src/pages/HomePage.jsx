import React,{  useState, useEffect } from "react";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";
import {  Spin } from 'antd';

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:5000/categories/get-all");
      const data = await res.json();
      data &&
        setCategories(
          data.map((item) => {
            return { ...item, value: item.title };
          })
        );
      try {
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <Header setSearch={setSearch}/>
     {products && categories ? (
       <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
       <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
         <Categories
           categories={categories}
           setCategories={setCategories}
           setFiltered={setFiltered}
           products={products}
           setProducts={setProducts}
         />
       </div>
       <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
         <Products
           categories={categories}
           filtered={filtered}
           products={products}
           setProducts={setProducts}
           search={search}
         />
       </div>
       <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
         <CartTotals />
       </div>
     </div>
     ): <Spin size="large"  style={{
      width: '100%' 
    }} className=" absolute top-1/2 h-screen w-screen flex  justify-center" direction="vertical" />}
    </>
  );
};

export default HomePage;
