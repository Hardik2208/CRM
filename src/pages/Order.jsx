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
      .then((res) => setOrderList(res.data))
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
      .then((res) => setFinanceList(res.data))
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
                "S.No",
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
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{i.orderNumber}</td>
                <td className="px-6 py-3">{i.category}</td>
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
                    className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
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
          <div className="bg-white rounded-lg p-6 w-[60%] h-[80vh] overflow-y-scroll max-w-4xl z-10 overflow-x-hidden">
            {showModal == "Add" ? (
              <div className="flex justify-between w-[90%]">
                <h2 className="text-xl font-bold mb-4">
                  Order Number: {orderList.length + 1}
                </h2>
                <h2 className="text-xl font-bold mb-4">Date: {formatted}</h2>
              </div>
            ) : null}
            <h2 className="text-xl font-bold mb-4">Product Details:</h2>
            <div className="w-[100%] h-[10vh] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Category:</label>
                <select
                  value={newOrder.category}
                  onChange={(e) => {
                    setNewOrder({
                      ...newOrder,
                      category: e.target.value.toUpperCase(),
                    });
                  }}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
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
                <h2 className="text-xl font-bold my-4">Mobile Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Ram,Rom fomat(ram/rom):</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Colour:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, quantity: e.target.value })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newOrder.category == "TV" ? (
              <div>
                <h2 className="text-xl font-bold my-4">TV Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Size:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, quantity: e.target.value })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newOrder.category == "WASHING MACHINE" ? (
              <div>
                <h2 className="text-xl font-bold my-4">
                  Washing Machine Details:
                </h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Size (in liters):</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Type:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      name=""
                      id=""
                    >
                      <option value="Semi-auto">Semi-auto</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, quantity: e.target.value })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newOrder.category == "FRIDGE" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Fridge Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Size (in liters):</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Doors:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, quantity: e.target.value })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newOrder.category == "OTHERS" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Product Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newOrder.modelName}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newOrder.quantity}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          quantity: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : null}
            {showModal != "Add" ? (
              <>
                <h2 className="text-xl font-bold my-4">
                  Order Generation Details:
                </h2>
                <div className="w-[100%] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Date Of Order:</label>
                    <input
                      value={
                        newOrder?.date
                          ? new Date(newOrder.date).toLocaleDateString("en-IN")
                          : ""
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Time:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </>
            ) : null}
            <h2 className="text-xl font-bold my-4">Customer Details:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Name:</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Phone number:</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">E-mail:</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Address:</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>
            <h2 className="text-xl font-bold my-4">Payment Details:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Price:</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Discounts:</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">CGST (in %):</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">SGST (in %):</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Payment Type:</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
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
              <div className="flex flex-col">
                <label htmlFor="">Remarks:</label>
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
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>
            {newOrder?.paymentObject?.paymentType == "THIRD PARTY FINANCE" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Third Party Finance</h2>
                <h2 className="text-xl font-bold my-4">
                  Finance Number: {financeList.length + 1}
                </h2>
                <div className="w-[100%] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Downpayment:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Number of EMI:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">File Charge:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Intrest rate monthly(%):</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Amount of EMI:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Remarks:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Photo:</label>
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
                <h2 className="text-xl font-bold my-4">
                  Guaranteer Information:
                </h2>
                <div className="w-[100%] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Guaranteer Name:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Phone Number:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Address:</label>
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex justify-end space-x-2 mt-4 w-[90%]">
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
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
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
                  className="px-4 py-2 bg-blue-500 w-[15%] text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
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
