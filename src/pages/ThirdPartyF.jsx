import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

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
  const [optionVar, setOptionVar] = useState("")

  const getFinanceData = () => {
    axios
      .get("https://shop-software.onrender.com/api/tpf")
      .then((res) => setFinanceList(res.data))
      .catch((err) => console.log(err));
  };

  const getDetailsFinance = () => {
      axios
      .post("https://shop-software.onrender.com/api/tpf/find", {
        financeNumber: Number(fNumber),
      })
      .then((res) => {
        console.log("RESPONSE:", res.data);
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
        console.log("RESPONSE:", res.data);
        setNewFinance(res.data);
        setEmiPayment({financeNumber: res.data.financeNumber})
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
        <div className="w-[18%] flex justify-between">
          
          <button
            onClick={() => setShowModal2(true)}
            className="bg-[#615AE7] text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer"
        >
         <span className="mr-1">+</span> New EMI Payment
          </button>
        </div>
      </div>

      {/* Finance Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="w-[100%] bg-gray-50 ">
            <tr className="w-[100%]">
              {[
                "S.No",
                "Finance No.",
                "Customer Name",
                "Phone No.",
                "Up. EMI date",
                "No. of EMI Left",
                "EMI Amount",
                "Status",
                "Depositied EMI",
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
            {financeList.map((i, index) => (
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-4">{index + 1}</td>
                <td className="px-3 py-4">{i.financeNumber}</td>
                <td className="px-3 py-4">{i.customerObject.name}</td>
                <td className="px-3 py-4">{i.customerObject.phoneNumber}</td>
                <td className="px-3 py-4">{}</td>
                <td className="px-3 py-4">{i.financeObject.numberOfEMILeft}</td>
                <td className="px-3 py-4">{i.financeObject.amountOfEMI}</td>
                <td className="px-3 py-4"></td>
                <td className="px-3 py-4">
                  <button
                    onClick={() => {
                      setShowModal3(true), setNewFinance(i);
                    }}
                    className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer ml-[20%]"
                  >
                    Browse
                  </button>
                </td>
                <td className="px-3 py-4">
                  <button
                    onClick={() => {
                      setNewFinance(i), setShowModal(true);
                    }}
                    className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer ml-[20%]"
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
            <h2 className="text-xl font-bold mb-4">Product Details:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Category:</label>
                <input
                  value={newFinance.productObject.category}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>
            {newFinance.productObject?.category == "MOBILE" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Mobile Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newFinance.productObject.company}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newFinance.productObject.modelName}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Ram,Rom fomat(ram/rom):</label>
                    <input
                      value={newFinance.productObject.specs}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Colour:</label>
                    <input
                      value={newFinance.productObject.category}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newFinance.productObject.quantity}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newFinance.productObject.description}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : newFinance.productObject?.category == "TV" ? (
              <div>
                <h2 className="text-xl font-bold my-4">TV Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newFinance.productObject.company}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newFinance.productObject.modelName}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Size:</label>
                    <input
                      value={newFinance.productObject.size}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newFinance.productObject.quantity}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newFinance.productObject.description}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : newFinance.productObject?.category == "WASHING MACHINE" ? (
              <div>
                <h2 className="text-xl font-bold my-4">
                  Washing Machine Details:
                </h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newFinance.productObject.company}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newFinance.productObject.modelName}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Size (in liters):</label>
                    <input
                      value={newFinance.productObject.size}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Type:</label>
                    <input
                      value={newFinance.productObject.type}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newFinance.productObject.quantity}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newFinance.productObject.description}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : newFinance.productObject?.category == "FRIDGE" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Fridge Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newFinance.productObject.company}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newFinance.productObject.modelName}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Size (in liters):</label>
                    <input
                      value={newFinance.productObject.size}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Doors:</label>
                    <input
                      value={newFinance.productObject.doors}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newFinance.productObject.quantity}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newFinance.productObject.description}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : newFinance.productObject?.category == "OTHERS" ? (
              <div>
                <h2 className="text-xl font-bold my-4">Product Details:</h2>
                <div className="w-[100%] h-[29vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Company:</label>
                    <input
                      value={newFinance.productObject.company}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Model Name:</label>
                    <input
                      value={newFinance.productObject.modelName}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Quantity:</label>
                    <input
                      value={newFinance.productObject.quantity}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <input
                      value={newFinance.productObject.description}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
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
                  value={newFinance.customerObject.name}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Phone number:</label>
                <input
                  value={newFinance.customerObject.phoneNumber}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">E-mail:</label>
                <input
                  value={newFinance.customerObject.email}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Address:</label>
                <input
                  value={newFinance.customerObject.address}
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
                  value={newFinance.paymentObject.price}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Discounts:</label>
                <input
                  value={newFinance.paymentObject.discount}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="number"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Remarks:</label>
                <input
                  value={newFinance.paymentObject.remarks}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold my-4">Third Party Finance</h2>
              <h2 className="text-xl font-bold my-4">Finance Number:</h2>
              <div className="w-[100%] grid grid-cols-2">
                <div className="flex flex-col">
                  <label htmlFor="">Downpayment:</label>
                  <input
                    value={newFinance.financeObject.downPayment}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                    type="number"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Number of EMI:</label>
                  <input
                    value={newFinance.financeObject.numberOfEMI}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                    type="number"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">File Charge:</label>
                  <input
                    value={newFinance.financeObject.fileCharge}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                    type="number"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Intrest rate monthly(%):</label>
                  <input
                    value={newFinance.financeObject.interest}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                    type="number"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Amount of EMI:</label>
                  <input
                    value={newFinance.financeObject.amountOfEMI}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                    type="number"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Photo:</label>
                  <input
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
                    value={newFinance.guaranteerObject.name}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Phone Number:</label>
                  <input
                    value={newFinance.guaranteerObject.phoneNumber}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Address:</label>
                  <input
                    value={newFinance.guaranteerObject.address}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 w-[90%]">
              <button
                onClick={() => {
                  setNewFinance([]), setShowModal("");
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
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
          <div className="bg-white rounded-lg p-6 w-[60%] overflow-y-scroll max-w-4xl z-10 overflow-x-hidden">
            <h2 className="text-xl font-bold mb-4">EMI Payment:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div>
                  <select
                    name=""
                    id=""
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                    onChange={(e)=>{setOptionVar(e.target.value)}}
                  >
                    <option value="">Choose Option</option>
                    <option value="F">Finance Number</option>
                    <option value="O">Order Number</option>
                  </select>
                </div>
              <div className="flex flex-col">
                
                <div>
                  {optionVar == "F" ? 
                    (<div className="flex flex-col">
                    <label htmlFor="">Finance Number:</label>
                  <div>
                    <input
                    onChange={(e) => {
                      setFNumber(e.target.value);
                      setEmiPayment((prev) => ({
                        ...prev,
                        financeNumber: e.target.value,
                      }));
                    }}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[50%] uppercase pl-[1%] rounded-[5px]"
                    type="number"
                  />
                  <button
                    onClick={() => {
                      getDetailsFinance();
                    }}
                    className="px-4 py-2 mx-[2%] bg-blue-500 w-[20%]  text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
                  >
                    {"Search"}
                  </button></div></div>): optionVar == "O" ?(
                  <div className="flex flex-col">
                  <label htmlFor="">Order Number:</label>
                  <div>
                    <input
                    onChange={(e) => {setONumber(e.target.value)}}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[50%] uppercase pl-[1%] rounded-[5px]"
                    type="number"
                  />
                  <button
                    onClick={() => {getDetailsFinanceByOrder()
                    }}
                    className="px-4 py-2 mx-[2%] bg-blue-500 w-[20%]  text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
                  >
                    {"Search"}
                  </button></div></div>):null}
                  
                </div>
              </div>
              
            </div>
            <h2 className="text-xl font-bold my-4">Customer Detail:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Customer Name:</label>
                <input
                  disabled={true}
                  value={newFinance?.customerObject?.name}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Phone Number:</label>
                <input
                  disabled={true}
                  value={newFinance?.customerObject?.phoneNumber}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>
            <h2 className="text-xl font-bold my-4">Payment Detail:</h2>
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="">Amount:</label>
                <input
                  onChange={(e) =>
                    setEmiPayment({
                      ...emiPayment,
                      paymentAmount: e.target.value,
                    })
                  }
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Payment Type:</label>
                <select
                  onChange={(e) => {
                    setEmiPayment({
                      ...emiPayment,
                      paymentType: e.target.value,
                    });
                  }}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  name=""
                  id=""
                >
                  <option value="">Choose Option</option>
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Remarks:</label>
                <input
                  onChange={(e) => {
                    setEmiPayment({ ...emiPayment, remarks: e.target.value });
                  }}
                  className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify-end mt-[2vh] w-[90%]">
              <button
                onClick={() => {
                  addEMI();
                }}
                className="px-4 py-2 mr-[2%] bg-blue-500 w-[15%] text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
              >
                {"Save"}
              </button>
              <button
                onClick={() => {
                  setNewFinance([]),
                    setShowModal2(""),
                    setEmiPayment({}),
                    setNewFinance({});
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {showModal3 ? (
        <div className="fixed flex w-[100%] h-[100%] top-0 left-0 items-center z-[100] justify-center">
          <div className="absolute w-[100%] h-[100%] inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[80%] max-h-96 overflow-auto max-w-4xl z-10 flex flex-col">
            <h2 className="text-xl font-bold my-4">EMI Details:</h2>
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
                {newFinance.EMI.map((i, index) => (
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{i.paymentAmount}</td>
                    <td className="px-6 py-4">{i.paymentType}</td>
                    <td className="px-6 py-4">{i.remarks}</td>
                    <td className="px-6 py-4">
                      {i.date
                        ? new Date(i.date).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      {i.date
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
              className="py-2 w-[12%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer self-end"
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
