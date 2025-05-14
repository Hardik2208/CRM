import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  useEffect(() => {
    getProductData();
  }, []);
  const [showModal, setShowModal] = useState("");
  const [productList, setProductList] = useState([]);
  const [newProductOBJ, setNewProductOBJ] = useState({ productObject: {} });

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
      .then((res) => {getProductData();setShowModal("")})
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
    <div className="p-6 h-[100vh] bg-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stocks</h1>
        <button
          onClick={() => setShowModal("Add")}
          className="bg-[#615AE7] text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer"
        >
          <span className="mr-1">+</span> Add New Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="w-[100%] bg-gray-50 ">
            <tr className="w-[100%]">
              {["Category", "Product Name", "Price", "Quanity", "Action"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productList.map((product, index) => (
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{product?.category}</td>

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
                <label className="text-gray-600 font-medium text-sm" htmlFor="">
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
                      Ram,Rom fomat(ram/rom):
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.specs}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ?.productObject,
                            specs: e.target.value.toUpperCase(),
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
                      Colour:
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.color}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ?.productObject,
                            color: e.target.value.toUpperCase(),
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
                  <div className="">
                    <label
                      className="text-gray-600 font-medium text-sm"
                      htmlFor=""
                    >
                      Description:
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
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
                      Dimensions (in inch):
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.dimensions}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ?.productObject,
                            dimensions: e.target.value,
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
                  <div className="">
                    <label
                      className="text-gray-600 font-medium text-sm"
                      htmlFor=""
                    >
                      Description:
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
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
                      Dimensions (in liters):
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.dimensions}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ?.productObject,
                            dimensions: e.target.value,
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
                      Type:
                    </label>
                    <select
                      value={newProductOBJ?.productObject?.type}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ?.productObject,
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
                  <div className="">
                    <label
                      className="text-gray-600 font-medium text-sm"
                      htmlFor=""
                    >
                      Description:
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
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
                      Dimensions (in liters):
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.dimensions}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ?.productObject,
                            dimensions: e.target.value,
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
                      Doors:
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.doors}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ?.productObject,
                            doors: e.target.value,
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
                  <div className="">
                    <label
                      className="text-gray-600 font-medium text-sm"
                      htmlFor=""
                    >
                      Description:
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
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
                  <div className="">
                    <label
                      className="text-gray-600 font-medium text-sm"
                      htmlFor=""
                    >
                      Description:
                    </label>
                    <input
                      value={newProductOBJ?.productObject?.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
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
                <label className="text-gray-600 font-medium text-sm" htmlFor="">
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
  );
};

export default Product;
