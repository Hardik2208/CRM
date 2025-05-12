import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

function Enquiry() {
  useEffect(() => {
    getEnquiryData();
  }, []);
  const [showModal, setShowModal] = useState("");
  const [status, setStatus] = useState(false);
  const [newEnquiryData, setNewEnquiryData] = useState({});
  const [enquiryList, setEnquiryList] = useState([]);

  const getEnquiryData = () => {
    axios
      .get("http://localhost:5001/api/enquiry")
      .then((res) => setEnquiryList(res.data))
      .catch((err) => console.log(err));
  };

  const deleteEnquiry = (id) => {
    axios
      .delete(`http://localhost:5001/api/enquiry/${id}`)
      .then((res) => getEnquiryData())
      .catch((err) => console.log(err));
  };
  const updateEnquiry = () => {
    setShowModal(false);
    axios
      .put(
        `http://localhost:5001/api/enquiry/${newEnquiryData._id}`,
        newEnquiryData
      )
      .then((res) => {
        getEnquiryData();
        setNewEnquiryData({});
      })
      .catch((err) => console.log(err));
  };
  const addEnquiry = () => {
    setShowModal(false);
    axios
      .post("http://localhost:5001/api/enquiry", newEnquiryData)
      .then((res) => {
        getEnquiryData();
        setNewEnquiryData({});
      })
      .catch((err) => console.log(err));
  };

  const handleStatus = (id) => {
    axios
      .put(`http://localhost:5001/api/enquiry/${id}`, {
        status: "Completed",
      })
      .then((res) => {
        getEnquiryData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6 h-[100vh] bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Enquiry</h1>
        <button
          onClick={() => setShowModal("Add")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
        >
          Add New Enquiry
        </button>
      </div>

      {/* Enquiry Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="w-[100%] bg-gray-50 ">
            <tr className="w-[100%]">
              {[
                "S.No",
                "Customer Name",
                "Phone Number",
                "Date",
                "Category",
                "Product",
                "Status",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enquiryList.map((i, index) => (
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{i.name}</td>
                <td className="px-4 py-3">{i.phoneNumber}</td>
                <td className="px-4 py-3">
                  {new Date(i.dateOfEnquriy).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3">{i.category}</td>
                <td className="px-4 py-3">{i.productName}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleStatus(i._id)}
                    className={`${
                      i.status != "Pending"
                        ? "text-green-600 hover:text-green-800 "
                        : "text-red-600 hover:text-red-800"
                    } hover:cursor-pointer`}
                  >
                    {i.status}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setNewEnquiryData(i);
                      setShowModal("Edit");
                    }}
                    className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEnquiry(i._id)}
                    className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer ml-[10%]"
                  >
                    Delete
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
          <div className="bg-white rounded-lg p-6 w-[80%] max-w-4xl z-10">
            <h2 className="text-xl font-bold mb-4">Customer Information:</h2>

            <div className="w-[100%] h-[20vh] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Customer Name</label>
                <input
                  value={newEnquiryData.name}
                  onChange={(e) =>
                    setNewEnquiryData({
                      ...newEnquiryData,
                      name: e.target.value.toUpperCase(),
                    })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Phone Number</label>
                <input
                  value={newEnquiryData.phoneNumber}
                  onChange={(e) =>
                    setNewEnquiryData({
                      ...newEnquiryData,
                      phoneNumber: e.target.value.toUpperCase(),
                    })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Email-Id</label>
                <input
                  value={newEnquiryData.email}
                  onChange={(e) =>
                    setNewEnquiryData({
                      ...newEnquiryData,
                      email: e.target.value,
                    })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold my-4">Product Information:</h2>
            <div className="w-[100%] h-[20vh] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Category</label>
                <select
                  value={newEnquiryData.category}
                  onChange={(e) =>
                    setNewEnquiryData({
                      ...newEnquiryData,
                      category: e.target.value.toUpperCase(),
                    })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  name=""
                  id=""
                >
                  <option value="">Choose Option</option>
                  <option value="MOBILE">Mobile</option>
                  <option value="TV">TV</option>
                  <option value="FRIDGE">FRIDGE</option>
                  <option value="WASHING MACHINE">Washing Machine</option>
                  <option value="OTHERS">Others</option>
                </select>
              </div>
              {newEnquiryData.category ? (
                <div className="flex flex-col">
                  <label htmlFor="">Product Name</label>
                  <input
                    disabled={false}
                    value={newEnquiryData.productName}
                    onChange={(e) =>
                      setNewEnquiryData({
                        ...newEnquiryData,
                        productName: e.target.value.toUpperCase(),
                      })
                    }
                    className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                    type="text"
                  />
                </div>
              ) : null}
            </div>
            <div className="w-[90%] h-[8vh] flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false),
                    setNewEnquiryData({
                    });
                }}
                className="px-4 py-2 mt-[2vh] mx-[2%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              {showModal == "Add" ? (
                <button
                  onClick={() => {
                    addEnquiry();
                  }}
                  className="px-4 py-2 mt-[2vh] w-[15%] bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Save"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    updateEnquiry();
                  }}
                  className="px-4 py-2 mt-[2vh] w-[15%] bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Update"}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Enquiry;
