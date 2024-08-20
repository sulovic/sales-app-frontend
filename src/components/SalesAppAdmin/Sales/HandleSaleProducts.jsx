import React, { useState, useEffect } from "react";
import Modal from "../../Modal";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";
import { useAuth } from "../../../Context/AuthContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const HandleSaleProducts = ({ id, setShowHandleSaleProducts }) => {
  const [saleProducts, setSaleProducts] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [newSaleProduct, setNewSaleProduct] = useState({ productId: "", salePrice: "", saleId: id });
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useAuth();

  const fetchSaleProducts = async () => {
    try {
      setShowSpinner(true);
      const saleProductsResponse = await axiosPrivate.get(`/api/saleProducts?saleId=${id}`);
      if (saleProductsResponse) {
        setSaleProducts(saleProductsResponse.data);
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        setSaleProducts([]);
      } else {
        toast.error(`Ups! Došlo je do greške: ${err}`, {
          position: "top-center",
        });
      }
    } finally {
      setShowSpinner(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setShowSpinner(true);
      const productsResponse = await axiosPrivate.get("/api/products");
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
    fetchSaleProducts();
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmitOk = async () => {
    setShowSpinner(true);
    try {
      await axiosPrivate.post("/api/saleProducts", newSaleProduct);
      toast.success(`Proizvod je uspešno dodat!`, {
        position: "top-center",
      })
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
      setShowModal(false);
      fetchSaleProducts();
      setNewSaleProduct({ productId: "", salePrice: "", saleId: id });
    }
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowModalDelete(true);
  };

 const handleDeleteOk = async () => {
  setShowSpinner(true);
    try {
      await axiosPrivate.delete(`/api/saleProducts/${selectedProduct?.spId}`);
      toast.success(`Proizvod je uspešno obrisan!`, {
        position: "top-center", 
      })
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
      setShowModalDelete(false);
      setSelectedProduct(null);
      fetchSaleProducts();
    }
  };


  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 overflow-y-auto">
        <div className="relative w-full max-w-6xl p-4 m-4 sm:p-8 transform overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800 text-left">
          <div className="w-full">
            {/* Modal Head */}

            <h3>Proizvodi na akciji</h3>
            <div className="my-4 h-0.5 bg-zinc-400"></div>

            {/* Modal Body */}
            <div className="grid grid-cols-1">
              <div className="overflow-x-auto">
                <table className=" my-4 w-full  text-center text-sm text-zinc-500 rtl:text-right  dark:text-zinc-400">
                  <thead className=" bg-zinc-200 uppercase text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
                    <tr>
                      <th className="px-2 py-3">Naziv proizvoda</th>
                      <th className="px-2 py-3">BarCode</th>
                      <th className="px-2 py-3">Cena</th>
                      <th className="px-2 py-3">Akcijska cena</th>
                      <th className="px-2 py-3">Obriši</th>
                    </tr>
                  </thead>
                  <tbody>
                    {saleProducts && saleProducts.length ? (
                      saleProducts.map((row, index) => (
                        <tr key={index} className="border-b bg-white text-center hover:!bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                          <td key={`productName_${index}`}>{row?.product?.productName}</td>
                          <td key={`productBarcode_${index}`}>{row?.product?.productBarcode}</td>
                          <td key={`regularPrice_${index}`}>
                            {row?.product?.regularPrice.toLocaleString("sr-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td key={`salePrice_${index}`}>{row?.salePrice.toLocaleString("sr-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td key={`delete_${index}`} className="text-center">
                            <button type="button" className="button button-red" aria-label="Delete" onClick={() => handleDelete(row)}>
                              Obriši
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b bg-white text-center hover:!bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                        <td colSpan={5}>{!showSpinner && `Nisu uneti proizvodi za ovu akciju...`}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="my-4 h-0.5 bg-zinc-400"></div>

              <h4>Dodaj nove proizvode: </h4>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 items-end gap-4 md:grid-cols-4">
                  <div className= "col-span-2">
                    <label htmlFor="productId">Naziv proizvoda</label>
                    <select
                      id="productId"
                      aria-describedby="Naziv proizvoda"
                      value={newSaleProduct?.productName}
                      onChange={(e) => setNewSaleProduct({ ...newSaleProduct, productId: parseInt(e.target.value) })}
                      required
                    >
                      <option value="">Odaberite proizvod</option>
                      {productsData?.length &&
                        productsData.map((product, index) => (
                          <option key={`proiz_${index}`} value={product?.productId}>
                            {product?.productName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="salePrice">Akcijska cena</label>
                    <input
                      min="0.01"
                      type="number"
                      step="0.01"
                      id="salePrice"
                      aria-describedby="salePrice"
                      value={newSaleProduct?.salePrice}
                      onChange={(e) => setNewSaleProduct({ ...newSaleProduct, salePrice: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="flex  w-full justify-end">
                    <button type="submit" className="button button-sky">
                      Dodaj
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* Modal Buttons */}
            <div className="my-4 h-0.5 bg-zinc-400"></div>

            <div className="flex flex-row-reverse gap-2">
              <button type="button" className="button button-gray" onClick={() => setShowHandleSaleProducts(false)}>
                Zatvori
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSpinner && <Spinner />}

      {showModal && (
        <Modal
          onOK={handleSubmitOk}
          onCancel={() => setShowModal(false)}
          title="Dodavanje proizvoda u akciju"
          question="Da li ste sigurni da zelite da dodate proizvod u akciju?"
        />
      )}

      {showModalDelete && (
        <Modal
          onOK={handleDeleteOk}
          onCancel={() => setShowModalDelete(false)}
          title="Obriši proizvod iz akcije"
          question={`Da li ste sigurni da zelite da obrišete proizvod ${selectedProduct?.product?.productName} iz akcije?`}
        />
      )}
    </>
  );
};

export default HandleSaleProducts;
