import { React, useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { FileText, Table } from "lucide-react";
import { exportPDF, exportExcel } from "../components/Pdf";

import Sidebar from "../components/Sidebar";

function Invoice() {
  useEffect(() => {
    getInvoice();
  }, []);

  const [showModal, setShowModal] = useState("");
  const [invoiceList, setInvoiceList] = useState([]);
  const [newInvoice, setNewInvoice] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);
  const today = new Date();

  const formatted = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const getInvoice = () => {
    axios
      .get("https://shop-software.onrender.com/api/invoice")
      .then((res) => setInvoiceList(res.data.reverse()))
      .catch((err) => console.log(err));
  };

  const getDetails = () => {
    const orderData = { orderNumber: orderNumber };
    axios
      .post("https://shop-software.onrender.com/api/invoice/order", orderData)
      .then((res) => setNewInvoice(res.data))
      .catch((err) => alert(err.response.data));
  };

  const generateInvoice = () => {
    axios
      .post("https://shop-software.onrender.com/api/invoice", newInvoice)
      .then((res) => {
        getInvoice(), setShowModal("");
      })
      .catch((err) => console.log(err));
  };

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Restore after print
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-white h-[100vh] overflow-auto w-[90%]">
          <div className="w-[100%] flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Recent Invoices</h1>

            <div className="w-[60%] flex justify-end">
              <button
                onClick={() => exportPDF(invoiceList)}
                className="bg-[#615AE7] mx-1 text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer flex items-center justify-center"
              >
                <span className="mr-1">
                  <FileText />
                </span>{" "}
                Export as PDF
              </button>
              <button
                onClick={() => exportExcel(invoiceList)}
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
                <span className="mr-1 ">+</span> Generate New Invoice
              </button>
            </div>
          </div>
          {/* Enquiry Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="w-[100%] bg-gray-50 ">
                <tr className="w-[100%]">
                  {[
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
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoiceList.map((i, index) => (
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {i?.invoiceNumber}
                    </td>
                    <td className="px-4 py-3 font-medium">{i?.category}</td>
                    <td className="px-4 py-3">
                      {i?.orderObject?.company}
                      {i?.modelName}
                    </td>
                    <td className="px-4 py-3">{i?.paymentObject.price}</td>
                    <td className="px-4 py-3">{i?.paymentObject.discount}</td>
                    <td className="px-4 py-3">
                      {Number(i?.paymentObject.CGST) +
                        Number(i?.paymentObject.SGST)}
                    </td>
                    <td className="px-4 py-3">
                      {((Number(i?.paymentObject.price) -
                        Number(i?.paymentObject.discount)) *
                        (Number(i?.paymentObject.CGST) +
                          Number(i?.paymentObject.SGST) +
                          100)) /
                        100}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setShowModal("View"), setNewInvoice(i);
                        }}
                        className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer ml-[10%]"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedInvoice(i);
                          setTimeout(() => handlePrint(), 0);
                        }}
                        className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer ml-[10%]"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* ====== Hidden Printable Invoice Layout ====== */}
            {selectedInvoice && (
              <div
                ref={printRef}
                className="print:block p-10 max-w-3xl mx-auto text-black bg-white"
              >
                {/* Heading */}
                <h1 className="text-4xl font-extrabold text-center mb-8">
                  INVOICE
                </h1>

                {/* Company Info */}
                <div className="text-center mb-6 text-gray-700">
                  <p>Shree Vaibhav Laxmi</p>
                  <p>170A Ganga Devi Nagar, Indore, 452010</p>
                  <p>
                    Phone: 9425311513 | Email:
                    shreevaibhavlaxmielectronics@gmail.com
                  </p>
                </div>

                <hr className="border-gray-300 mb-6" />

                {/* Invoice Details */}
                <div className="mb-6 space-y-2 text-lg">
                  <div className=" flex justify-between">
                    <p>
                      <strong>Invoice No:</strong>{" "}
                      {selectedInvoice.invoiceNumber}
                    </p>
                    <p>
                      <strong>Date:</strong> {formatted}
                    </p>
                  </div>
                  <hr className="border-gray-300 my-6" />
                  <p>
                    <strong>Product:</strong>{" "}
                    {selectedInvoice.orderObject?.company}{" "}
                    {selectedInvoice.modelName}
                  </p>
                  <div className="flex justify-between mt-14">
                    <p>Price (₹):</p>
                    <p>{selectedInvoice.paymentObject.price}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>Discount (₹):</p>
                    <p>{selectedInvoice.paymentObject.discount}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>CGST (%):</p>
                    <p>{selectedInvoice.paymentObject.CGST}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>SGST (%):</p>
                    <p>{selectedInvoice.paymentObject.SGST}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>Total Tax (%):</p>
                    <p>
                      {Number(selectedInvoice.paymentObject.CGST) +
                        Number(selectedInvoice.paymentObject.SGST)}
                    </p>
                  </div>
                </div>

                <hr className="border-gray-300 mb-6" />

                {/* Total */}
                <div className="text-right text-2xl font-bold">
                  Grand Total: ₹
                  {(
                    ((Number(selectedInvoice.paymentObject.price) -
                      Number(selectedInvoice.paymentObject.discount)) *
                      (Number(selectedInvoice.paymentObject.CGST) +
                        Number(selectedInvoice.paymentObject.SGST) +
                        100)) /
                    100
                  ).toFixed(2)}
                </div>
              </div>
            )}
          </div>
          {showModal ? (
            <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
              <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
              <div className="bg-white rounded-lg p-6 w-[80%] max-w-4xl z-10 h-[70vh] overflow-auto">
                {showModal == "Add" ? (
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Invoice Number: {invoiceList.length + 1}
                    </h2>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Date: {formatted}
                    </h2>
                  </div>
                ) : null}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      Order Number:
                    </h2>
                    <div className="flex">
                      <input
                        value={newInvoice?.orderNumber}
                        onChange={(e) => {
                          setOrderNumber(e.target.value);
                        }}
                        className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                        type="number"
                      />
                      {showModal == "Add" ? (
                        <button
                          onClick={() => {
                            getDetails();
                          }}
                          className="mt-[1vh] h-[6.5vh] mx-[2%] bg-[#615AE7] w-[25%]  text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                        >
                          {"Search"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {newInvoice != [] ? (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
                      Product Details:
                    </h2>
                    <div className="w-[100%] h-[10vh] grid grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="">Category:</label>
                        <input
                          value={newInvoice?.category}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                    </div>

                    {newInvoice?.category == "MOBILE" ? (
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
                          Mobile Details:
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="flex flex-col">
                            <label htmlFor="">Company:</label>
                            <input
                              value={newInvoice?.orderObject?.company}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Model Name:</label>
                            <input
                              value={newInvoice?.modelName}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Ram,Rom fomat(ram/rom):</label>
                            <input
                              value={newInvoice?.orderObject?.specs}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Colour:</label>
                            <input
                              value={newInvoice?.orderObject?.color}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Quantity:</label>
                            <input
                              value={newInvoice?.quantity}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    ) : newInvoice?.category == "TV" ? (
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
                          TV Details:
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="flex flex-col">
                            <label htmlFor="">Company:</label>
                            <input
                              value={newInvoice?.orderObject?.company}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Model Name:</label>
                            <input
                              value={newInvoice?.orderObject?.modelName}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Size:</label>
                            <input
                              value={newInvoice?.orderObject?.size}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Quantity:</label>
                            <input
                              value={newInvoice?.quantity}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    ) : newInvoice?.category == "WASHING MACHINE" ? (
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
                          Washing Machine Details:
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="flex flex-col">
                            <label htmlFor="">Company:</label>
                            <input
                              value={newInvoice?.orderObject?.company}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Model Name:</label>
                            <input
                              value={newInvoice?.modelName}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Size (in liters):</label>
                            <input
                              value={newInvoice?.orderObject?.size}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Type:</label>
                            <input
                              value={newInvoice?.orderObject?.type}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="number"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Quantity:</label>
                            <input
                              value={newInvoice?.quantity}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    ) : newInvoice?.category == "FRIDGE" ? (
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
                          Fridge Details:
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="flex flex-col">
                            <label htmlFor="">Company:</label>
                            <input
                              value={newInvoice?.orderObject?.company}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Model Name:</label>
                            <input
                              value={newInvoice?.modelName}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Size (in liters):</label>
                            <input
                              value={newInvoice?.orderObject?.size}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Doors:</label>
                            <input
                              value={newInvoice?.orderObject?.doors}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Quantity:</label>
                            <input
                              value={newInvoice?.quantity}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    ) : newInvoice?.category == "OTHERS" ? (
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
                          Product Details:
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="flex flex-col">
                            <label htmlFor="">Company:</label>
                            <input
                              value={newInvoice?.orderObject?.company}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Model Name:</label>
                            <input
                              value={newInvoice?.modelName}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="">Quantity:</label>
                            <input
                              value={newInvoice?.quantity}
                              className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {showModal != "Add" ? (
                      <>
                        <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
                          Invoice Generation Details:
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="flex flex-col">
                            <label htmlFor="">Date Of Invoice:</label>
                            <input
                              value={
                                newInvoice?.date
                                  ? new Date(
                                      newInvoice?.date
                                    ).toLocaleDateString("en-IN")
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
                                newInvoice?.date
                                  ? new Date(
                                      newInvoice?.date
                                    ).toLocaleTimeString("en-IN", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })
                                  : ""
                              }
                              className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                              type="text"
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                    <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
                      Customer Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="flex flex-col">
                        <label htmlFor="">Name:</label>
                        <input
                          value={newInvoice?.customerObject?.name}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Phone Number:</label>
                        <input
                          value={newInvoice?.customerObject?.phoneNumber}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="">Address:</label>
                        <input
                          value={newInvoice?.customerObject?.address}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="text"
                        />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 my-6 border-b pb-2">
                      Payment Details:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="flex flex-col">
                        <label htmlFor="">Amount:</label>
                        <input
                          onChange={(e) => {
                            setNewInvoice({
                              ...newInvoice,
                              paymentObject: {
                                ...newInvoice?.paymentObject,
                                price: e.target.value,
                              },
                            });
                          }}
                          value={newInvoice?.paymentObject?.price}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Discount:</label>
                        <input
                          onChange={(e) => {
                            setNewInvoice({
                              ...newInvoice,
                              paymentObject: {
                                ...newInvoice?.paymentObject,
                                discount: e.target.value,
                              },
                            });
                          }}
                          value={newInvoice?.paymentObject?.discount}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">CGST:</label>
                        <input
                          onChange={(e) => {
                            setNewInvoice({
                              ...newInvoice,
                              paymentObject: {
                                ...newInvoice?.paymentObject,
                                CGST: e.target.value,
                              },
                            });
                          }}
                          value={newInvoice?.paymentObject?.CGST || ""}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">SGST:</label>
                        <input
                          onChange={(e) => {
                            setNewInvoice({
                              ...newInvoice,
                              paymentObject: {
                                ...newInvoice?.paymentObject,
                                SGST: e.target.value,
                              },
                            });
                          }}
                          value={newInvoice?.paymentObject?.SGST || ""}
                          className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          type="number"
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => {
                      setShowModal(""), setNewInvoice([]);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-md w-[15%] hover:bg-gray-300 hover:cursor-pointer"
                  >
                    Cancel
                  </button>
                  {showModal == "Add" ? (
                    <button
                      onClick={() => generateInvoice()}
                      className="px-4 py-2 bg-[#615AE7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                    >
                      {"Generate"}
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
}

export default Invoice;
