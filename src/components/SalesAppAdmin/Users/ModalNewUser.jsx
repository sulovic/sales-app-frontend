import React, { useState } from "react";
import Modal from "../../Modal";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";

const ModalNewUser = ({ setShowModalNewUser, fetchUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roleId: 1001,
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.id==="roleId" ? parseInt(e.target.value) : e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmitOk = async () => {
    try {
      setShowSpinner(true);
      const responseAddUser = await axiosPrivate.post("/api/users", newUser);
      if (responseAddUser) {
        toast.success(`Korisnik ${newUser.firstName + " " + newUser.lastName} je uspešno dodat!`, {
          position: "top-center",
        });
      }
    } catch (err) {
      if (err?.response?.status === 409) {
        toast.error(
          <div>
            Korisnik nije dodat! <br /> Korisnik sa ovim podacima već postoji
          </div>,
          {
            position: "top-center",
          }
        );
      } else {
        toast.error(`Ups! Došlo je do greške: ${err}`, {
          position: "top-center",
        });
      }
    } finally {
      setShowSpinner(false);
      setShowModal(false);
      setShowModalNewUser(false);
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div >
                    <label htmlFor="firstName">Ime</label>
                    <input type="text" id="firstName" aria-describedby="Ime" value={newUser?.firstName} onChange={handleChange} maxLength={64} required />
                  </div>
                  <div >
                    <label htmlFor="lastName">Prezime</label>
                    <input type="text" id="lastName" aria-describedby="Prezime" value={newUser?.lastName} onChange={handleChange} maxLength={64} required />
                  </div>
                  <div >
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" aria-describedby="Email" value={newUser?.email} onChange={handleChange} maxLength={64} required />
                  </div>
                  <div >
                    <label htmlFor="roleId">Ovlašćenja korisnika</label>
                    <select id="roleId" aria-label="Odaberite ovlašćenja korisnika" required value={newUser?.roleId} onChange={handleChange}>
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
              <button type="button" className="button button-gray" onClick={() => setShowModalNewUser(false)}>
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
          question={`Da li ste sigurni da zelite da dodate novog korisnika ${newUser?.firstName + " " + newUser?.lastName}?`}
        />
      )}
      {showSpinner && <Spinner />}
    </div>
  );
};

export default ModalNewUser;
