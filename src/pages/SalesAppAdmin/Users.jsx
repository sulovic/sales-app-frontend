import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { SalesAdminDashboardLinks } from "../../config/config";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuth } from "../../Context/AuthContext";
import ModalNewUser from "../../components/SalesAppAdmin/Users/ModalNewUser";
import ModalEditUser from "../../components/SalesAppAdmin/Users/ModalEditUser";
import { toast } from "react-toastify";

const Users = () => {
  const [usersData, setUsersData] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModalNewUser, setShowModalNewUser] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useAuth();
  const tableHeaders = ["Ime i prezime", "Email", "Nivo ovašćenja"];

  const fetchUsers = async () => {
    setShowSpinner(true);
    try {
      const response = await axiosPrivate.get("/api/users");
      setUsersData(response?.data);
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModalEditUser(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowModalDeleteUser(true);
  };

  const handleDeleteUserOK = async () => {
    try {
      setShowSpinner(true);
      await axiosPrivate.delete(`/api/users/${selectedUser?.userId}`);
      toast.success(`Korisnik ${selectedUser?.firstName + " " + selectedUser?.lastName} je uspešno obrisan!`, {
        position: "top-center",
      });
    } catch (err) {
      toast.error(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    } finally {
      setShowSpinner(false);
      setShowModalDeleteUser(false);
      fetchUsers();
    }
  };

  const handleDeleteUserCancel = () => {
    setSelectedUser(null);
    setShowModalDeleteUser(false);
  };

  return (
    <>
      <Navbar Links={SalesAdminDashboardLinks} />
      <div className="mx-2 md:mx-4">
        <h3 className="mt-4">Korisnici aplikacije</h3>

        {usersData ? (
          <>
            <div className="flex justify-end px-3">
              <button type="button" className="button button-sky " aria-label="EditUser" onClick={() => setShowModalNewUser(true)}>
                Dodaj korisnika
              </button>
            </div>

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
                        <th className="px-6 py-3" key="editUser">
                          Izmeni korisnika
                        </th>
                        <th className="px-6 py-3" key="deleteUser">
                          Obriši korisnika
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersData.map((user, index) => (
                        <tr key={index} className="border-b bg-white hover:!bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                          <td key={`ime_prezime_${index}`}>{user?.firstName + " " + user?.lastName}</td>
                          <td key={`email_${index}`}>{user?.email}</td>
                          <td key={`role_${index}`}>
                            {user?.roleId === 1001 ? "Base" : user?.roleId === 3001 ? "POWER" : user?.roleId === 5001 ? "ADMIN" : "Unknown Role"}
                          </td>
                          <td key={`editUser_${index}`} className="text-center">
                            <button
                              type="button"
                              className="button button-sky"
                              aria-label="EditUser"
                              disabled={authUser?.email === user?.email || authUser?.roleId < 5000}
                              onClick={() => handleEditUser(user)}
                            >
                              Izmeni
                            </button>
                          </td>
                          <td key={`deleteUser_${index}`} className="text-center">
                            <button
                              type="button"
                              className="button button-red"
                              aria-label="Delete"
                              disabled={authUser?.email === user?.email || authUser?.roleId < 5000}
                              onClick={() => handleDeleteUser(user)}
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
          !showSpinner && <div className="p-3">Nema podataka o korisnicima...</div>
        )}
      </div>
      {showModalDeleteUser && (
        <Modal
          onOK={handleDeleteUserOK}
          onCancel={handleDeleteUserCancel}
          title="Potvrda brisanja korisnika"
          question={`Da li ste sigurni da zelite da obrisete korisnika ${selectedUser?.firstName + " " + selectedUser?.lastName}?`}
        />
      )}
      {showModalNewUser && <ModalNewUser setShowModalNewUser={setShowModalNewUser} fetchUsers={fetchUsers} />}
      {showModalEditUser && <ModalEditUser setShowModalEditUser={setShowModalEditUser} fetchUsers={fetchUsers} selectedUser={selectedUser} />}
      {showSpinner && <Spinner />}
    </>
  );
};

export default Users;
