import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  useEffect(() => {
    getOrderData();
    getFinanceData();
  }, []);

  const [showModal, setShowModal] = useState("");
  const [tpf, setTpf] = useState({});
  const [newOrder, setNewOrder] = useState({
    orderObject: {},
    customerObject: {},
    paymentObject: { paymentType: "Cash" },
    category: "MOBILE",
    tpf: {},
  });
  const [orderList, setOrderList] = useState([]);
  const [financeList, setFinanceList] = useState([]);
  const today = new Date();
  const formatted = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const getOrderData = () => {
    axios
      .get("https://shop-software.onrender.com/api/order")
      .then((res) => setOrderList(res.data.reverse()))
      .catch((err) => console.log(err));
  };
  const addOrder = () => {
    setShowModal(false);
    axios
      .post("https://shop-software.onrender.com/api/order", newOrder)
      .then((res) => getOrderData())
      .catch((err) => alert(err.response.data));
  };

  const getFinanceData = () => {
    axios
      .get("https://shop-software.onrender.com/api/tpf")
      .then((res) => setFinanceList(res.data.reverse()))
      .catch((err) => console.log(err));
  };

  // UI Components
  return (
    <div className="p-6 h-[100vh] bg-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Orders</h1>
        <button
          onClick={() => setShowModal("Add")}
          className="bg-[#615AE7] text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer"
        >
         <span className="mr-1">+</span> Add New Order
        </button>
      </div>

      {/* Order Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="w-[100%] bg-gray-50 ">
            <tr className="w-[100%]">
              {[
                "Order No.",
                "Category",
                "Modal Name",
                "Quanity",
                "Customer Name",
                "Phone Number",
                "Payment Type",
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
            {orderList.map((i, index) => (
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{i.orderNumber}</td>
                <td className="px-6 py-3 font-medium">{i.category}</td>
                <td className="px-6 py-3">{i.modelName}</td>
                <td className="px-6 py-3">{i.quantity}</td>
                <td className="px-6 py-3">{i.customerObject.name}</td>
                <td className="px-6 py-3">{i.customerObject.phoneNumber}</td>
                <td className="px-6 py-3">{i.paymentObject.paymentType}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      setNewOrder(i);
                      setShowModal("View");
                    }}
                    className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal != "" ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[80%] max-w-4xl z-10 h-[70vh] overflow-auto">
            {showModal == "Add" ? (
              <div className="flex justify-between w-[90%]">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Order Number: {orderList.length + 1}
                </h2>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Date: {formatted}</h2>
              </div>
            ) : null}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Product Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div >
                <label className="text-gray-600 font-medium text-sm">Category:</label>
                <select
                  value={newOrder.category}
                  onChange={(e) => {
                    setNewOrder({
                      ...newOrder,
                      category: e.target.value.toUpperCase(),
                    });
                  }}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  name=""
                  id=""
                >
                  <option value="Mobile">Mobile</option>
                  <option value="TV">TV</option>
                  <option value="Fridge">Fridge</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            {newOrder.category == "MOBILE" ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Mobile Details:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Company:</label>
                    <input
                      value={newOrder.orderObject.company}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Ram,Rom fomat(ram/rom):</label>
                    <input
                      value={newOrder.orderObject.specs}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            specs: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Colour:</label>
                    <input
                      value={newOrder.orderObject.color}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            color: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, quantity: e.target.value })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newOrder.category == "TV" ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">TV Details:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Company:</label>
                    <input
                      value={newOrder.orderObject.company}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Size:</label>
                    <input
                      value={newOrder.orderObject.size}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            size: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, quantity: e.target.value })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newOrder.category == "WASHING MACHINE" ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Washing Machine Details:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Company:</label>
                    <input
                      value={newOrder.orderObject.company}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Size (in liters):</label>
                    <input
                      value={newOrder.orderObject.size}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            size: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Type:</label>
                    <select
                      value={newOrder.orderObject.type}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            type: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      name=""
                      id=""
                    >
                      <option value="Semi-auto">Semi-auto</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, quantity: e.target.value })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newOrder.category == "FRIDGE" ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Fridge Details:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Company:</label>
                    <input
                      value={newOrder.orderObject.company}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Size (in liters):</label>
                    <input
                      value={newOrder.orderObject.size}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            size: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Doors:</label>
                    <input
                      value={newOrder.orderObject.doors}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            doors: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, quantity: e.target.value })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newOrder.category == "OTHERS" ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Product Details:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Company:</label>
                    <input
                      value={newOrder.orderObject.company}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          orderObject: {
                            ...newOrder.orderObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          quantity: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : null}
            {showModal != "Add" ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Order Generation Details:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Date Of Order:</label>
                    <input
                      value={
                        newOrder?.date
                          ? new Date(newOrder.date).toLocaleDateString("en-IN")
                          : ""
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Time:</label>
                    <input
                      value={
                        newOrder?.date
                          ? new Date(newOrder.date).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                          : ""
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                </div>
              </>
            ) : null}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Customer Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div >
                <label className="text-gray-600 font-medium text-sm">Name:</label>
                <input
                  value={newOrder?.customerObject?.name}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      customerObject: {
                        ...newOrder.customerObject,
                        name: e.target.value.toUpperCase(),
                      },
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div >
                <label className="text-gray-600 font-medium text-sm">Phone number:</label>
                <input
                  value={newOrder?.customerObject?.phoneNumber}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      customerObject: {
                        ...newOrder.customerObject,
                        phoneNumber: e.target.value.toUpperCase(),
                      },
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div >
                <label className="text-gray-600 font-medium text-sm">E-mail:</label>
                <input
                  value={newOrder?.customerObject?.email}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      customerObject: {
                        ...newOrder.customerObject,
                        email: e.target.value,
                      },
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div >
                <label className="text-gray-600 font-medium text-sm">Address:</label>
                <input
                  value={newOrder?.customerObject?.address}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      customerObject: {
                        ...newOrder.customerObject,
                        address: e.target.value.toUpperCase(),
                      },
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Payment Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div >
                <label className="text-gray-600 font-medium text-sm">Price:</label>
                <input
                  value={newOrder?.paymentObject?.price}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      paymentObject: {
                        ...newOrder.paymentObject,
                        price: e.target.value.toUpperCase(),
                      },
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="number"
                />
              </div>
              <div >
                <label className="text-gray-600 font-medium text-sm">Discounts:</label>
                <input
                  value={newOrder?.paymentObject?.discount}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      paymentObject: {
                        ...newOrder.paymentObject,
                        discount: e.target.value.toUpperCase(),
                      },
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="number"
                />
              </div>
              <div >
                <label className="text-gray-600 font-medium text-sm">CGST (in %):</label>
                <input
                  value={newOrder?.paymentObject?.CGST}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      paymentObject: {
                        ...newOrder.paymentObject,
                        CGST: e.target.value.toUpperCase(),
                      },
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="number"
                />
              </div>
              <div >
                <label className="text-gray-600 font-medium text-sm">SGST (in %):</label>
                <input
                  value={newOrder?.paymentObject?.SGST}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      paymentObject: {
                        ...newOrder.paymentObject,
                        SGST: e.target.value.toUpperCase(),
                      },
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="number"
                />
              </div>
              <div >
                <label className="text-gray-600 font-medium text-sm">Payment Type:</label>
                <select
                  value={newOrder?.paymentObject?.paymentType}
                  onChange={(e) => {
                    setNewOrder({
                      ...newOrder,
                      paymentObject: {
                        ...newOrder.paymentObject,
                        paymentType: e.target.value.toUpperCase(),
                      },
                    });
                  }}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  name=""
                  id=""
                >
                  <option value="CASH">Cash</option>
                  <option value="FINANCE">Finance</option>
                  <option value="UPI">UPI</option>
                  <option value="THIRD PARTY FINANCE">
                    Third Party Finance
                  </option>
                </select>
              </div>
              <div >
                <label className="text-gray-600 font-medium text-sm">Remarks:</label>
                <input
                  value={newOrder?.paymentObject?.remarks}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      paymentObject: {
                        ...newOrder.paymentObject,
                        remarks: e.target.value.toUpperCase(),
                      },
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
            </div>
            {newOrder?.paymentObject?.paymentType == "THIRD PARTY FINANCE" ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Third Party Finance</h2>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6  pb-2">
                  Finance Number: {financeList.length + 1}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Downpayment:</label>
                    <input
                      value={newOrder.tpf.downPayment}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            downPayment: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Number of EMI:</label>
                    <input
                      value={newOrder.tpf.numberOfEMI}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            numberOfEMI: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">File Charge:</label>
                    <input
                      value={newOrder.tpf.fileCharge}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            fileCharge: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Intrest rate monthly(%):</label>
                    <input
                      value={newOrder.tpf.intrest}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            intrest: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Amount of EMI:</label>
                    <input
                      value={newOrder.tpf.amountOfEMI}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            amountOfEMI: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Remarks:</label>
                    <input
                      value={newOrder.tpf.remarks}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            remarks: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Photo:</label>
                    <input
                      value={newOrder.tpf.photo}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            photo: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="h-[5vh] mt-[1vh] w-[50%] pl-[1%] rounded-[5px]"
                      type="file"
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Guaranteer Information:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Guaranteer Name:</label>
                    <input
                      value={newOrder.tpf.guaranteerName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            guaranteerName: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Phone Number:</label>
                    <input
                      value={newOrder.tpf.guaranteerPhoneNumber}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            guaranteerPhoneNumber: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div >
                    <label className="text-gray-600 font-medium text-sm">Address:</label>
                    <input
                      value={newOrder.tpf.guaranteerAddress}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          tpf: {
                            ...newOrder.tpf,
                            guaranteerAddress: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setShowModal(false),
                    setNewOrder({
                      orderObject: {},
                      customerObject: {},
                      paymentObject: { paymentType: "Cash" },
                      tpf: {},
                      category: "MOBILE",
                    }),
                    setTpf({});
                }}
                className="px-4 py-2 w-[15%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              {showModal == "Add" ? (
                <button
                  onClick={() => {
                    addOrder();
                    setNewOrder(
                      {
                        orderObject: {},
                        customerObject: {},
                        paymentObject: { paymentType: "Cash" },
                        tpf: {},
                        category: "MOBILE",
                      },
                      setTpf({})
                    );
                  }}
                  className="px-4 py-2 bg-[#615AE7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Save"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Order;
