import React, { useState } from "react";
import Modal from "../../Modal";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";

const ModalEditUser = ({ setShowModalEditUser, fetchUsers, selectedUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [editedUser, setEditedUser] = useState(selectedUser);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.id]: e.target.id==="roleId" ? parseInt(e.target.value) : e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmitOk = async () => {
    try {
      setShowSpinner(true);
      const responseEditUser = await axiosPrivate.put(`/api/users/${editedUser?.userId}`, editedUser);
      if (responseEditUser) {
        toast.success(`Korisnik ${editedUser.firstName + " " + editedUser.lastName} je uspešno izmenjen!`, {
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
      setShowModal(false);
      setShowModalEditUser(false);
      fetchUsers();
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
              <div className="text-left">
                <h4>Dodavanje novog korisnika</h4>
                <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
                {/* Modal Body */}
                <div className="my-2">
                  <h5>Podaci o korisniku:</h5>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="mb-3">
                    <label htmlFor="firstName">Ime</label>
                    <input type="text" id="firstName" aria-describedby="Ime" value={editedUser?.firstName} onChange={handleChange} maxLength={64} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName">Prezime</label>
                    <input type="text" id="lastName" aria-describedby="Prezime" value={editedUser?.lastName} onChange={handleChange} maxLength={64} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" aria-describedby="Email" value={editedUser?.email} onChange={handleChange} maxLength={64} required />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="roleId">Ovlašćenja korisnika</label>
                    <select id="roleId" aria-label="Odaberite ovlašćenja korisnika" required value={editedUser?.roleId} onChange={handleChange}>
                      <option value={1001}>BASE</option>
                      <option value={3001}>POWER</option>
                      <option value={5001}>ADMIN</option>
                    </select>
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
              <button type="button" className="button button-gray" onClick={() => setShowModalEditUser(false)}>
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
          title="Potvrda dodavanje novog korisnika"
          question={`Da li ste sigurni da zelite da izmenite postojećeg korisnika ${editedUser?.firstName + " " + editedUser?.lastName}?`}
        />
      )}
      {showSpinner && <Spinner />}
    </div>
  );
};

export default ModalEditUser;
