import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import ProductCards from "../components/SalesAppAdmin/Home/ProductCards";
import axios from "axios";

const Home = () => {
  const [productsData, setProductsData] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);


  const fetchProducts = async () => {
    try {
      setShowSpinner(true);
      const productsResponse = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/productsPublic`);
      setProductsData(productsResponse?.data);
      console.log(productsResponse?.data);
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
          <div className="w-screen">

      <h3 className="text-center my-4">Proizvodi na akciji</h3>
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 3xl:grid-cols-8 gap-4">

          {productsData?.map((product) => (
            <ProductCards key={product?.productId} product={product} />
          ))}

        </div>

      </div>
      </div>

      {showSpinner && <Spinner />}

    </>
  );
};

export default Home;
