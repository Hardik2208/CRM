import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FileText, Table } from "lucide-react";
import { useUserRole } from "../components/hooks";
import Loader from "../components/loader";

import Sidebar from "../components/Sidebar";

import { exportPDF, exportExcel } from "../components/Pdf";

const Product = () => {
  useEffect(() => {
    getProductData();
  }, []);
  const [showModal, setShowModal] = useState("");
  const [showModal2, setShowModal2] = useState("");
  const [productList, setProductList] = useState([]);
  const [newProductOBJ, setNewProductOBJ] = useState({ productObject: {} });
  const [search, setSearch] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

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
          `https://shop-software.onrender.com/api/porduct/Search`,
          { searchTerm } //  Object format
        );
        setProductList(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Search Error:", err); // Shows error object in console
    }
  };

  const getCategory = () => {
    axios
      .get("https://shop-software.onrender.com/api/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategory();
  }, []);

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
      .then((res) => {
        setProductList(res.data.reverse());
        setLoading(false);
      })
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

  const addProduct = async () => {
    try {
      const res = await axios.post(
        "https://shop-software.onrender.com/api/product",
        newProductOBJ
      );
      setShowModal("");
      setNewProductOBJ({ productObject: {} }); // Show success message
      getProductData(); // Refresh product list
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data); // Duplicate model name
      } else {
        alert("Something went wrong while adding the product.");
      }
      console.log(err);
    }
  };

  const addCategory = async () => {
    try {
      const res = await axios.post(
        "https://shop-software.onrender.com/api/category",
        category
      );
      setShowModal2(false);
      setCategory({});
      getCategory();
      getProductData();
    } catch (err) {
      alert("Something went wrong while adding the product.");
      console.log(err);
    }
  };

  const role = useUserRole();

  if (loading) return <Loader />;

  // UI Components
  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-white h-[100vh] overflow-auto w-[90%]">
          <div className="flex justify-between items-center mb-6 gap-1">
            <h1 className="text-3xl font-bold">Stocks</h1>

            <div className="w-[60%] flex justify-end text-sm gap-1">
              {role == "admin" ? (
                <button
                  onClick={() => exportExcel(productList)}
                  className="bg-[#2463EB] text-white px-4 py-2 rounded-md hover:bg-[#1C4ED8] hover:cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="mr-1">
                    <Table />
                  </span>{" "}
                  Export to Excel
                </button>
              ) : null}
              <button
                onClick={() => setShowModal2(true)}
                className="bg-[#2463EB] text-white px-4 py-2 rounded-md hover:bg-[#1C4ED8] hover:cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="mr-1 ">+</span> Add New Category
              </button>

              <button
                onClick={() => setShowModal("Add")}
                className="bg-[#2463EB] text-white px-4 py-2 rounded-md hover:bg-[#1C4ED8] hover:cursor-pointer flex items-center justify-center gap-2"
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
                {role == "admin" ? (
                  <tr className="w-[100%]">
                    {[
                      "Category",
                      "Company",
                      "Product Name",
                      "Selling Price",
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
                ) : (
                  <tr className="w-[100%]">
                    {[
                      "Category",
                      "Company",
                      "Product Name",
                      "Selling Price",
                      "Quanity",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productList.map((product, index) => (
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium">
                      {product?.category}
                    </td>
                    <td className="px-6 py-3 font-medium">
                      {product?.productObject?.company}
                    </td>
                    <td className="px-6 py-3">{product?.modelName}</td>
                    <td className="px-6 py-3">{product?.sellingPrice}</td>
                    {role == "admin" ? (
                      <td className="px-6 py-3">{product?.amount}</td>
                    ) : null}
                    <td className="px-6 py-3">{product?.quantity}</td>
                    {role == "admin" ? (
                      <td className="px-6 py-3">
                        <button
                          onClick={() => {
                            setNewProductOBJ(product);
                            setShowModal("Edit");
                          }}
                          className="text-blue-500 hover:text-blue-800 hover:cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    ) : null}
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
                          category: e.target.value.toUpperCase(),
                        });
                      }}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      name=""
                      id=""
                    >
                      <option value="">Choose Option</option>
                      {category.map((i) => (
                        <option value={i.name}>{i.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {newProductOBJ.category ? (<>
                {newProductOBJ?.category !== "" ? (
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
                      {newProductOBJ?.quantity
                        ? (() => {
                            const selectedCategory = category.find(
                              (c) => c.name === newProductOBJ?.category
                            );

                            const inputFieldKey = selectedCategory?.inputField;

                            if (!inputFieldKey || !newProductOBJ?.quantity)
                              return null;

                            return Array.from({
                              length: newProductOBJ.quantity,
                            }).map((_, index) => (
                              <div key={index} className="mb-4">
                                <label className="text-gray-600 font-medium text-sm">
                                  {inputFieldKey.toUpperCase()} {index + 1}:
                                </label>
                                <input
                                  value={
                                    newProductOBJ?.productObject?.[
                                      inputFieldKey
                                    ]?.[index] || ""
                                  }
                                  onChange={(e) => {
                                    const updatedValues = [
                                      ...(newProductOBJ?.productObject?.[
                                        inputFieldKey
                                      ] || []),
                                    ];
                                    updatedValues[index] =
                                      e.target.value.toUpperCase();

                                    setNewProductOBJ({
                                      ...newProductOBJ,
                                      productObject: {
                                        ...newProductOBJ.productObject,
                                        [inputFieldKey]: updatedValues,
                                      },
                                    });
                                  }}
                                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                                  type="text"
                                />
                              </div>
                            ));
                          })()
                        : null}
                    </div>
                  </div>
                ): null}
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
                  <div className="">
                    <label
                      className="text-gray-600 font-medium text-sm"
                      htmlFor=""
                    >
                      Selling Price:
                    </label>
                    <input
                      value={newProductOBJ?.sellingPrice}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          sellingPrice: e.target.value,
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div></>):null}
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
                      className="px-4 py-2 bg-[#615ae7] w-[15%] text-white rounded-md hover:bg-[#1C4ED8] disabled:opacity-50 hover:cursor-pointer"
                    >
                      {"Save"}
                    </button>
                  ) : showModal == "Edit" ? (
                    <>
                      <button
                        onClick={() => {
                          deleteProduct(newProductOBJ?._id);
                        }}
                        className="px-4 py-2 bg-[#2463EB] w-[15%] text-white rounded-md hover:bg-[#1C4ED8] disabled:opacity-50 hover:cursor-pointer"
                      >
                        {"Delete"}
                      </button>
                      <button
                        onClick={() => {
                          updateProduct();
                        }}
                        className="px-4 py-2 bg-[#2463EB] w-[15%] text-white rounded-md hover:bg-[#1C4ED8] disabled:opacity-50 hover:cursor-pointer"
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
      {showModal2 ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[80%] max-h-[70vh] overflow-auto max-w-4xl z-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Add Category:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="">
                <label className="text-gray-600 font-medium text-sm" htmlFor="">
                  Category Name:
                </label>
                <input
                  onChange={(e) =>
                    setCategory({
                      ...category,
                      name: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div className="">
                <label className="text-gray-600 font-medium text-sm" htmlFor="">
                  Category:
                </label>
                <select
                  onChange={(e) => {
                    setCategory({
                      ...category,
                      inputField: e.target.value,
                    });
                  }}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  name=""
                  id=""
                >
                  <option value="">Choose Option</option>
                  <option value="IMEI">IMEI</option>
                  <option value="serialNumber">Serial Number</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  addCategory();
                }}
                className="px-4 py-2 bg-[#615ae7] w-[15%] text-white rounded-md hover:bg-[#1C4ED8] disabled:opacity-50 hover:cursor-pointer"
              >
                {"Save"}
              </button>
              <button
                onClick={() => {
                  setShowModal2(false);
                  setCategory({});
                }}
                className="px-4 py-2 w-[15%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Product;
