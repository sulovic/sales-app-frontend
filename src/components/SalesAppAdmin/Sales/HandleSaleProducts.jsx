import React, { useState } from "react";
import Modal from "../../Modal";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";
import { useAuth } from "../../../Context/AuthContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const HandleSaleProducts = ({ id, setShowSaleProducts }) => {
  const [saleProducts, setSaleProducts] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
const axiosPrivate = useAxiosPrivate();

const { authUser } = useAuth();

const fetchSaleProducts = async () => {
  try {
    setShowSpinner(true);
    const saleProductsResponse = await axiosPrivate.get(`/api/saleProducts/${id}`);
    if (response) {
      setSaleProducts(saleProductsResponse.data);
    }
  } catch (err) {
    toast.error(`Ups! Došlo je do greške: ${err}`, {
      position: "top-center",
    });
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



  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 overflow-y-auto">
      <div className="relative w-full max-w-md p-4 sm:p-8 transform overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800 text-left">
        <div className="w-full">
          {/* Modal Head */}

          <h3>Proizvodi na akciji</h3>
          <div className="my-4 h-0.5 bg-zinc-400"></div>

          {/* Modal Body */}
          <div className="grid grid-cols-1">
            <div className=" overflow-x-auto">
              <table className=" mt-4 w-full   text-center text-sm text-zinc-500 rtl:text-right  dark:text-zinc-400">
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
                  {editedSaleProducts ? (
                    editedSaleProducts.map((row, index) => (
                      <tr key={index} className="border-b bg-white text-center hover:!bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                        <td key={`proizvod_${index}`}>{row?.proizvod?.naziv}</td>
                        <td key={`sku_${index}`}>{row?.proizvod?.SKU}</td>
                        <td key={`kolicina_${index}`}>{row?.kolicina}</td>
                        <td key={`cena_${index}`}>{row?.cena}</td>
                        <td key={`vrednost_${index}`}>{(row?.kolicina * row?.cena).toFixed(2)}</td>
                        <td key={`delete_${index}`} className="text-center">
                          <button type="button" className="button button-red" aria-label="Delete" onClick={() => handleDelete(row)}>
                            Obriši
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b bg-white text-center hover:!bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                      <td colSpan={6}>Nije unet sadržaj za ovu porudžbinu...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="my-4 h-0.5 bg-zinc-400"></div>

            <h4>Dodaj nove proizvode: </h4>
            {/* <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 items-end gap-4 md:grid-cols-4">
                <div>
                  <label htmlFor="proizvodId">Naziv proizvoda</label>
                  <select id="proizvodId" aria-describedby="Naziv proizvoda" value={newProizvod?.proizvodId} onChange={handleChange} required>
                    <option value="">Odaberite proizvod</option>
                    {proizvodi?.length &&
                      proizvodi.map((proiz, index) => (
                        <option key={`proiz_${index}`} value={proiz?.id}>
                          {proiz?.SKU} - {proiz?.naziv}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="kolicina">Količina</label>
                  <input
                    min="1"
                    type="number"
                    step="1"
                    id="kolicina"
                    aria-describedby="Kolicina proizvoda"
                    value={newProizvod?.kolicina}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cena">Cena</label>
                  <input min="0.001" type="number" step="0.001" id="cena" aria-describedby="Cena" value={newProizvod?.cena} onChange={handleChange} required />
                </div>
                <div className="flex w-full justify-end">
                  <button type="submit" className="button button-sky">
                    Dodaj
                  </button>
                </div>
              </div>
            </form> */}
          </div>
          {/* Modal Buttons */}
          <div className="my-4 h-0.5 bg-zinc-400"></div>

          <div className="flex flex-row-reverse gap-2">
            <button type="button" className="button button-gray" onClick={handleCancel}>
              Zatvori
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleSaleProducts;
