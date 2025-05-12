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
      .then((res) => setCustomerList(res.data))
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
        `https://shop-software.onrender.com/api/Customer/${newCustomerData._id}`,
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
                <td className="px-6 py-4">{i.name}</td>
                <td className="px-6 py-4">{i.phoneNumber}</td>
                <td className="px-6 py-4">{i.address}</td>
                <td className="px-6 py-4">{i.orderList.length}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setShowModal2(true), setSelectedCustomer(i);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                  >
                    Browse
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setShowModal("Edit"), setNewCustomerData(i);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
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
            <h2 className="text-xl font-bold my-4">Customer Details:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Name:</label>
                <input
                  value={newCustomerData.name}
                  onChange={(e) => {
                    setNewCustomerData({
                      ...newCustomerData,
                      name: e.target.value.toUpperCase(),
                    });
                  }}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Phone number:</label>
                <input
                  onChange={(e) => {
                    setNewCustomerData({
                      ...newCustomerData,
                      phoneNumber: e.target.value,
                    });
                  }}
                  value={newCustomerData.phoneNumber}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">E-mail:</label>
                <input
                  onChange={(e) => {
                    setNewCustomerData({
                      ...newCustomerData,
                      email: e.target.value,
                    });
                  }}
                  value={newCustomerData.email}
                  className="border border-gray-500 h-[5vh] my-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Address:</label>
                <input
                  onChange={(e) => {
                    setNewCustomerData({
                      ...newCustomerData,
                      address: e.target.value.toUpperCase(),
                    });
                  }}
                  value={newCustomerData.address}
                  className="border border-gray-500 h-[5vh] my-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4 w-[90%]">
              <button
                onClick={() => {
                  setShowModal(""), setNewCustomerData([]);
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              {showModal == "Add" ? (
                <button
                  onClick={() => {
                    addCustomer();
                  }}
                  className="px-4 py-2 bg-blue-500 w-[15%] text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Save"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    updateCustomer();
                  }}
                  className="px-4 py-2 bg-blue-500 w-[15%] text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
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
            <h2 className="text-xl font-bold my-4">Order Details:
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
                    <td className="px-6 py-4">{i.orderNumber}</td>
                    <td className="px-6 py-4">{i.paymentObject.price}</td>
                    <td className="px-6 py-4">{i.paymentObject.discount}</td>
                    <td className="px-6 py-4">
                      {i.paymentObject.price - i.paymentObject.discount}
                    </td>
                    <td className="px-6 py-4">{i.quantity}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setReassign(true),
                            setAssignmentList({...assignmentList,
                              phoneNumber: selectedCustomer.phoneNumber,
                              orderNumber: i.orderNumber,
                              
                            });
                        }}
                        className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                      >
                        Reassign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {reassign ? (
              <div className="w-[60%] flex h-[10vh]">
                <div className="flex flex-col w-[50%]">
                  <label htmlFor="">Reassigner's Phone Number:</label>
                  <input
                  onChange={(e)=>{
                    setAssignmentList({...assignmentList,
                      assignedNumber: e.target.value
                    });
                  }}
                    className="border border-gray-500 h-[5vh] mt-[1vh] pl-[1%] rounded-[5px] mr-[5%]"
                    type="number"
                  />
                </div>
                <button
                onClick={()=>{assignOrder()}}
                className="py-1.5 w-[15%] bg-blue-500 hover:bg-blue-600 rounded-md text-white hover:cursor-pointer self-end">
                  Reassgin
                </button>
              </div>
            ) : null}
            <button
              onClick={() => {
                setShowModal2(false), setSelectedCustomer([]), setReassign(""), setAssignmentList({});
              }}
              className="py-2 w-[12%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer self-end"
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
