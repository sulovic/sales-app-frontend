import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { SalesAdminDashboardLinks } from "../../config/config";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import ModalNewSale from "../../components/SalesAppAdmin/Sales/ModalNewSale";
import { format } from "date-fns";

const Sales = () => {
  const [salesData, setSalesData] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalNewSale, setShowModalNewSale] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useAuth();
  const tableHeaders = ["Početak akcije", "Kraj Ackije", "Aktivna", "Proizvodi", "Izmeni", "Obiriši"];

  const fetchSales = async () => {
    try {
      setShowSpinner(true);
      const salesResponse = await axiosPrivate.get("/api/sales");
      setSalesData(salesResponse?.data);
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleDelete = (sale) => {
    setSelectedSale(sale);
    setShowModalDelete(true);
  };

  const handleDeleteOK = async () => {
    try {
      setShowSpinner(true);
      const deleteSaleRespose = await axiosPrivate.delete(`/api/sales/${selectedSale?.saleId}`);
      toast.success(`Akcija je uspešno obrisana!`, {
        position: "top-center",
      });
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
      setShowModalDelete(false);
      setSelectedSale(null);
      fetchSales();
    }
  };

  const handleDeleteCancel = () => {
    setShowModalDelete(false);
    setSelectedSale(null);
  };

  return (
    <>
      <Navbar Links={SalesAdminDashboardLinks} />
      <div className="mx-2 md:mx-4">
        <h3 className="mt-4">Akcije</h3>
        <div className="flex justify-end px-3">
          <button type="button" className="button button-sky " aria-label="Dodaj proizvod" onClick={() => setShowModalNewSale(true)}>
            Nova akcija
          </button>
        </div>
      </div>

      {salesData ? (
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
                    {salesData.map((sale, index) => (
                      <tr key={index} className="border-b bg-white hover:!bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                        <td key={`startDate_${index}`}>{sale?.startDate && format(sale?.startDate, "dd.MM.yyyy")}</td>
                        <td key={`endDate_${index}`}>{sale?.endDate && format(sale?.endDate, "dd.MM.yyyy")}</td>
                        <td key={`active_${index}`}>{sale?.active ? "Da" : "Ne"}</td>
                        <td key={`products_${index}`}>Proizvodi</td>

                        <td key={`editSale_${index}`} className="text-center">
                          <button
                            type="button"
                            className="button button-sky"
                            aria-label="Edit"
                            disabled={authUser?.roleId < 1000}
                            onClick={() => console.log(sale)}
                          >
                            Izmeni
                          </button>
                        </td>
                        <td key={`deleteSale_${index}`} className="text-center">
                          <button
                            type="button"
                            className="button button-red"
                            aria-label="Delete"
                            disabled={authUser?.roleId < 5000}
                            onClick={() => handleDelete(sale)}
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
        !showSpinner && <div className="p-3">Nema podataka o akcijama...</div>
      )}

      {showSpinner && <Spinner />}
      {showModalNewSale && <ModalNewSale setShowModalNewSale={setShowModalNewSale} fetchSales={fetchSales} />}

      {showModalDelete && (
        <Modal
          onOK={handleDeleteOK}
          onCancel={handleDeleteCancel}
          title="Potvrda brisanja akcije"
          question={`Da li ste sigurni da zelite da obrišete akciju?`}
        />
      )}
    </>
  );
};

export default Sales;
