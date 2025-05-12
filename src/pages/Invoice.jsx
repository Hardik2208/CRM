import { React, useState,useEffect , useContext } from "react";
import axios from "axios";

function Invoice() {
    useEffect(()=>{
    getInvoice()
  },[])

  const [showModal, setShowModal] = useState('');
  const [category, setCategory] = useState("Mobile");
  const [invoiceList, setInvoiceList] = useState([]);
  const [newInvoice, setNewInvoice] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);
  const today = new Date();
const formatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


  const getInvoice = () => {
    axios
      .get("https://shop-software.onrender.com/api/invoice")
      .then((res) => setInvoiceList(res.data))
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
    .then((res)=> {getInvoice(),setShowModal('')})
    .catch((err)=> console.log(err))
  };

  return (
    <div className="p-6 h-[100vh] bg-white overflow-y-auto">
      <div className="w-[100%] flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Invoices</h1>
        <div className="w-[23%] flex justify-end">
          <button
            onClick={() => setShowModal("Add")}
            className="bg-[#615AE7] text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer"
        >
         <span className="mr-1">+</span> Generate Invoice
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
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoiceList.map((i,index)=>(
              
              <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">{index+1}</td>
              <td className="px-4 py-3">{i.invoiceNumber}</td>
              <td className="px-4 py-3">{i.category}</td>
              <td className="px-4 py-3">{i.orderObject?.company}{i.modelName}</td>
              <td className="px-4 py-3">{i.paymentObject.price}</td>
              <td className="px-4 py-3">{i.paymentObject.discount}</td>
              <td className="px-4 py-3">{Number(i.paymentObject.CGST) + Number(i.paymentObject.SGST)}</td>
              <td className="px-4 py-3">{((Number(i.paymentObject.price)-Number(i.paymentObject.discount))*(Number(i.paymentObject.CGST) + Number(i.paymentObject.SGST) + 100)/100)}</td>
              <td className="px-4 py-3">
                
                <button
                onClick={()=>{setShowModal("View"), setNewInvoice(i)}}
                className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer ml-[10%]">
                  View
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
          <div className="bg-white rounded-lg p-6 w-[60%] h-[80vh] overflow-y-scroll max-w-4xl z-10">
            {showModal == "Add" ? 
              <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Invoice Number: {invoiceList.length + 1}</h2>
              <h2 className="text-xl font-bold mb-4 mr-[10%]">Date: {formatted}</h2>
            </div>: null}
            <div className="w-[100%] grid grid-cols-2">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-4 mr-[10%]">Order Number:</h2>
                <div className="flex">
                  <input
                  value={newInvoice.orderNumber}
                    onChange={(e) => {
                      setOrderNumber(e.target.value);
                    }}
                    className="border border-gray-500 h-[5vh] mt-[1vh] w-[50%] pl-[1%] rounded-[5px]"
                    type="number"
                  />
                  {showModal == "Add" ? 
                  <button
                    onClick={() => {
                      getDetails();
                    }}
                    className="px-4 py-2 mx-[2%] bg-blue-500 w-[20%]  text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer"
                  >
                    {"Search"}
                  </button>: null}
                </div>
              </div>
            </div>

            {newInvoice != [] ? (
              <>
                <h2 className="text-xl font-bold my-4">Product Details:</h2>
                <div className="w-[100%] h-[10vh] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Category:</label>
                    <input
                      value={newInvoice.category}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>

                {newInvoice.category == "MOBILE" ? (
                  <div>
                    <h2 className="text-xl font-bold my-4">Mobile Details:</h2>
                    <div className="w-[100%] h-[29vh] grid grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="">Company:</label>
                        <input
                          value={newInvoice.orderObject.company}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Model Name:</label>
                        <input
                          value={newInvoice.modelName}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Ram,Rom fomat(ram/rom):</label>
                        <input
                          value={newInvoice.orderObject.specs}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Colour:</label>
                        <input
                          value={newInvoice.orderObject.color}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Quantity:</label>
                        <input
                          value={newInvoice.quantity}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                ) : newInvoice.category == "TV" ? (
                  <div>
                    <h2 className="text-xl font-bold my-4">TV Details:</h2>
                    <div className="w-[100%] h-[29vh] grid grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="">Company:</label>
                        <input
                          value={newInvoice.orderObject.company}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Model Name:</label>
                        <input
                          value={newInvoice.orderObject.modelName}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Size:</label>
                        <input
                          value={newInvoice.orderObject.size}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Quantity:</label>
                        <input
                          value={newInvoice.quantity}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                ) : newInvoice.category == "WASHING MACHINE" ? (
                  <div>
                    <h2 className="text-xl font-bold my-4">
                      Washing Machine Details:
                    </h2>
                    <div className="w-[100%] h-[29vh] grid grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="">Company:</label>
                        <input
                          value={newInvoice.orderObject.company}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Model Name:</label>
                        <input
                          value={newInvoice.modelName}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Size (in liters):</label>
                        <input
                          value={newInvoice.orderObject.size}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Type:</label>
                        <input
                          value={newInvoice.orderObject.type}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Quantity:</label>
                        <input
                          value={newInvoice.quantity}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                ) : newInvoice.category == "FRIDGE" ? (
                  <div>
                    <h2 className="text-xl font-bold my-4">Fridge Details:</h2>
                    <div className="w-[100%] h-[29vh] grid grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="">Company:</label>
                        <input
                          value={newInvoice.orderObject.company}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Model Name:</label>
                        <input
                          value={newInvoice.modelName}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Size (in liters):</label>
                        <input
                          value={newInvoice.orderObject.size}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Doors:</label>
                        <input
                          value={newInvoice.orderObject.doors}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Quantity:</label>
                        <input
                          value={newInvoice.quantity}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                ) : newInvoice.category == "OTHERS" ? (
                  <div>
                    <h2 className="text-xl font-bold my-4">Product Details:</h2>
                    <div className="w-[100%] h-[29vh] grid grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="">Company:</label>
                        <input
                          value={newInvoice.orderObject.company}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Model Name:</label>
                        <input
                          value={newInvoice.modelName}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Quantity:</label>
                        <input
                          value={newInvoice.quantity}
                          className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                {showModal != "Add" ? (
              <>
                <h2 className="text-xl font-bold my-4">Invoice Generation Details:</h2>
                <div className="w-[100%] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Date Of Invoice:</label>
                    <input
                      value={
                        newInvoice?.date
                          ? new Date(newInvoice.date).toLocaleDateString("en-IN")
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
                          ? new Date(newInvoice.date).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                          : ""
                      }
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] uppercase pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
              </>
            ) : null}
                <h2 className="text-xl font-bold my-4">Customer Details:</h2>
                <div className="w-[100%] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Name:</label>
                    <input
                      value={newInvoice.customerObject?.name}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Phone Number:</label>
                    <input
                      value={newInvoice.customerObject?.phoneNumber}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="">Address:</label>
                    <input
                      value={newInvoice.customerObject?.address}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="text"
                    />
                  </div>
                </div>
                <h2 className="text-xl font-bold my-4">Payment Details:</h2>
                <div className="w-[100%] grid grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="">Amount:</label>
                    <input
                      onChange={(e) => {
                        setNewInvoice({
                          ...newInvoice,
                          paymentObject: {
                            ...newInvoice.paymentObject,
                            price: e.target.value,
                          },
                        });
                      }}
                      value={newInvoice.paymentObject?.price}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
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
                            ...newInvoice.paymentObject,
                            discount: e.target.value,
                          },
                        });
                      }}
                      value={newInvoice.paymentObject?.discount}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
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
                            ...newInvoice.paymentObject,
                            CGST: e.target.value,
                          },
                        });
                      }}
                      value={newInvoice.paymentObject?.CGST || ""}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
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
                            ...newInvoice.paymentObject,
                            SGST: e.target.value,
                          },
                        });
                      }}
                      value={newInvoice.paymentObject?.SGST || ""}
                      className="border border-gray-500 h-[5vh] mt-[1vh] w-[80%] pl-[1%] rounded-[5px]"
                      type="number"
                    />
                  </div>
                </div>
              </>
            ) : null}

            <div className="flex justify-end space-x-2 mt-4 w-[90%]">
              <button
                onClick={() => {setShowModal(""),setNewInvoice([])}}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              {showModal == "Add" ? 
                <button
              onClick={()=> generateInvoice()}
              className="px-4 py-2 bg-blue-500 w-[15%] text-white rounded-md hover:bg-blue-600 disabled:opacity-50 hover:cursor-pointer">
                {"Generate"}
              </button>:null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Invoice;
