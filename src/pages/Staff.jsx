import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Staff = () => {
  useEffect(() => {
    getStaffData();
  }, []);

  const [showModal, setShowModal] = useState("");
  const [showModal2, setShowModal2] = useState(false);
  const [newStaff, setNewStaff] = useState({});
  const [staffList, setStaffList] = useState([]);

  const getStaffData = () => {
    axios
      .get("http://localhost:5001/api/staff")
      .then((res) => setStaffList(res.data))
      .catch((err) => console.log(err));
  };

  const deletestaff = (id) => {
    axios
      .delete(`http://localhost:5001/api/staff/${id}`)
      .then((res) => getStaffData())
      .catch((err) => console.log(err));
  };
  const updatestaff = () => {
    setShowModal(false),
      axios
        .put(`http://localhost:5001/api/staff/${newstaff._id}`, newStaff)
        .then((res) => getStaffData())
        .catch((err) => console.log(err));
  };
  const addstaff = () => {
    setShowModal(false),
      axios
        .post("http://localhost:5001/api/staff", newStaff)
        .then((res) => {
          getStaffData();
        })
        .catch((err) => console.log(err));
  };
  // UI Components
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staffs</h1>
        <button
          onClick={() => setShowModal("Add")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
        >
          Add New Staff
        </button>
      </div>

      {/* Order Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="w-[100%] bg-gray-50 ">
            <tr className="w-[100%]">
              {[
                "S.No",
                "Work",
                "Name",
                "Phone Number",
                "Address",
                "Reportings",
                "Leaves",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffList.map((i, index) => (
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{i.work}</td>
                <td className="px-6 py-4">{i.staffName}</td>
                <td className="px-6 py-4">{i.staffPhoneNumber}</td>
                <td className="px-6 py-4">{i.address}</td>
                <td className="px-6 py-4 flex items-center justify-center">
                  <button
                    onClick={() => setShowModal2(true)}
                    className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                  >
                    Manage
                  </button>
                </td>
                <td className="px-6 py-4">{i.leavesAllowded}</td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <button
                    onClick={() => {
                      setNewStaff(i), setShowModal("Edit");
                    }}
                    className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setNewStaff(i), setShowModal("View");
                    }}
                    className="text-indigo-600 ml-[25%] hover:text-indigo-900 hover:cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[60%] h-[80vh] overflow-y-scroll max-w-4xl z-10">
            <h2 className="text-xl font-bold mb-4">Work Details:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Work:</label>
                <input
                  value={newStaff.work}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, work: e.target.value })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Work Timmings:</label>
                <input
                  value={newStaff.workTimmings}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, workTimmings: e.target.value })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Salary:</label>
                <input
                  value={newStaff.salary}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, salary: e.target.value })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Leaves Allowded:</label>
                <input
                  value={newStaff.leavesAllowded}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, leavesAllowded: e.target.value })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="number"
                />
              </div>
            </div>
            <h2 className="text-xl font-bold my-4">Staff's Details:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Name:</label>
                <input
                  value={newStaff.staffName}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, staffName: e.target.value })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Phone number:</label>
                <input
                  value={newStaff.staffPhoneNumber}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      staffPhoneNumber: e.target.value,
                    })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">E-mail:</label>
                <input
                  value={newStaff.staffEmail}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, staffEmail: e.target.value })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Address:</label>
                <input
                  value={newStaff.address}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, address: e.target.value })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Aadhar Card Number:</label>
                <input
                  value={newStaff.aadharCardNumber}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      aadharCardNumber: e.target.value,
                    })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">PAN Card Number:</label>
                <input
                  value={newStaff.panCardNumber}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, panCardNumber: e.target.value })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Aadhar Card Picture:</label>

                <input className="h-[5vh] mt-[1vh] uppercase w-[80%]" type="file" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Pan Card Picture:</label>

                <input className="h-[5vh] mt-[1vh] uppercase w-[80%]" type="file" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Staff's Picture:</label>

                <input className="h-[5vh] mt-[1vh] uppercase w-[80%]" type="file" />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 w-[90%]">
              <button
                onClick={() => {
                  setShowModal(false), setNewStaff({});
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              {showModal == "Add" ? (
                <button
                  onClick={() => {
                    setNewStaff({}), addstaff();
                  }}
                  className="px-4 py-2 bg-blue-500 w-[15%] text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Save"}
                </button>
              ) :showModal == "Edit"? (
                <button
                  onClick={() => {
                    setNewStaff({})
                  }}
                  className="px-4 py-2 bg-blue-500 w-[15%] text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Update"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {showModal2 ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[60%] h-[80vh] max-w-4xl z-10">
          <h2 className="text-xl font-bold mb-4">Reporting Management:</h2>
            <button
              onClick={() => {
                setShowModal2(false);
              }}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Staff;
