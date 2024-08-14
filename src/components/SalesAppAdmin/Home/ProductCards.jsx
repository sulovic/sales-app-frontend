import { parse } from "postcss";
import React from "react";

const ProductCards = ({ product }) => {
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  return (
    <div className=" border-solid border-2 rounded-lg p-4 gap-2 border-gray-200 shadow-xl grid grid-cols-1 justify-items-center text-center">
      <div className="h-14 flex items-center ">
        <h4>{product?.productName}</h4>
      </div>
      <div className="w-full h-0.5 bg-zinc-400"></div>

      <div className="h-64 md:h-96 flex items-center justify-center">
        <img src={product?.productImage ? apiUrl + "/" + product?.productImage : "/placeholder.png"} alt="productImage" className="h-full object-contain" />
      </div>
      <div className="w-full h-0.5 bg-zinc-400"></div>

      <p>{product?.productDesc}</p>
      <p>BC: {product?.productBarcode}</p>
      <h5>Cena: {parseFloat(product?.regularPrice).toLocaleString("sr-Latn-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RSD</h5>
    </div>
  );
};

export default ProductCards;
