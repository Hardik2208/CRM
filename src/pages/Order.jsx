import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ImageUploader from "../components/ImageUploader";
import { exportPDF, exportExcel } from "../components/Pdf";
import { FileText, Table } from "lucide-react";
import { useUserRole } from "../components/hooks";
import Loader from "../components/loader";

import Sidebar from "../components/Sidebar";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [newOrder, setNewOrder] = useState({
    orderObject: {},
    customerObject: {},
    paymentObject: { paymentType: "Cash" },
    category: "MOBILE",
    tpf: {},
  });
  useEffect(() => {
    getOrderData();
    getFinanceData();
  }, []);

  useEffect(() => {
    const price = parseFloat(newOrder?.paymentObject?.price || 0);
    const discount = parseFloat(newOrder?.paymentObject?.discount || 0);
    const downPayment = parseFloat(newOrder?.tpf?.downPayment || 0);
    const numberOfEMI = parseInt(newOrder?.tpf?.numberOfEMI || 0);
    const interest = parseFloat(newOrder?.tpf?.intrest || 0);
    const fileCharge = parseFloat(newOrder?.tpf?.fileCharge || 0);

    if (price && numberOfEMI) {
      const priceAfterDiscount = price - discount; // Adjust price after discount
      const principal = priceAfterDiscount - downPayment + fileCharge; // Subtract down payment and add file charge

      let amountOfEMI = 0;
      if (interest > 0) {
        const r = interest / 100; // monthly interest
        const n = numberOfEMI;
        amountOfEMI =
          (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        amountOfEMI = principal / numberOfEMI; // No interest
      }

      // Update state with the calculated EMI
      setNewOrder((prev) => ({
        ...prev,
        tpf: {
          ...prev.tpf,
          amountOfEMI: Math.round(amountOfEMI).toString(), // Round the EMI amount
        },
      }));
    }
  }, [
    newOrder?.paymentObject?.price,
    newOrder?.paymentObject?.discount,
    newOrder?.tpf?.downPayment,
    newOrder?.tpf?.numberOfEMI,
    newOrder?.tpf?.fileCharge,
    newOrder?.tpf?.intrest,
  ]);

  const [showModal, setShowModal] = useState("");
  const [tpf, setTpf] = useState({});

  const [orderList, setOrderList] = useState([]);
  const [financeList, setFinanceList] = useState([]);

  const today = new Date();
  const formatted = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [search, setSearch] = useState("");
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    // Clear the previous timer whenever search changes
    if (timerId) {
      clearTimeout(timerId);
    }

    // Set a new timer
    const id = setTimeout(() => {
      if (search.trim()) {
        resultOfSearch(search);
      }
    }, 1000);

    setTimerId(id);

    // Cleanup timer on unmount
    return () => clearTimeout(id);
  }, [search]);

  const resultOfSearch = async (searchTerm) => {
    try {
      {
        const res = await axios.post(
          `https://shop-software.onrender.com/api/order/Search`,
          { searchTerm } //  Object format
        );
        setOrderList(res.data);
      }
    } catch (err) {
      console.error("Search Error:", err); // Shows error object in console
    }
  };

  const getOrderData = () => {
    axios
      .get("https://shop-software.onrender.com/api/order")
      .then((res) => {
        setOrderList(res.data.reverse());
        setLoading(false);
      })
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

  const role = useUserRole();

  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [serialSuggestions, setSerialSuggestions] = useState([]);
  const [focusedFieldIndex, setFocusedFieldIndex] = useState(null);

  if (loading) return <Loader />;

  // UI Components
  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-white h-[100vh] overflow-auto w-[90%]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Recent Orders</h1>

            <div className="w-[60%] flex justify-end text-sm gap-1">
              {role == "admin" ? (
                <button
                  onClick={() => exportExcel(orderList)}
                  className="bg-[#2463EB] text-white px-4 py-2 gap-2 rounded-md hover:bg-[#1C4ED8] hover:cursor-pointer flex items-center justify-center"
                >
                  <span className="mr-1">
                    <Table />
                  </span>{" "}
                  Export to Excel
                </button>
              ) : null}
              <button
                onClick={() => setShowModal("Add")}
                className="bg-[#2463EB] text-white px-4 py-2 rounded-md hover:bg-[#1C4ED8] hover:cursor-pointer flex items-center justify-center"
              >
                <span className="mr-1 ">+</span> Generate New Order
              </button>
            </div>
          </div>

          <div className="w-[100%] flex justify-start my-4 ">
            <input
              type="text"
              placeholder="Search..."
              className="mt-2 w-[40%] h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
              onChange={(e) => {
                setSearch(e.target.value.toUpperCase());
              }}
            />
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
                    <td className="px-6 py-3 font-medium">{i?.orderNumber}</td>
                    <td className="px-6 py-3 font-medium">{i?.category}</td>

                    <td className="px-6 py-3">{i?.modelName}</td>
                    <td className="px-6 py-3">{i?.quantity}</td>
                    <td className="px-6 py-3">{i?.customerObject.name}</td>
                    <td className="px-6 py-3">
                      {i?.customerObject.phoneNumber}
                    </td>
                    <td className="px-6 py-3">
                      {i?.paymentObject.paymentType}
                    </td>
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
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Date: {formatted}
                    </h2>
                  </div>
                ) : null}
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Product Details:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Category:
                    </label>
                    <select
                      value={newOrder?.category}
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
                      <option value="MOBILE">Mobile</option>
                      <option value="TV">TV</option>
                      <option value="FRIDGE">Fridge</option>
                      <option value="WASHING MACHINE">Washing Machine</option>
                      <option value="OTHERS">Others</option>
                    </select>
                  </div>
                </div>
                {newOrder?.category == "MOBILE" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Mobile Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Company:
                        </label>
                        <input
                          value={newOrder?.orderObject?.company}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              orderObject: {
                                ...newOrder?.orderObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Model Name:
                        </label>
                        <input
                          value={newOrder?.modelName || ""}
                          onChange={async (e) => {
                            const input = e.target.value.toUpperCase();
                            setNewOrder({
                              ...newOrder,
                              modelName: input,
                            });

                            // Fetch model suggestions from API
                            if (input.length > 0 && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${input}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            } else {
                              setModelSuggestions([]);
                            }
                          }}
                          onFocus={async () => {
                            if (newOrder?.modelName && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${newOrder.modelName}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            }
                          }}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />

                        {/* Suggestions Dropdown */}
                        {Array.isArray(modelSuggestions) &&
                          modelSuggestions.length > 0 && (
                            <ul className="border rounded bg-white shadow max-h-40 overflow-auto mt-1">
                              {modelSuggestions.map((model, idx) => (
                                <li
                                  key={idx}
                                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setNewOrder({
                                      ...newOrder,
                                      modelName: model,
                                    });
                                    setModelSuggestions([]);
                                  }}
                                >
                                  {model}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Quantity:
                        </label>
                        <input
                          value={newOrder?.quantity}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              quantity: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>

                      {newOrder?.quantity ? (
                        <>
                          {(() => {
                            const fieldName =
                              newOrder.category === "MOBILE"
                                ? "IMEI"
                                : "serialNumber";

                            return Array.from({
                              length: newOrder.quantity,
                            }).map((_, index) => (
                              <div key={index} className="mb-4 relative">
                                <label className="text-gray-600 font-medium text-sm">
                                  {newOrder.category === "MOBILE"
                                    ? `IMEI Number ${index + 1}`
                                    : `Serial Number ${index + 1}`}
                                  :
                                </label>
                                <input
                                  value={
                                    newOrder?.orderObject?.[fieldName]?.[
                                      index
                                    ] || []
                                  }
                                  onChange={async (e) => {
                                    const val = e.target.value.toUpperCase();
                                    const updated = [
                                      ...(newOrder?.orderObject?.[fieldName] ||
                                        []),
                                    ];
                                    updated[index] = val;

                                    setNewOrder({
                                      ...newOrder,
                                      orderObject: {
                                        ...newOrder.orderObject,
                                        [fieldName]: updated,
                                      },
                                    });

                                    if (newOrder.modelName) {
                                      try {
                                        const res = await axios.get(
                                          `https://shop-software.onrender.com/api/product/serial-suggestions?modelName=${newOrder.modelName}&query=${val}&category=${newOrder.category}`
                                        );
                                        setSerialSuggestions(
                                          Array.isArray(res.data)
                                            ? res.data
                                            : []
                                        );
                                        setFocusedFieldIndex(index);
                                      } catch (err) {
                                        console.error(
                                          "Serial suggestion error:",
                                          err
                                        );
                                        setSerialSuggestions([]);
                                      }
                                    }
                                  }}
                                  onFocus={async (e) => {
                                    const inputValue =
                                      e.target.value.toUpperCase();
                                    setFocusedFieldIndex(index); // to show suggestions only for this field

                                    if (
                                      newOrder.modelName &&
                                      newOrder.category
                                    ) {
                                      try {
                                        const res = await axios.get(
                                          `/api/product/serial-suggestions?modelName=${newOrder.modelName}&query=${inputValue}&category=${newOrder.category}`
                                        );
                                        setSerialSuggestions(
                                          Array.isArray(res.data)
                                            ? res.data
                                            : []
                                        );
                                      } catch (err) {
                                        console.error(
                                          "Serial suggestion error:",
                                          err
                                        );
                                        setSerialSuggestions([]);
                                      }
                                    }
                                  }}
                                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                                  type="text"
                                />

                                {/* Show suggestion only for the input in focus */}
                                {focusedFieldIndex === index &&
                                  Array.isArray(serialSuggestions) &&
                                  serialSuggestions.length > 0 && (
                                    <ul className="absolute z-10 bg-white border w-full rounded mt-1 shadow max-h-40 overflow-auto">
                                      {serialSuggestions.map((item, idx) => (
                                        <li
                                          key={idx}
                                          onClick={() => {
                                            const updated = [
                                              ...(newOrder?.orderObject?.[
                                                fieldName
                                              ] || []),
                                            ];
                                            updated[index] = item;
                                            setNewOrder({
                                              ...newOrder,
                                              orderObject: {
                                                ...newOrder.orderObject,
                                                [fieldName]: updated,
                                              },
                                            });
                                            setSerialSuggestions([]);
                                            setFocusedFieldIndex(null);
                                          }}
                                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                              </div>
                            ));
                          })()}
                        </>
                      ) : null}
                    </div>
                  </div>
                ) : newOrder?.category == "TV" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      TV Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Company:
                        </label>
                        <input
                          value={newOrder?.orderObject?.company}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              orderObject: {
                                ...newOrder?.orderObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Model Name:
                        </label>
                        <input
                          value={newOrder?.modelName || ""}
                          onChange={async (e) => {
                            const input = e.target.value.toUpperCase();
                            setNewOrder({
                              ...newOrder,
                              modelName: input,
                            });

                            // Fetch model suggestions from API
                            if (input.length > 0 && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${input}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            } else {
                              setModelSuggestions([]);
                            }
                          }}
                          onFocus={async () => {
                            if (newOrder?.modelName && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${newOrder.modelName}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            }
                          }}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />

                        {/* Suggestions Dropdown */}
                        {Array.isArray(modelSuggestions) &&
                          modelSuggestions.length > 0 && (
                            <ul className="border rounded bg-white shadow max-h-40 overflow-auto mt-1">
                              {modelSuggestions.map((model, idx) => (
                                <li
                                  key={idx}
                                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setNewOrder({
                                      ...newOrder,
                                      modelName: model,
                                    });
                                    setModelSuggestions([]);
                                  }}
                                >
                                  {model}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Quantity:
                        </label>
                        <input
                          value={newOrder?.quantity}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              quantity: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      {newOrder?.quantity ? (
                        <>
                          {(() => {
                            const fieldName =
                              newOrder.category === "MOBILE"
                                ? "IMEI"
                                : "serialNumber";

                            return Array.from({
                              length: newOrder.quantity,
                            }).map((_, index) => (
                              <div key={index} className="mb-4 relative">
                                <label className="text-gray-600 font-medium text-sm">
                                  {fieldName === "IMEI"
                                    ? `IMEI Number ${index + 1}`
                                    : `Serial Number ${index + 1}`}
                                  :
                                </label>

                                {/* Input field for IMEI/Serial */}
                                <input
                                  value={
                                    newOrder?.orderObject?.[fieldName]?.[
                                      index
                                    ] || ""
                                  }
                                  onChange={async (e) => {
                                    const val = e.target.value.toUpperCase();
                                    const updated = [
                                      ...(newOrder?.orderObject?.[fieldName] ||
                                        []),
                                    ];
                                    updated[index] = val;

                                    setNewOrder({
                                      ...newOrder,
                                      orderObject: {
                                        ...newOrder.orderObject,
                                        [fieldName]: updated,
                                      },
                                    });

                                    // Fetch suggestions only if modelName exists
                                    if (newOrder.modelName) {
                                      try {
                                        const res = await axios.get(
                                          `https://shop-software.onrender.com/api/product/serial-suggestions?modelName=${encodeURIComponent(
                                            newOrder.modelName
                                          )}&query=${encodeURIComponent(
                                            val
                                          )}&category=${newOrder.category}`
                                        );
                                        setSerialSuggestions(
                                          Array.isArray(res.data)
                                            ? res.data
                                            : []
                                        );
                                        setFocusedFieldIndex(index);
                                      } catch (err) {
                                        console.error(
                                          "Serial suggestion error:",
                                          err
                                        );
                                        setSerialSuggestions([]);
                                      }
                                    }
                                  }}
                                  onFocus={async (e) => {
                                    const inputValue =
                                      e.target.value.toUpperCase();
                                    setFocusedFieldIndex(index);

                                    if (
                                      newOrder.modelName &&
                                      newOrder.category
                                    ) {
                                      try {
                                        const res = await axios.get(
                                          `https://shop-software.onrender.com/api/product/serial-suggestions?modelName=${encodeURIComponent(
                                            newOrder.modelName
                                          )}&query=${encodeURIComponent(
                                            inputValue
                                          )}&category=${newOrder.category}`
                                        );
                                        setSerialSuggestions(
                                          Array.isArray(res.data)
                                            ? res.data
                                            : []
                                        );
                                      } catch (err) {
                                        console.error(
                                          "Serial suggestion error:",
                                          err
                                        );
                                        setSerialSuggestions([]);
                                      }
                                    }
                                  }}
                                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                                  type="text"
                                />

                                {/* Suggestions dropdown */}
                                {focusedFieldIndex === index &&
                                  Array.isArray(serialSuggestions) &&
                                  serialSuggestions.length > 0 && (
                                    <ul className="absolute z-10 bg-white border w-full rounded mt-1 shadow max-h-40 overflow-auto">
                                      {serialSuggestions.map((item, idx) => (
                                        <li
                                          key={idx}
                                          onClick={() => {
                                            const updated = [
                                              ...(newOrder?.orderObject?.[
                                                fieldName
                                              ] || []),
                                            ];
                                            updated[index] = item;

                                            setNewOrder({
                                              ...newOrder,
                                              orderObject: {
                                                ...newOrder.orderObject,
                                                [fieldName]: updated,
                                              },
                                            });

                                            setSerialSuggestions([]);
                                            setFocusedFieldIndex(null);
                                          }}
                                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                              </div>
                            ));
                          })()}
                        </>
                      ) : null}
                    </div>
                  </div>
                ) : newOrder?.category == "WASHING MACHINE" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Washing Machine Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Company:
                        </label>
                        <input
                          value={newOrder?.orderObject?.company}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              orderObject: {
                                ...newOrder?.orderObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Model Name:
                        </label>
                        <input
                          value={newOrder?.modelName || ""}
                          onChange={async (e) => {
                            const input = e.target.value.toUpperCase();
                            setNewOrder({
                              ...newOrder,
                              modelName: input,
                            });

                            // Fetch model suggestions from API
                            if (input.length > 0 && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${input}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            } else {
                              setModelSuggestions([]);
                            }
                          }}
                          onFocus={async () => {
                            if (newOrder?.modelName && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${newOrder.modelName}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            }
                          }}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />

                        {/* Suggestions Dropdown */}
                        {Array.isArray(modelSuggestions) &&
                          modelSuggestions.length > 0 && (
                            <ul className="border rounded bg-white shadow max-h-40 overflow-auto mt-1">
                              {modelSuggestions.map((model, idx) => (
                                <li
                                  key={idx}
                                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setNewOrder({
                                      ...newOrder,
                                      modelName: model,
                                    });
                                    setModelSuggestions([]);
                                  }}
                                >
                                  {model}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>

                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Quantity:
                        </label>
                        <input
                          value={newOrder?.quantity}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              quantity: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>

                      {newOrder?.quantity ? (
                        <>
                          {(() => {
                            const fieldName =
                              newOrder.category === "MOBILE"
                                ? "IMEI"
                                : "serialNumber";

                            return Array.from({
                              length: newOrder.quantity,
                            }).map((_, index) => (
                              <div key={index} className="mb-4 relative">
                                <label className="text-gray-600 font-medium text-sm">
                                  {fieldName === "IMEI"
                                    ? `IMEI Number ${index + 1}`
                                    : `Serial Number ${index + 1}`}
                                  :
                                </label>

                                {/* Input field for IMEI/Serial */}
                                <input
                                  value={
                                    newOrder?.orderObject?.[fieldName]?.[
                                      index
                                    ] || ""
                                  }
                                  onChange={async (e) => {
                                    const val = e.target.value.toUpperCase();
                                    const updated = [
                                      ...(newOrder?.orderObject?.[fieldName] ||
                                        []),
                                    ];
                                    updated[index] = val;

                                    setNewOrder({
                                      ...newOrder,
                                      orderObject: {
                                        ...newOrder.orderObject,
                                        [fieldName]: updated,
                                      },
                                    });

                                    // Fetch suggestions only if modelName exists
                                    if (newOrder.modelName) {
                                      try {
                                        const res = await axios.get(
                                          `https://shop-software.onrender.com/api/product/serial-suggestions?modelName=${encodeURIComponent(
                                            newOrder.modelName
                                          )}&query=${encodeURIComponent(
                                            val
                                          )}&category=${newOrder.category}`
                                        );
                                        setSerialSuggestions(
                                          Array.isArray(res.data)
                                            ? res.data
                                            : []
                                        );
                                        setFocusedFieldIndex(index);
                                      } catch (err) {
                                        console.error(
                                          "Serial suggestion error:",
                                          err
                                        );
                                        setSerialSuggestions([]);
                                      }
                                    }
                                  }}
                                  onFocus={async (e) => {
                                    const inputValue =
                                      e.target.value.toUpperCase();
                                    setFocusedFieldIndex(index);

                                    if (
                                      newOrder.modelName &&
                                      newOrder.category
                                    ) {
                                      try {
                                        const res = await axios.get(
                                          `https://shop-software.onrender.com/api/product/serial-suggestions?modelName=${encodeURIComponent(
                                            newOrder.modelName
                                          )}&query=${encodeURIComponent(
                                            inputValue
                                          )}&category=${newOrder.category}`
                                        );
                                        setSerialSuggestions(
                                          Array.isArray(res.data)
                                            ? res.data
                                            : []
                                        );
                                      } catch (err) {
                                        console.error(
                                          "Serial suggestion error:",
                                          err
                                        );
                                        setSerialSuggestions([]);
                                      }
                                    }
                                  }}
                                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                                  type="text"
                                />

                                {/* Suggestions dropdown */}
                                {focusedFieldIndex === index &&
                                  Array.isArray(serialSuggestions) &&
                                  serialSuggestions.length > 0 && (
                                    <ul className="absolute z-10 bg-white border w-full rounded mt-1 shadow max-h-40 overflow-auto">
                                      {serialSuggestions.map((item, idx) => (
                                        <li
                                          key={idx}
                                          onClick={() => {
                                            const updated = [
                                              ...(newOrder?.orderObject?.[
                                                fieldName
                                              ] || []),
                                            ];
                                            updated[index] = item;

                                            setNewOrder({
                                              ...newOrder,
                                              orderObject: {
                                                ...newOrder.orderObject,
                                                [fieldName]: updated,
                                              },
                                            });

                                            setSerialSuggestions([]);
                                            setFocusedFieldIndex(null);
                                          }}
                                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                              </div>
                            ));
                          })()}
                        </>
                      ) : null}
                    </div>
                  </div>
                ) : newOrder?.category == "FRIDGE" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Fridge Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Company:
                        </label>
                        <input
                          value={newOrder?.orderObject?.company}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              orderObject: {
                                ...newOrder?.orderObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Model Name:
                        </label>
                        <input
                          value={newOrder?.modelName || ""}
                          onChange={async (e) => {
                            const input = e.target.value.toUpperCase();
                            setNewOrder({
                              ...newOrder,
                              modelName: input,
                            });

                            // Fetch model suggestions from API
                            if (input.length > 0 && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${input}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            } else {
                              setModelSuggestions([]);
                            }
                          }}
                          onFocus={async () => {
                            if (newOrder?.modelName && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${newOrder.modelName}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            }
                          }}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />

                        {/* Suggestions Dropdown */}
                        {Array.isArray(modelSuggestions) &&
                          modelSuggestions.length > 0 && (
                            <ul className="border rounded bg-white shadow max-h-40 overflow-auto mt-1">
                              {modelSuggestions.map((model, idx) => (
                                <li
                                  key={idx}
                                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setNewOrder({
                                      ...newOrder,
                                      modelName: model,
                                    });
                                    setModelSuggestions([]);
                                  }}
                                >
                                  {model}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Quantity:
                        </label>
                        <input
                          value={newOrder?.quantity}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              quantity: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>

                      {newOrder?.quantity ? (
                        <>
                          {(() => {
                            const fieldName =
                              newOrder.category === "MOBILE"
                                ? "IMEI"
                                : "serialNumber";

                            return Array.from({
                              length: newOrder.quantity,
                            }).map((_, index) => (
                              <div key={index} className="mb-4 relative">
                                <label className="text-gray-600 font-medium text-sm">
                                  {fieldName === "IMEI"
                                    ? `IMEI Number ${index + 1}`
                                    : `Serial Number ${index + 1}`}
                                  :
                                </label>

                                {/* Input field for IMEI/Serial */}
                                <input
                                  value={
                                    newOrder?.orderObject?.[fieldName]?.[
                                      index
                                    ] || ""
                                  }
                                  onChange={async (e) => {
                                    const val = e.target.value.toUpperCase();
                                    const updated = [
                                      ...(newOrder?.orderObject?.[fieldName] ||
                                        []),
                                    ];
                                    updated[index] = val;

                                    setNewOrder({
                                      ...newOrder,
                                      orderObject: {
                                        ...newOrder.orderObject,
                                        [fieldName]: updated,
                                      },
                                    });

                                    // Fetch suggestions only if modelName exists
                                    if (newOrder.modelName) {
                                      try {
                                        const res = await axios.get(
                                          `https://shop-software.onrender.com/api/product/serial-suggestions?modelName=${encodeURIComponent(
                                            newOrder.modelName
                                          )}&query=${encodeURIComponent(
                                            val
                                          )}&category=${newOrder.category}`
                                        );
                                        setSerialSuggestions(
                                          Array.isArray(res.data)
                                            ? res.data
                                            : []
                                        );
                                        setFocusedFieldIndex(index);
                                      } catch (err) {
                                        console.error(
                                          "Serial suggestion error:",
                                          err
                                        );
                                        setSerialSuggestions([]);
                                      }
                                    }
                                  }}
                                  onFocus={async (e) => {
                                    const inputValue =
                                      e.target.value.toUpperCase();
                                    setFocusedFieldIndex(index);

                                    if (
                                      newOrder.modelName &&
                                      newOrder.category
                                    ) {
                                      try {
                                        const res = await axios.get(
                                          `https://shop-software.onrender.com/api/product/serial-suggestions?modelName=${encodeURIComponent(
                                            newOrder.modelName
                                          )}&query=${encodeURIComponent(
                                            inputValue
                                          )}&category=${newOrder.category}`
                                        );
                                        setSerialSuggestions(
                                          Array.isArray(res.data)
                                            ? res.data
                                            : []
                                        );
                                      } catch (err) {
                                        console.error(
                                          "Serial suggestion error:",
                                          err
                                        );
                                        setSerialSuggestions([]);
                                      }
                                    }
                                  }}
                                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                                  type="text"
                                />

                                {/* Suggestions dropdown */}
                                {focusedFieldIndex === index &&
                                  Array.isArray(serialSuggestions) &&
                                  serialSuggestions.length > 0 && (
                                    <ul className="absolute z-10 bg-white border w-full rounded mt-1 shadow max-h-40 overflow-auto">
                                      {serialSuggestions.map((item, idx) => (
                                        <li
                                          key={idx}
                                          onClick={() => {
                                            const updated = [
                                              ...(newOrder?.orderObject?.[
                                                fieldName
                                              ] || []),
                                            ];
                                            updated[index] = item;

                                            setNewOrder({
                                              ...newOrder,
                                              orderObject: {
                                                ...newOrder.orderObject,
                                                [fieldName]: updated,
                                              },
                                            });

                                            setSerialSuggestions([]);
                                            setFocusedFieldIndex(null);
                                          }}
                                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                              </div>
                            ));
                          })()}
                        </>
                      ) : null}
                    </div>
                  </div>
                ) : newOrder?.category == "OTHERS" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Product Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Company:
                        </label>
                        <input
                          value={newOrder?.orderObject?.company}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              orderObject: {
                                ...newOrder?.orderObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Model Name:
                        </label>
                        <input
                          value={newOrder?.modelName || ""}
                          onChange={async (e) => {
                            const input = e.target.value.toUpperCase();
                            setNewOrder({
                              ...newOrder,
                              modelName: input,
                            });

                            // Fetch model suggestions from API
                            if (input.length > 0 && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${input}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            } else {
                              setModelSuggestions([]);
                            }
                          }}
                          onFocus={async () => {
                            if (newOrder?.modelName && newOrder?.category) {
                              try {
                                const res = await axios.get(
                                  `https://shop-software.onrender.com/api/product/model-suggestions?category=${newOrder.category}&query=${newOrder.modelName}`
                                );
                                setModelSuggestions(
                                  Array.isArray(res.data) ? res.data : []
                                );
                              } catch (err) {
                                console.error("Model suggestion error:", err);
                                setModelSuggestions([]);
                              }
                            }
                          }}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />

                        {/* Suggestions Dropdown */}
                        {Array.isArray(modelSuggestions) &&
                          modelSuggestions.length > 0 && (
                            <ul className="border rounded bg-white shadow max-h-40 overflow-auto mt-1">
                              {modelSuggestions.map((model, idx) => (
                                <li
                                  key={idx}
                                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setNewOrder({
                                      ...newOrder,
                                      modelName: model,
                                    });
                                    setModelSuggestions([]);
                                  }}
                                >
                                  {model}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Quantity:
                        </label>
                        <input
                          value={newOrder?.quantity}
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
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Date Of Order:
                        </label>
                        <input
                          value={
                            newOrder?.date
                              ? new Date(newOrder?.date).toLocaleDateString(
                                  "en-IN"
                                )
                              : ""
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Time:
                        </label>
                        <input
                          value={
                            newOrder?.date
                              ? new Date(newOrder?.date).toLocaleTimeString(
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Customer Details:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Name:
                    </label>
                    <input
                      value={newOrder?.customerObject?.name}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          customerObject: {
                            ...newOrder?.customerObject,
                            name: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Phone number (Primary):
                    </label>
                    <input
                      value={newOrder?.customerObject?.phoneNumber}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          customerObject: {
                            ...newOrder?.customerObject,
                            phoneNumber: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Phone number (Secondary):
                    </label>
                    <input
                      value={newOrder?.customerObject?.secondaryNumber}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          customerObject: {
                            ...newOrder?.customerObject,
                            secondaryNumber: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      E-mail:
                    </label>
                    <input
                      value={newOrder?.customerObject?.email}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          customerObject: {
                            ...newOrder?.customerObject,
                            email: e.target.value,
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Address:
                    </label>
                    <input
                      value={newOrder?.customerObject?.address}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          customerObject: {
                            ...newOrder?.customerObject,
                            address: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Payment Details:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Price:
                    </label>
                    <input
                      value={newOrder?.paymentObject?.price}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          paymentObject: {
                            ...newOrder?.paymentObject,
                            price: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Discounts:
                    </label>
                    <input
                      value={newOrder?.paymentObject?.discount}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          paymentObject: {
                            ...newOrder?.paymentObject,
                            discount: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      CGST (in %):
                    </label>
                    <input
                      value={newOrder?.paymentObject?.CGST}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          paymentObject: {
                            ...newOrder?.paymentObject,
                            CGST: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      SGST (in %):
                    </label>
                    <input
                      value={newOrder?.paymentObject?.SGST}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          paymentObject: {
                            ...newOrder?.paymentObject,
                            SGST: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Payment Type:
                    </label>
                    <select
                      value={newOrder?.paymentObject?.paymentType}
                      onChange={(e) => {
                        setNewOrder({
                          ...newOrder,
                          paymentObject: {
                            ...newOrder?.paymentObject,
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
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Remarks:
                    </label>
                    <input
                      value={newOrder?.paymentObject?.remarks}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          paymentObject: {
                            ...newOrder?.paymentObject,
                            remarks: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                </div>
                {newOrder?.paymentObject?.paymentType ==
                "THIRD PARTY FINANCE" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Third Party Finance
                    </h2>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6  pb-2">
                      Finance Number: {financeList.length + 1}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Downpayment:
                        </label>
                        <input
                          value={newOrder?.tpf?.downPayment}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                downPayment: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Number of EMI:
                        </label>
                        <input
                          value={newOrder?.tpf?.numberOfEMI}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                numberOfEMI: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          File Charge:
                        </label>
                        <input
                          value={newOrder?.tpf?.fileCharge}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                fileCharge: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Intrest rate monthly(%):
                        </label>
                        <input
                          value={newOrder?.tpf?.intrest}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                intrest: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Amount of EMI:
                        </label>
                        <input
                          value={newOrder?.tpf?.amountOfEMI || ""}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                amountOfEMI: e.target.value,
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Next EMI date:
                        </label>
                        <input
                          value={newOrder?.tpf?.upcomingDate || ""}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                upcomingDate: e.target.value,
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="date"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Remarks:
                        </label>
                        <input
                          value={newOrder?.tpf?.remarks}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                remarks: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>

                      {showModal == "Add" ? (
                        <div>
                          <label className="text-gray-600 font-medium text-sm">
                            Customer Image:
                          </label>
                          <ImageUploader
                            setNewStaff={setNewOrder}
                            newStaff={newOrder}
                            imageKey="customerImage"
                          />
                        </div>
                      ) : null}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Guaranteer Information:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Guaranteer Name:
                        </label>
                        <input
                          value={newOrder?.tpf?.guaranteerName}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                guaranteerName: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Phone Number:
                        </label>
                        <input
                          value={newOrder?.tpf?.guaranteerPhoneNumber}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                guaranteerPhoneNumber:
                                  e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 font-medium text-sm">
                          Address:
                        </label>
                        <input
                          value={newOrder?.tpf?.guaranteerAddress}
                          onChange={(e) =>
                            setNewOrder({
                              ...newOrder,
                              tpf: {
                                ...newOrder?.tpf,
                                guaranteerAddress: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      {showModal == "Add" ? (
                        <div>
                          <label className="text-gray-600 font-medium text-sm">
                            Guaranteer Image:
                          </label>
                          <ImageUploader
                            setNewStaff={setNewOrder}
                            newStaff={newOrder}
                            imageKey="guaranteerImage"
                          />
                        </div>
                      ) : null}
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
                      className="px-4 py-2 bg-[#2463EB] w-[15%] text-white rounded-md hover:bg-[#1C4ED8] disabled:opacity-50 hover:cursor-pointer"
                    >
                      {"Save"}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Order;
