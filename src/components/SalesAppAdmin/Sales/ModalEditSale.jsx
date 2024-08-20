import React, { useState } from "react";
import Modal from "../../Modal";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "./ToggleSwitch.css";

const ModalEditSale = ({ setShowModalEditSale, fetchSales, selectedSale }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [editedSale, setEditedSale] = useState(selectedSale);
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmitOk = async () => {
    try {
      setShowSpinner(true);
      const responseAddedSale = await axiosPrivate.put(`api/sales/${editedSale?.saleId}`, editedSale);
      if (responseAddedSale) {
        toast.success(`Akcija je uspešno izmenjena!`, {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
      setShowModalEditSale(false);
      fetchSales();
    }
  };

  return (
    <div className="relative z-5">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <form className="flex min-h-full items-center justify-center p-4 text-center" onSubmit={(e) => handleSubmit(e)}>
          <div className="relative p-4 transform w-full max-w-3xl overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
            <div className="w-full sm:mt-0 py-4">
              {/* Modal Head */}
              <div className="text-left min-h-96">
                <h4>Kreiranje nove akcije</h4>
                <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
                {/* Modal Body */}
                <div className="my-2">
                  <h5>Podaci o akciji:</h5>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                  <div>
                    <label htmlFor="productName">Početak akcije</label>
                    <div>
                      <DatePicker
                        id="startDate"
                        locale="sr-Latn"
                        autoComplete="off"
                        selected={editedSale?.startDate}
                        maxDate={editedSale?.endDate}
                        onChange={(date) =>
                          setEditedSale((prev) => ({
                            ...prev,
                            startDate: date,
                          }))
                        }
                        dateFormat="dd - MM - yyyy"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="endDate">Kraj akcije</label>
                    <div>
                      <DatePicker
                        id="endDate"
                        locale="sr-Latn"
                        autoComplete="off"
                        selected={editedSale?.endDate}
                        minDate={editedSale?.startDate}
                        onChange={(date) =>
                          setEditedSale((prev) => ({
                            ...prev,
                            endDate: date,
                          }))
                        }
                        dateFormat="dd - MM - yyyy"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <label htmlFor="active">Aktiviraj akciju</label>
                  <div className="flex justify-start mt-4">
                    <label className="switch">
                      <input
                        checked={editedSale.active}
                        onChange={(e) => setEditedSale((prev) => ({ ...prev, active: e.target.checked }))}
                        className="switch-input"
                        type="checkbox"
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

            {/* Modal Buttons */}
            <div className="gap-2 flex flex-row-reverse">
              <button type="submit" className="button button-sky">
                OK
              </button>
              <button type="button" className="button button-gray" onClick={() => setShowModalEditSale(false)}>
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
          title="Potvrda kreiranja nove akcije"
          question={`Da li ste sigurni da zelite da izmenite ovu akciju?`}
        />
      )}
      {showSpinner && <Spinner />}
    </div>
  );
};

export default ModalEditSale;
