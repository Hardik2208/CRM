import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Customer = () => {
  useEffect(() => {
    getCustomerData();
  }, []);

  const [showModal, setShowModal] = useState("");
  const [showModal2, setShowModal2] = useState("");
  const [reassign, setReassign] = useState("");
  const [newCustomerData, setNewCustomerData] = useState({});
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [assignmentList, setAssignmentList] = useState({});

  const getCustomerData = () => {
    axios
      .get("https://shop-software.onrender.com/api/Customer")
      .then((res) => setCustomerList(res.data.reverse()))
      .catch((err) => console.log(err));
  };

  const assignOrder = () => {
    setShowModal2(""), setAssignmentList({}),
    axios
      .put(`https://shop-software.onrender.com/api/Customer/Reassign/${selectedCustomer._id}`,assignmentList)
      .then((res) => getCustomerData())
      .catch((err) => alert(err.response.data));
  };

  const updateCustomer = () => {
    setShowModal(false), setNewCustomerData({});
    axios
      .put(
        `https://shop-software.onrender.com/api/Customer/${newCustomerData?._id}`,
        newCustomerData
      )
      .then((res) => getCustomerData())
      .catch((err) => console.log(err));
  };

  const addCustomer = () => {
    setShowModal(false),
      setNewCustomerData({}),
      axios
        .post("https://shop-software.onrender.com/api/Customer", newCustomerData)
        .then((res) => {
          getCustomerData();
        })
        .catch((err) => console.log(err));
  };

  // UI Components
  return (
    <div className="p-6 bg-white h-[100vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold ">Customers</h1>
        <button
          onClick={() => setShowModal("Add")}
          className="bg-[#615AE7] text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer"
        >
         <span className="mr-1">+</span> Add New Customer
        </button>
      </div>

      {/* customer Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="w-[100%] bg-gray-50 ">
            <tr className="w-[100%]">
              {[
                "S.No",
                "Name",
                "Phone Number",
                "Address",
                "Total Order",
                "View",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customerList.map((i, index) => (
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{i?.name}</td>
                <td className="px-6 py-4">{i?.phoneNumber}</td>
                <td className="px-6 py-4">{i?.address}</td>
                <td className="px-6 py-4">{i?.orderList.length}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setShowModal2(true), setSelectedCustomer(i);
                    }}
                    className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer"
                  >
                    Browse
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setShowModal("Edit"), setNewCustomerData(i);
                    }}
                    className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer"
                  >
                    Edit
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
          <div className="bg-white rounded-lg p-6 w-[60%] max-w-4xl z-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Customer Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-gray-600 font-medium text-sm">Name:</label>
                <input
                  value={newCustomerData?.name}
                  onChange={(e) => {
                    setNewCustomerData({
                      ...newCustomerData,
                      name: e.target.value.toUpperCase(),
                    });
                  }}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">Phone number:</label>
                <input
                  onChange={(e) => {
                    setNewCustomerData({
                      ...newCustomerData,
                      phoneNumber: e.target.value,
                    });
                  }}
                  value={newCustomerData?.phoneNumber}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">E-mail:</label>
                <input
                  onChange={(e) => {
                    setNewCustomerData({
                      ...newCustomerData,
                      email: e.target.value,
                    });
                  }}
                  value={newCustomerData?.email}
                 className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">Address:</label>
                <input
                  onChange={(e) => {
                    setNewCustomerData({
                      ...newCustomerData,
                      address: e.target.value.toUpperCase(),
                    });
                  }}
                  value={newCustomerData?.address}
                 className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setShowModal(""), setNewCustomerData([]);
                }}
                className="px-4 py-2 bg-gray-200 w-[15%] rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              {showModal == "Add" ? (
                <button
                  onClick={() => {
                    addCustomer();
                  }}
                  className="px-4 py-2 bg-[#615AE7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Save"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    updateCustomer();
                  }}
                  className="px-4 py-2 bg-[#615AE7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Update"}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {showModal2 ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[80%] max-w-4xl z-10 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Order Details:
            </h2>
            <table className="min-w-full my-[5vh] overflow-y-auto">
              <thead className="w-[100%] bg-gray-50 ">
                <tr className="w-[100%]">
                  {[
                    "S.No",
                    "Order No.",
                    "Price",
                    "Discount",
                    "Total Amount",
                    "Quantity",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedCustomer.orderList.map((i, index) => (
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{i?.orderNumber}</td>
                    <td className="px-6 py-4">{i?.paymentObject.price}</td>
                    <td className="px-6 py-4">{i?.paymentObject.discount}</td>
                    <td className="px-6 py-4">
                      {i?.paymentObject.price - i?.paymentObject.discount}
                    </td>
                    <td className="px-6 py-4">{i?.quantity}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setReassign(true),
                            setAssignmentList({...assignmentList,
                              phoneNumber: selectedCustomer.phoneNumber,
                              orderNumber: i?.orderNumber,
                              
                            });
                        }}
                        className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer"
                      >
                        Reassign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {reassign ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-600 font-medium text-sm">Reassigner's Phone Number:</label>
                  <input
                  onChange={(e)=>{
                    setAssignmentList({...assignmentList,
                      assignedNumber: e.target.value
                    });
                  }}
                    className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    type="number"
                  />
                </div>
                <button
                onClick={()=>{assignOrder()}}
                className="py-1.5 w-[25%] bg-[#615AE7] hover:bg-[#615ae7d6] rounded-md text-white hover:cursor-pointer self-end">
                  Reassgin
                </button>
              </div>
            ) : null}
            <button
              onClick={() => {
                setShowModal2(false), setSelectedCustomer([]), setReassign(""), setAssignmentList({});
              }}
              className="py-2 w-[15%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer self-end"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Customer;
