import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { exportPDF, exportExcel } from "../components/Pdf";
import { FileText, Table } from "lucide-react";

const ThirdPartyF = () => {
  useEffect(() => {
    getFinanceData();
  }, []);

  const [showModal, setShowModal] = useState("");
  const [showModal2, setShowModal2] = useState("");
  const [showModal3, setShowModal3] = useState("");
  const [financeList, setFinanceList] = useState([]);
  const [newFinance, setNewFinance] = useState({});
  const [fNumber, setFNumber] = useState(null);
  const [oNumber, setONumber] = useState(null);
  const [emiPayment, setEmiPayment] = useState({});
  const [sumOfEMI, setSumOfEMI] = useState(0);
  const [optionVar, setOptionVar] = useState("");

  const getFinanceData = () => {
    axios
      .get("https://shop-software.onrender.com/api/tpf")
      .then((res) => setFinanceList(res.data.reverse()))
      .catch((err) => console.log(err));
  };

  const getDetailsFinance = () => {
    axios
      .post("https://shop-software.onrender.com/api/tpf/find", {
        financeNumber: Number(fNumber),
      })
      .then((res) => {
        setNewFinance(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getDetailsFinanceByOrder = () => {
    axios
      .post("https://shop-software.onrender.com/api/tpf/find/order", {
        orderNumber: Number(oNumber),
      })
      .then((res) => {
        setNewFinance(res.data);
        setEmiPayment({ financeNumber: res.data.financeNumber });
      })
      .catch((err) => console.log(err));
  };

  const addEMI = () => {
    setShowModal2("");
    axios
      .post("https://shop-software.onrender.com/api/tpf", emiPayment)
      .then((res) => {
        console.log("EMI saved:", res.data);
        getFinanceData();
        setShowModal2("");
      })
      .catch((err) => console.log("EMI save error:", err));
  };

  // UI Components
  return (
    <div className="p-6 h-[100vh] bg-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Finance</h1>

        <div className="w-[60%] flex justify-end">
          <button
            onClick={() => exportPDF(financeList)}
            className="bg-[#615AE7] mx-1 text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer flex items-center justify-center"
          >
            <span className="mr-1">
              <FileText />
            </span>{" "}
            Export as PDF
          </button>
          <button
            onClick={() => exportExcel(financeList)}
            className="bg-[#615AE7] mx-1 text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer flex items-center justify-center"
          >
            <span className="mr-1">
              <Table />
            </span>{" "}
            Export to Excel
          </button>
          <button
            onClick={() => setShowModal2(true)}
            className="bg-[#615AE7] text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer flex items-center justify-center"
          >
            <span className="mr-1 ">+</span> New EMI Payment
          </button>
        </div>
      </div>
      {/* Finance Table */}
      <div className="bg-white rounded-lg shadow w-full overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Finance No.",
                "Customer Name",
                "Phone No.",
                "Up. EMI date",
                "No. of EMI Left",
                "EMI Amount",
                "Status",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {financeList.map((i) => {
              console.log("Processing date:", i.date);
              let nextEmiDate = "--";
              const emiList = i.EMI || [];

              // Fallback to order date if present
              const orderDateRaw = i.date || i.createdAt || null;

              if (
                i.status === "Pending" &&
                i.financeObject?.numberOfEMILeft > 0
              ) {
                if (emiList.length > 0) {
                  const latestEMI = emiList
                    .map((e) => new Date(e.date))
                    .sort((a, b) => b - a)[0];
                  const next = new Date(latestEMI);
                  next.setMonth(next.getMonth() + 1);
                  nextEmiDate = next.toLocaleDateString("en-GB"); // DD/MM/YYYY
                } else if (orderDateRaw) {
                  const orderDate = new Date(orderDateRaw);
                  orderDate.setMonth(orderDate.getMonth() + 1);
                  nextEmiDate = orderDate.toLocaleDateString("en-GB");
                }
              }

              return (
                <tr key={i._id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 font-medium">{i.financeNumber}</td>
                  <td className="px-3 py-4 font-medium">
                    {i.customerObject?.name}
                  </td>
                  <td className="px-3 py-4">{i.customerObject?.phoneNumber}</td>
                  <td className="px-3 py-4">{nextEmiDate}</td>
                  <td className="px-3 py-4 font-medium">
                    {i.financeObject?.numberOfEMILeft}
                  </td>
                  <td className="px-3 py-4">{i.financeObject?.amountOfEMI}</td>
                  <td
                    className={`px-3 py-4 ${
                      i.status === "Pending" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {i.status}
                  </td>
                  <td className="px-3 py-4 flex space-x-2">
                    <button
                      onClick={() => {
                        setShowModal3(true);
                        setNewFinance(i);
                      }}
                      className="text-blue-500 hover:text-indigo-900 cursor-pointer"
                    >
                      Browse
                    </button>
                    <button
                      onClick={() => {
                        setNewFinance(i);
                        setShowModal(true);
                      }}
                      className="text-blue-500 hover:text-indigo-900 cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal != "" ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[60%] h-[70vh] overflow-auto max-w-4xl z-10 overflow-x-hidden">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Product Details:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Customer Image:
                </label>
                <img src={newFinance?.customerImage} className="h-[20vh]"></img>
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Guaranteer Image:
                </label>
                <img
                  src={newFinance?.guaranteerImage}
                  className="h-[20vh]"
                ></img>
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Category:
                </label>
                <input
                  value={newFinance?.productObject?.category}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
            </div>
            {newFinance?.productObject?.category == "MOBILE" ? (
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
                      value={newFinance?.productObject?.company}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Model Name:
                    </label>
                    <input
                      value={newFinance?.productObject?.modelName}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      IMEI:
                    </label>
                    <input
                      value={newFinance?.productObject?.IMEI}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Quantity:
                    </label>
                    <input
                      value={newFinance?.productObject?.quantity}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newFinance?.productObject?.category == "TV" ? (
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
                      value={newFinance?.productObject?.company}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Model Name:
                    </label>
                    <input
                      value={newFinance?.productObject?.modelName}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Serial Number:
                    </label>
                    <input
                      value={newFinance?.productObject?.serialNumber}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Quantity:
                    </label>
                    <input
                      value={newFinance?.productObject?.quantity}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newFinance?.productObject?.category == "WASHING MACHINE" ? (
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
                      value={newFinance?.productObject?.company}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Model Name:
                    </label>
                    <input
                      value={newFinance?.productObject?.modelName}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Serial Number:
                    </label>
                    <input
                      value={newFinance?.productObject?.serialNumber}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Quantity:
                    </label>
                    <input
                      value={newFinance?.productObject?.quantity}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newFinance?.productObject?.category == "FRIDGE" ? (
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
                      value={newFinance?.productObject?.company}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Model Name:
                    </label>
                    <input
                      value={newFinance?.productObject?.modelName}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Serial Number:
                    </label>
                    <input
                      value={newFinance?.productObject?.serialNumber}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Quantity:
                    </label>
                    <input
                      value={newFinance?.productObject?.quantity}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            ) : newFinance?.productObject?.category == "OTHERS" ? (
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
                      value={newFinance?.productObject?.company}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Model Name:
                    </label>
                    <input
                      value={newFinance?.productObject?.modelName}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Quantity:
                    </label>
                    <input
                      value={newFinance?.productObject?.quantity}
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      type="number"
                    />
                  </div>
                </div>
              </div>
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
                  value={newFinance?.customerObject?.name}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Phone number:
                </label>
                <input
                  value={newFinance?.customerObject?.phoneNumber}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  E-mail:
                </label>
                <input
                  value={newFinance?.customerObject?.email}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Address:
                </label>
                <input
                  value={newFinance?.customerObject?.address}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Photo:
                </label>
                <input
                  className="h-[5vh] mt-[1vh] w-[50%] pl-[1%] rounded-[5px]"
                  type="file"
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
                  value={newFinance?.paymentObject?.price}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="number"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Discounts:
                </label>
                <input
                  value={newFinance?.paymentObject?.discount}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="number"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Remarks:
                </label>
                <input
                  value={newFinance?.paymentObject?.remarks}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                Third Party Finance
              </h2>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                Finance Number:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-gray-600 font-medium text-sm">
                    Downpayment:
                  </label>
                  <input
                    value={newFinance?.financeObject?.downPayment}
                    className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-medium text-sm">
                    Number of EMI:
                  </label>
                  <input
                    value={newFinance?.financeObject?.numberOfEMI}
                    className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-medium text-sm">
                    File Charge:
                  </label>
                  <input
                    value={newFinance?.financeObject?.fileCharge}
                    className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-medium text-sm">
                    Intrest rate monthly(%):
                  </label>
                  <input
                    value={newFinance?.financeObject?.interest}
                    className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-medium text-sm">
                    Amount of EMI:
                  </label>
                  <input
                    value={newFinance?.financeObject?.amountOfEMI}
                    className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    type="number"
                  />
                </div>
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
                    value={newFinance?.guaranteerObject?.name}
                    className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-medium text-sm">
                    Phone Number:
                  </label>
                  <input
                    value={newFinance?.guaranteerObject?.phoneNumber}
                    className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-medium text-sm">
                    Address:
                  </label>
                  <input
                    value={newFinance?.guaranteerObject?.address}
                    className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setNewFinance([]), setShowModal("");
                }}
                className="px-4 py-2 w-[15%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {showModal2 != "" ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[60%] h-[70vh] overflow-auto max-w-4xl z-10 overflow-x-hidden">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              EMI Payment:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Search By:
                </label>
                <select
                  name=""
                  id=""
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  onChange={(e) => {
                    setOptionVar(e.target.value);
                  }}
                >
                  <option value="">Choose Option</option>
                  <option value="F">Finance Number</option>
                  <option value="O">Order Number</option>
                </select>
              </div>
              <div>
                <div>
                  {optionVar == "F" ? (
                    <div>
                      <label className="text-gray-600 font-medium text-sm">
                        Finance Number:
                      </label>
                      <div className="">
                        <input
                          onChange={(e) => {
                            setFNumber(e.target.value);
                            setEmiPayment((prev) => ({
                              ...prev,
                              financeNumber: e.target.value,
                            }));
                          }}
                          className="mt-2 h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase w-[65%]"
                          type="number"
                        />
                        <button
                          onClick={() => {
                            getDetailsFinance();
                          }}
                          className="px-4 py-2 mx-[2%] bg-[#615AE7] w-[30%]  text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                        >
                          {"Search"}
                        </button>
                      </div>
                    </div>
                  ) : optionVar == "O" ? (
                    <div>
                      <label className="text-gray-600 font-medium text-sm">
                        Order Number:
                      </label>
                      <div>
                        <input
                          onChange={(e) => {
                            setONumber(e.target.value);
                          }}
                          className="mt-2 h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase w-[65%]"
                          type="number"
                        />
                        <button
                          onClick={() => {
                            getDetailsFinanceByOrder();
                          }}
                          className="px-4 py-2 mx-[2%] bg-[#615AE7] w-[30%]  text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                        >
                          {"Search"}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Customer Detail:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Customer Name:
                </label>
                <input
                  disabled={true}
                  value={newFinance?.customerObject?.name}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Phone Number:
                </label>
                <input
                  disabled={true}
                  value={newFinance?.customerObject?.phoneNumber}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Payment Detail:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Amount:
                </label>
                <input
                  onChange={(e) =>
                    setEmiPayment({
                      ...emiPayment,
                      paymentAmount: e.target.value,
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Payment Type:
                </label>
                <select
                  onChange={(e) => {
                    setEmiPayment({
                      ...emiPayment,
                      paymentType: e.target.value,
                    });
                  }}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  name=""
                  id=""
                >
                  <option value="">Choose Option</option>
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <div>
                <label className="text-gray-600 font-medium text-sm">
                  Remarks:
                </label>
                <input
                  onChange={(e) => {
                    setEmiPayment({ ...emiPayment, remarks: e.target.value });
                  }}
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify-end mt-[2vh]">
              <button
                onClick={() => {
                  setNewFinance([]),
                    setShowModal2(""),
                    setEmiPayment({}),
                    setNewFinance({});
                }}
                className="px-4 py-2 w-[15%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  addEMI();
                }}
                className="px-4 py-2 ml-[2%] bg-[#615AE7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
              >
                {"Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {showModal3 ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[80%] max-h-96 overflow-auto max-w-4xl z-10 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              EMI Details:
            </h2>
            <table className="min-w-full my-[5vh] overflow-y-auto">
              <thead className="w-[100%] bg-gray-50 ">
                <tr className="w-[100%]">
                  {[
                    "S.No",
                    "Amount",
                    "Payment Type",
                    "Remark",
                    "Date",
                    "Time",
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
                {newFinance?.EMI.map((i, index) => (
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{i?.paymentAmount}</td>
                    <td className="px-6 py-4">{i?.paymentType}</td>
                    <td className="px-6 py-4">{i?.remarks}</td>
                    <td className="px-6 py-4">
                      {i?.date
                        ? new Date(i.date).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      {i?.date
                        ? new Date(i.date).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => {
                setShowModal3(false), setNewFinance({});
              }}
              className="py-2 w-[15%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer self-end"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ThirdPartyF;
