import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import ProductCards from "../components/SalesAppAdmin/Home/ProductCards";
import axios from "axios";

const Home = () => {
  const [productsData, setProductsData] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const date = new Date();
  const formattedDate = date.toISOString();

  const fetchProducts = async () => {
    try {
      setShowSpinner(true);
      const productsResponse = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/productsOnSale`);
      setProductsData(productsResponse?.data);
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full h-screen">
        <div className="flex flex-wrap bg-sky-400 p-1 align-middle text-center">
          <Link to="/" className="ps-2 flex  items-center">
            <img src={"/favicon.png"} alt="Logo" className="h-10" />
          </Link>
          <div className="px-4 flex  items-center">
            <h4 className="text-white">SALES APP</h4>
          </div>
          <div className="flex grow justify-center ">
            <h3 className="text-white">Proizvodi na akciji</h3>
          </div>
        </div>
        <div className="p-4">
          {productsData?.length ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
              {productsData?.map((product) => (
                <ProductCards key={product?.productId} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center align-middle">
              <h4>Žao nam je, trenutno nema proizvoda koji su na akciji...</h4>
            </div>
          )}
        </div>
      </div>
      {showSpinner && <Spinner />}
    </>
  );
};

export default Home;
