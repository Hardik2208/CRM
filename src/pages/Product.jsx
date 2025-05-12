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
        `https://shop-software.onrender.com/api/product/${newProductOBJ._id}`,
        newProductOBJ
      )
      .then((res) => getProductData())
      .catch((err) => console.log(err));
  };

  const getProductData = () => {
    axios
      .get("https://shop-software.onrender.com/api/product")
      .then((res) => setProductList(res.data))
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
    <div className="p-6 h-[100vh] bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={() => setShowModal("Add")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
        >
          Add New Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="w-[100%] bg-gray-50 ">
            <tr className="w-[100%]">
              {["S.No", "Category", "Product Name", "Quanity", "Action"].map(
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
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{product.category}</td>
                <td className="px-6 py-3">{product.modelName}</td>
                <td className="px-6 py-3">{product.quantity}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      setNewProductOBJ(product);
                      setShowModal("Edit");
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
          <div className="bg-white rounded-lg p-6 w-[80%] max-h-[70vh] overflow-auto max-w-4xl z-10">
            <h2 className="text-xl font-bold mb-4">Product Details:</h2>
            <div className="w-[100%] h-[10vh] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Category:</label>
                <select
                  value={newProductOBJ.category}
                  onChange={(e) => {
                    setNewProductOBJ({
                      ...newProductOBJ,
                      category: e.target.value.toUpperCase(),
                    });
                  }}
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
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
            {newProductOBJ.category == "MOBILE" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Mobile Details:</h2>
                <div className="w-[100%] h-[35vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newProductOBJ?.productObject?.company}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newProductOBJ.modelName}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Ram,Rom fomat(ram/rom):</label>
                    <input
                      value={newProductOBJ?.productObject?.specs}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            specs: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Colour:</label>
                    <input
                      value={newProductOBJ.productObject.color}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            color: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newProductOBJ.quantity}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          quantity: e.target.value,
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newProductOBJ.productObject.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : newProductOBJ.category == "TV" ? (
              <div>
                <h2 className="text-xl font-bold my-4">TV Details:</h2>
                <div className="w-[100%] h-[35vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newProductOBJ.productObject.company}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newProductOBJ.modelName}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Dimensions (in inch):</label>
                    <input
                      value={newProductOBJ.productObject.dimensions}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            dimensions: e.target.value,
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newProductOBJ.quantity}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          quantity: e.target.value,
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newProductOBJ.productObject.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : newProductOBJ.category == "WASHING MACHINE" ? (
              <div>
                <h2 className="text-xl font-bold my-4">
                  Washing Machine Details:
                </h2>
                <div className="w-[100%] h-[35vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newProductOBJ.productObject.company}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newProductOBJ.modelName}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Dimensions (in liters):</label>
                    <input
                      value={newProductOBJ.productObject.dimensions}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            dimensions: e.target.value,
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Type:</label>
                    <select
                      value={newProductOBJ.productObject.type}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            type: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
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
                      value={newProductOBJ.quantity}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          quantity: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newProductOBJ.productObject.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : newProductOBJ.category == "FRIDGE" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Fridge Details:</h2>
                <div className="w-[100%] h-[35vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newProductOBJ.productObject.company}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newProductOBJ.modelName}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Dimensions (in liters):</label>
                    <input
                      value={newProductOBJ.productObject.dimensions}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            dimensions: e.target.value,
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Doors:</label>
                    <input
                      value={newProductOBJ.productObject.doors}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            doors: e.target.value,
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newProductOBJ.dimensions}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          quantity: e.target.value,
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newProductOBJ.productObject.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : newProductOBJ.category == "OTHERS" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Product Details:</h2>
                <div className="w-[100%] max-h-[35vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newProductOBJ.productObject.company}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          productObject: {
                            ...newProductOBJ.productObject,
                            company: e.target.value.toUpperCase(),
                          },
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newProductOBJ.modelName}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          modelName: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newProductOBJ.quantity}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          quantity: e.target.value,
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newProductOBJ.productObject.description}
                      onChange={(e) =>
                        setNewProductOBJ({
                          ...newProductOBJ,
                          description: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <h2 className="text-xl font-bold my-4">Mechant Purchased Price:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Amount:</label>
                <input
                  value={newProductOBJ.amount}
                  onChange={(e) =>
                    setNewProductOBJ({
                      ...newProductOBJ,
                      amount: e.target.value,
                    })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] uppercase w-[80%] pl-[1%] rounded-[5px]"
                  type="number"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4 w-[90%]">
              <button
                onClick={() => {
                  setShowModal(""), setNewProductOBJ({ productObject: {} });
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              {showModal == "Add" ? (
                <button
                  onClick={() => {
                    addProduct();
                  }}
                  className="px-4 py-2 bg-blue-500 w-[15%] text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Save"}
                </button>
              ) : showModal == "Edit" ? (
                <button
                  onClick={() => {
                    updateProduct();
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
    </div>
  );
};

export default Product;
