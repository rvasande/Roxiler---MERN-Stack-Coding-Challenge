import React, { useState, useEffect } from "react";

const ProductsStatsScreen = () => {
 
    const [month, setMonth] = useState("03");
    const [stats, setStats] = useState([])

    const fetchProductsStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/products/stats/${month}`
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(`Error while fetching products`, error);
      }
    };

    useEffect(() => {
      fetchProductsStats();
    }, []);
    return <div>
        {/* {data} */}
        <h1>hhh</h1>
    </div>;
  };
  
export default ProductsStatsScreen;
