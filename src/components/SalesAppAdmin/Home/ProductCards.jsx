import { parse } from "postcss";
import React from "react";

const ProductCards = ({ product }) => {
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  return (
    <div className=" border-solid border-2 rounded-lg p-4 gap-2 border-gray-200 shadow-xl grid grid-cols-1 justify-items-center text-center">
      <div className="h-14 flex items-center ">
        <h4>{product?.product?.productName}</h4>
      </div>
      <div className="w-full h-0.5 bg-zinc-400"></div>

      <div className="h-64  flex items-center justify-center">
        <img
          src={product?.product?.productImage ? apiUrl + "/" + product?.product?.productImage : "/placeholder.png"}
          alt="productImage"
          className="h-full object-contain"
        />
      </div>
      <div className="w-full h-0.5 bg-zinc-400"></div>

      <p>{product?.product?.productDesc}</p>
      <div className="flex justify-center gap-2 items-center">
        <svg className="h-5 fill-gray-600 dark:fill-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M24 32C10.7 32 0 42.7 0 56L0 456c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24L64 56c0-13.3-10.7-24-24-24L24 32zm88 0c-8.8 0-16 7.2-16 16l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16zm72 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0zm96 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0zM448 56l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0c-13.3 0-24 10.7-24 24zm-64-8l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16s-16 7.2-16 16z" />
        </svg>
        <p>{product?.product?.productBarcode}</p>
      </div>
      <h5 className="line-through	decoration-2">
        Cena: {parseFloat(product?.product?.regularPrice).toLocaleString("sr-Latn-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RSD
      </h5>

      <h5>
        Akcijska cena:{" "}
        <span className="text-rose-600">
          {parseFloat(product?.salePrice).toLocaleString("sr-Latn-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RSD
        </span>
      </h5>
    </div>
  );
};

export default ProductCards;
