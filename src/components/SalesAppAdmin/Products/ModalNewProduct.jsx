import React, { useState } from "react";
import Modal from "../../Modal";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAxiosPrivateFiles from "../../../hooks/useAxiosPrivateFiles";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";
import { allowedExtensions } from "../../../config/config";

const ModalNewProduct = ({ setShowModalNewProduct, fetchProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const axiosPrivateFiles = useAxiosPrivateFiles();
  const [newProductImageFile, setNewProductImageFile] = useState(null);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productDesc: "",
    productBarcode: "",
    regularPrice: "",
    productImage: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.id]: e.target.id === "regularPrice" ? parseFloat(e.target.value) : e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmitOk = async () => {
    try {
      setShowSpinner(true);
      let productData = {...newProduct};
      if (newProductImageFile) {
        const formData = new FormData();
        formData.append("file", newProductImageFile);
        const responseFileUpload = await axiosPrivateFiles.post("/api/uploads", formData);
        productData.productImage = responseFileUpload.data;
      }
      const responseAddedProduct = await axiosPrivate.post("/api/products", productData);
      if (responseAddedProduct) {
        toast.success(`Proizvod ${responseAddedProduct?.productName} je uspešno dodat!`, {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
      setShowModal(false);
      setNewProduct(null);
      setShowModalNewProduct(false);
      fetchProducts();
    }
  };

  const handleAddFiles = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9-_.]/g, "");

    const newFileName = `${crypto.randomUUID()}-${sanitizedFileName}`;

    const newFile = new File([file], newFileName, { type: file.type });

    setNewProductImageFile(newFile);
  };

  return (
    <div className="relative z-5">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <form className="flex min-h-full items-center justify-center p-4 text-center" onSubmit={(e) => handleSubmit(e)}>
          <div className="relative p-4 transform w-full max-w-3xl overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
            <div className="w-full sm:mt-0 py-4">
              {/* Modal Head */}
              <div className="text-left">
                <h4>Dodavanje novog proizvoda</h4>
                <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
                {/* Modal Body */}
                <div className="my-2">
                  <h5>Podaci o proizvodu:</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  <div>
                    <label htmlFor="productName">Naziv proizvoda</label>
                    <input
                      type="text"
                      id="productName"
                      aria-describedby="Naziv proizvoda"
                      value={newProduct?.productName}
                      onChange={handleChange}
                      maxLength={64}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="productDesc">Opis</label>
                    <textarea
                      id="productDesc"
                      aria-describedby="Opis proizoda"
                      value={newProduct?.productDesc}
                      onChange={handleChange}
                      maxLength={128}
                    />
                  </div>
                  <div>
                    <label htmlFor="productBarcode">Barcode</label>
                    <input
                      type="text"
                      id="productBarcode"
                      aria-describedby="Barcode"
                      value={newProduct?.productBarcode}
                      onChange={handleChange}
                      maxLength={64}
                    />
                  </div>
                  <div>
                    <label htmlFor="regularPrice">Cena</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      id="regularPrice"
                      aria-describedby="Cena"
                      value={newProduct?.regularPrice}
                      onChange={handleChange}
                      maxLength={16}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="productImage">Dodaj sliku</label>
                  <input type="file" onChange={handleAddFiles} id="productImage" accept={allowedExtensions} />
                </div>
              </div>
            </div>
            <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

            {/* Modal Buttons */}
            <div className="gap-2 flex flex-row-reverse">
              <button type="submit" className="button button-sky">
                OK
              </button>
              <button type="button" className="button button-gray" onClick={() => setShowModalNewProduct(false)}>
                Odustani
              </button>
            </div>
          </div>
        </form>
      </div>
      {showModal && (
        <Modal
          onOK={() => handleSubmitOk()}
          onCancel={() => setShowModal(false)}
          title="Potvrda dodavanje novog proizvoda"
          question={`Da li ste sigurni da zelite da dodate nov proizvod ${newProduct?.productName}?`}
        />
      )}
      {showSpinner && <Spinner />}
    </div>
  );
};

export default ModalNewProduct;
