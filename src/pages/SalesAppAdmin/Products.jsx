import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { SalesAdminDashboardLinks } from "../../config/config";
import ModalNewProduct from "../../components/SalesAppAdmin/Products/ModalNewProduct";
import ModalEditProduct from "../../components/SalesAppAdmin/Products/ModalEditProduct";

const Products = () => {
  const [productsData, setProductsData] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModalNewProduct, setShowModalNewProduct] = useState(false);
  const [showModalEditProduct, setShowModalEditProduct] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useAuth();
  const tableHeaders = ["Proizvod", "Opis", "Barcode", "Cena", "Slika", "Izmeni", "Obriši"];
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

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
    fetchProducts();
  }, []);

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowModalDelete(true);
  };

  const handleDeleteOK = async () => {
    try {
      setShowSpinner(true);
      const deleteProductRespose = await axiosPrivate.delete(`/api/products/${selectedProduct?.productId}`);
      if (selectedProduct?.productImage.length > 0) {
        await axiosPrivate.delete(`/api/uploads/${selectedProduct?.productImage}`);
      }
      toast.success(`Proizvod ${deleteProductRespose?.data?.productName} je uspešno obrisan!`, {
        position: "top-center",
      });
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
      setShowModalDelete(false);
      fetchProducts();
    }
  };

  const handleDeleteCancel = () => {
    setSelectedProduct(null);
    setShowModalDelete(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModalEditProduct(true);
  };

  return (
    <>
      <Navbar Links={SalesAdminDashboardLinks} />
      <div className="mx-2 md:mx-4">
        <h3 className="mt-4">Proizvodi</h3>
        <div className="flex justify-end px-3">
          <button type="button" className="button button-sky " aria-label="Dodaj proizvod" onClick={() => setShowModalNewProduct(true)}>
            Dodaj proizvod
          </button>
        </div>

        {productsData ? (
          <>
            {/* Render main data DIV */}
            <div>
              <div className="relative my-4 overflow-x-auto shadow-lg sm:rounded-lg">
                <div className="table-responsive p-3">
                  <table className="w-full text-center text-sm text-zinc-500 rtl:text-right dark:text-zinc-400 ">
                    <thead className=" bg-zinc-200 uppercase text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
                      <tr>
                        {tableHeaders.map((tableKey, index) => (
                          <th className="px-6 py-3" key={index}>
                            {tableKey}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {productsData.map((product, index) => (
                        <tr key={index} className="border-b bg-white hover:!bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                          <td key={`productName${index}`}>{product?.productName}</td>
                          <td key={`productDescription_${index}`}>{product?.productDesc}</td>
                          <td key={`productBarcode_${index}`}>{product?.productBarcode}</td>
                          <td key={`regularPrice_${index}`}>{product?.regularPrice.toLocaleString("sr-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td key={`productImage_${index}`} className="flex justify-center">
                            <img src={product?.productImage ? apiUrl + "/" + product?.productImage : "/placeholder.png"} alt="productImage" className="h-16" />
                          </td>

                          <td key={`edit_${index}`} className="text-center">
                            <button type="button" className="button button-sky" aria-label="Edit" onClick={() => handleEditProduct(product)}>
                              Izmeni
                            </button>
                          </td>
                          <td key={`delete_${index}`} className="text-center">
                            <button
                              type="button"
                              className="button button-red"
                              aria-label="Delete"
                              disabled={authUser?.roleId < 5000}
                              onClick={() => handleDelete(product)}
                            >
                              Obriši
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Modal and Spinner component */}
                </div>
              </div>
            </div>
          </>
        ) : (
          !showSpinner && <div className="p-3">Nema podataka o proizvodima...</div>
        )}
      </div>
      {showSpinner && <Spinner />}
      {showModalNewProduct && <ModalNewProduct setShowModalNewProduct={setShowModalNewProduct} fetchProducts={fetchProducts} />}
      {showModalEditProduct && (
        <ModalEditProduct setShowModalEditProduct={setShowModalEditProduct} fetchProducts={fetchProducts} selectedProduct={selectedProduct} />
      )}
      {showModalDelete && (
        <Modal
          onOK={handleDeleteOK}
          onCancel={handleDeleteCancel}
          title="Potvrda brisanja proizvoda"
          question={`Da li ste sigurni da zelite da obrišete proizvod ${selectedProduct?.productName}?`}
        />
      )}
    </>
  );
};

export default Products;
