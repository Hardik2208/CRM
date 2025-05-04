import { React, useState, useContext } from "react";

function Invoice() {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("Mobile");
  return (
    <div className="p-6 h-[100vh] bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
      <div className="w-[100%] flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Invoices</h1>
        <div className="w-[23%] flex">
          <button className="bg-green-500 text-white px-4 mr-[10%] py-2 rounded-md hover:bg-green-600 hover:cursor-pointer">
            Search
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
          >
            Generate Invoice
          </button>
        </div>
      </div>
      {/* Enquiry Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="w-[100%] bg-gray-50 ">
            <tr className="w-[100%]">
              {[
                "S.No",
                "Invoice No.",
                "Category",
                "Product",
                "Price",
                "Discount",
                "Tax (%)",
                "Total",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <button className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                  Edit
                </button>
                <button className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer ml-[10%]">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {showModal ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[60%] h-[80vh] overflow-y-scroll max-w-4xl z-10">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Invoice Number:</h2>
              <h2 className="text-xl font-bold mb-4 mr-[10%]">Date:</h2>
            </div>
            <h2 className="text-xl font-bold mb-4">Product Details:</h2>
            <div className="w-[100%] h-[10vh] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Category:</label>
                <select
                onChange= {(e)=>{
                  setCategory(e.target.value)
                }}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
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
            {category == "Mobile" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Mobile Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Ram,Rom fomat(ram/rom):</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Colour:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : category == "TV" ? (
              <div>
                <h2 className="text-xl font-bold my-4">TV Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Size:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : category == "Washing Machine" ? (
              <div>
                <h2 className="text-xl font-bold my-4">
                  Washing Machine Details:
                </h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Size (in liters):</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Type:</label>
                    <select
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
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
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : category == "Fridge" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Fridge Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Size (in liters):</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Doors:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : category == "Others" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Product Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <h2 className="text-xl font-bold my-4">Customer Details:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Name:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Phone Number:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">E-mail:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Address:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 w-[90%]">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 w-[15%] text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer">
                {"Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}{" "}
    </div>
  );
}

export default Invoice;
