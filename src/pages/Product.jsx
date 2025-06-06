import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FileText, Table } from "lucide-react";

import Sidebar from "../components/Sidebar";

import { exportPDF, exportExcel } from "../components/Pdf";

const Product = () => {
  useEffect(() => {
    getProductData();
  }, []);
  const [showModal, setShowModal] = useState("");
  const [productList, setProductList] = useState([]);
  const [newProductOBJ, setNewProductOBJ] = useState({ productObject: {} });
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
      {const res = await axios.post(
        `https://shop-software.onrender.com/api/product/Search`,
        { searchTerm } //  Object format
      );
      setProductList(res.data);}
    } catch (err) {
      console.error("Search Error:", err); // Shows error object in console
    }
  };


  const updateProduct = () => {
    setNewProductOBJ({ productObject: {} });
    setShowModal("");
    axios
      .put(
        `https://shop-software.onrender.com/api/product/${newProductOBJ?._id}`,
        newProductOBJ
      )
      .then((res) => getProductData())
      .catch((err) => console.log(err));
  };

  const getProductData = () => {
    axios
      .get("https://shop-software.onrender.com/api/product")
      .then((res) => setProductList(res.data.reverse()))
      .catch((err) => console.log(err));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`https://shop-software.onrender.com/api/product/${id}`)
      .then((res) => {
        getProductData();
        setShowModal("");
      })
      .catch((err) => console.log(err));
  };

  const addProduct = () => {
    setShowModal("");
    setNewProductOBJ({ productObject: {} });
    axios
      .post("https://shop-software.onrender.com/api/product", newProductOBJ)
      .then((res) => {
        getProductData();
      })
      .catch((err) => console.log(err));
  };

  // UI Components
  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-white h-[100vh] overflow-auto w-[90%]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Stocks</h1>

            <div className="w-[60%] flex justify-end">
              
              <button
                onClick={() => exportExcel(productList)}
                className="bg-[#615AE7] mx-1 text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer flex items-center justify-center"
              >
                <span className="mr-1">
                  <Table />
                </span>{" "}
                Export to Excel
              </button>
              <button
                onClick={() => setShowModal("Add")}
                className="bg-[#615AE7] text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer flex items-center justify-center"
              >
                <span className="mr-1 ">+</span> Add New Product
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

          {/* Product Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="w-[100%] bg-gray-50 ">
                <tr className="w-[100%]">
                  {[
                    "Category",
                    "Product Name",
                    "Price",
                    "Quanity",
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
                {productList.map((product, index) => (
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium">
                      {product?.category}
                    </td>

                    <td className="px-6 py-3">{product?.modelName}</td>
                    <td className="px-6 py-3">{product?.amount}</td>
                    <td className="px-6 py-3">{product?.quantity}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => {
                          setNewProductOBJ(product);
                          setShowModal("Edit");
                        }}
                        className="text-blue-500 hover:text-violet-500 hover:cursor-pointer"
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
              <div className="bg-white rounded-lg p-6 w-[80%] max-h-[70vh] overflow-auto max-w-4xl z-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Product Details:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="">
                    <label
                      className="text-gray-600 font-medium text-sm"
                      htmlFor=""
                    >
                      Category:
                    </label>
                    <select
                      value={newProductOBJ?.category}
                      onChange={(e) => {
                        setNewProductOBJ({
                          ...newProductOBJ,
                          category: e.target.value.toUpperCase(),
                        });
                      }}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      name=""
                      id=""
                    >
                      <option value="">Choose Option</option>
                      <option value="Mobile">Mobile</option>
                      <option value="TV">TV</option>
                      <option value="Fridge">Fridge</option>
                      <option value="Washing Machine">Washing Machine</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                {newProductOBJ?.category == "MOBILE" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Mobile Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Company:
                        </label>
                        <input
                          value={newProductOBJ?.productObject?.company}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              productObject: {
                                ...newProductOBJ?.productObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Model Name:
                        </label>
                        <input
                          value={newProductOBJ?.modelName}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              modelName: e.target.value.toUpperCase(),
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          IMEI Number:
                        </label>
                        <input
                          value={newProductOBJ?.productObject?.IMEI}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              productObject: {
                                ...newProductOBJ?.productObject,
                                IMEI: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Quantity:
                        </label>
                        <input
                          value={newProductOBJ?.quantity}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              quantity: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                ) : newProductOBJ?.category == "TV" ? (
                  <div>
                    <h2
                      className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2
                "
                    >
                      TV Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Company:
                        </label>
                        <input
                          value={newProductOBJ?.productObject?.company}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              productObject: {
                                ...newProductOBJ?.productObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Model Name:
                        </label>
                        <input
                          value={newProductOBJ?.modelName}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              modelName: e.target.value.toUpperCase(),
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Serial Number:
                        </label>
                        <input
                          value={newProductOBJ?.productObject?.serialNumber}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              productObject: {
                                ...newProductOBJ?.productObject,
                                serialNumber: e.target.value,
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Quantity:
                        </label>
                        <input
                          value={newProductOBJ?.quantity}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              quantity: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                ) : newProductOBJ?.category == "WASHING MACHINE" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Washing Machine Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Company:
                        </label>
                        <input
                          value={newProductOBJ?.productObject?.company}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              productObject: {
                                ...newProductOBJ?.productObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Model Name:
                        </label>
                        <input
                          value={newProductOBJ?.modelName}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              modelName: e.target.value.toUpperCase(),
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Serail Number:
                        </label>
                        <input
                          value={newProductOBJ?.productObject?.serialNumber}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              productObject: {
                                ...newProductOBJ?.productObject,
                                serialNumber: e.target.value,
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Quantity:
                        </label>
                        <input
                          value={newProductOBJ?.quantity}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              quantity: e.target.value.toUpperCase(),
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                ) : newProductOBJ?.category == "FRIDGE" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Fridge Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Company:
                        </label>
                        <input
                          value={newProductOBJ?.productObject?.company}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              productObject: {
                                ...newProductOBJ?.productObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Model Name:
                        </label>
                        <input
                          value={newProductOBJ?.modelName}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              modelName: e.target.value.toUpperCase(),
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Serial Number:
                        </label>
                        <input
                          value={newProductOBJ?.productObject?.serialNumber}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              productObject: {
                                ...newProductOBJ?.productObject,
                                serialNumber: e.target.value,
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Quantity:
                        </label>
                        <input
                          value={newProductOBJ?.dimensions}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              quantity: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                ) : newProductOBJ?.category == "OTHERS" ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Product Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Company:
                        </label>
                        <input
                          value={newProductOBJ?.productObject?.company}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              productObject: {
                                ...newProductOBJ?.productObject,
                                company: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Model Name:
                        </label>
                        <input
                          value={newProductOBJ?.modelName}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              modelName: e.target.value.toUpperCase(),
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label
                          className="text-gray-600 font-medium text-sm"
                          htmlFor=""
                        >
                          Quantity:
                        </label>
                        <input
                          value={newProductOBJ?.quantity}
                          onChange={(e) =>
                            setNewProductOBJ({
                              ...newProductOBJ,
                              quantity: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Mechant Purchased Price:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="">
                    <label
                      className="text-gray-600 font-medium text-sm"
                      htmlFor=""
                    >
                      Amount:
                    </label>
                    <input
                      value={newProductOBJ?.amount}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          amount: e.target.value,
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => {
                      setShowModal(""), setNewProductOBJ({ productObject: {} });
                    }}
                    className="px-4 py-2 w-[15%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
                  >
                    Cancel
                  </button>
                  {showModal == "Add" ? (
                    <button
                      onClick={() => {
                        addProduct();
                      }}
                      className="px-4 py-2 bg-[#615ae7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                    >
                      {"Save"}
                    </button>
                  ) : showModal == "Edit" ? (
                    <>
                      <button
                        onClick={() => {
                          deleteProduct(newProductOBJ?._id);
                        }}
                        className="px-4 py-2 bg-[#615AE7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                      >
                        {"Delete"}
                      </button>
                      <button
                        onClick={() => {
                          updateProduct();
                        }}
                        className="px-4 py-2 bg-[#615AE7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                      >
                        {"Update"}
                      </button>
                    </>
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

export default Product;
