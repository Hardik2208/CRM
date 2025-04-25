import { React, useState, useContext } from "react";

function Invoice() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="p-6 bg-gray-100 overflow-y-auto">
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
            Generate New Invoice
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
                "Amount",
                "Discount",
                "Customer Name",
                "Phone Number",
                "Address",
                "Final Price",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">
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
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Category:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Appliance Name:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Model Number:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Serial Number:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Quantity:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Discounts:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Final Price:</label>
                <input
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>
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
                <label htmlFor="">Phone number:</label>
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
