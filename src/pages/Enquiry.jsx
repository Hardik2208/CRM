import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import { exportPDF, exportExcel } from "../components/Pdf";
import { FileText, Table } from "lucide-react";
import { useUserRole } from "../components/hooks";

import Loader from '../components/loader';

function Enquiry() {
  useEffect(() => {
    getEnquiryData();
  }, []);
  const [showModal, setShowModal] = useState("");
  const [status, setStatus] = useState(false);
  const [newEnquiryData, setNewEnquiryData] = useState({});
  const [enquiryList, setEnquiryList] = useState([]);
  const [search, setSearch] = useState("");
    const [timerId, setTimerId] = useState(null);
      const [loading, setLoading] = useState(true);


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
        `https://shop-software.onrender.com/api/Enquiry/Search`,
        { searchTerm } //  Object format
      );
      setEnquiryList(res.data);}
    } catch (err) {
      console.error("Search Error:", err); // Shows error object in console
    }
  };

  const getEnquiryData = () => {
    axios
      .get("https://shop-software.onrender.com/api/enquiry")
      .then((res) => {setEnquiryList(res.data.reverse());
      setLoading(false);})
      .catch((err) => console.log(err));
  };

  const deleteEnquiry = (id) => {
    axios
      .delete(`https://shop-software.onrender.com/api/enquiry/${id}`)
      .then((res) => getEnquiryData())
      .catch((err) => console.log(err));
  };
  const updateEnquiry = () => {
    setShowModal(false);
    axios
      .put(
        `https://shop-software.onrender.com/api/enquiry/${newEnquiryData?._id}`,
        newEnquiryData
      )
      .then((res) => {
        getEnquiryData();
        setNewEnquiryData({});
      })
      .catch((err) => console.log(err));
  };
  const addEnquiry = () => {
    setShowModal(false);
    axios
      .post("https://shop-software.onrender.com/api/enquiry", newEnquiryData)
      .then((res) => {
        getEnquiryData();
        setNewEnquiryData({});
      })
      .catch((err) => console.log(err));
  };

  const handleStatus = (id) => {
    axios
      .put(`https://shop-software.onrender.com/api/enquiry/${id}`, {
        status: "Completed",
      })
      .then((res) => {
        getEnquiryData();
      })
      .catch((err) => console.log(err));
  };

  const role = useUserRole();
  if (loading) return <Loader />; 

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-white h-[100vh] overflow-auto w-[90%]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Recent Enquiry</h1>

            <div className="w-[60%] flex justify-end gap-1">
              {role == "admin" ? <button
                onClick={() => exportExcel(enquiryList)}
                className="bg-[#2463EB] text-sm text-white px-4 py-2 rounded-md hover:bg-[#1C4ED8] hover:cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="mr-1">
                  <Table />
                </span>{" "}
                Export to Excel
              </button>:null}
              <button
                onClick={() => setShowModal("Add")}
                className="bg-[#2463EB] text-sm text-white px-4 py-2 rounded-md hover:bg-[#1C4ED8] hover:cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="mr-1">+</span> Add New Enquiry
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

          {/* Enquiry Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="w-[100%] bg-gray-50 ">
                <tr className="w-[100%]">
                  {[
                    "S.No",
                    "Customer Name",
                    "Phone Number",
                    "Date",
                    "Category",
                    "Product",
                    "Status",
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
                {enquiryList.map((i, index) => (
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{i?.name}</td>
                    <td className="px-4 py-3">{i?.phoneNumber}</td>
                    <td className="px-4 py-3">
                      {new Date(i?.dateOfEnquriy).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">{i?.category}</td>
                    <td className="px-4 py-3">{i?.productName}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleStatus(i?._id)}
                        className={`${
                          i?.status != "Pending"
                            ? "text-green-600 hover:text-green-800 "
                            : "text-red-600 hover:text-red-800"
                        } hover:cursor-pointer`}
                      >
                        {i?.status}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setNewEnquiryData(i);
                          setShowModal("Edit");
                        }}
                        className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEnquiry(i?._id)}
                        className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer ml-[10%]"
                      >
                        Delete
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
              <div className="bg-white rounded-lg p-6 w-[80%] max-w-4xl z-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Customer Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={newEnquiryData?.name}
                      onChange={(e) =>
                        setNewEnquiryData({
                          ...newEnquiryData,
                          name: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={newEnquiryData?.phoneNumber}
                      onChange={(e) =>
                        setNewEnquiryData({
                          ...newEnquiryData,
                          phoneNumber: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Email ID
                    </label>
                    <input
                      type="text"
                      value={newEnquiryData?.email}
                      onChange={(e) =>
                        setNewEnquiryData({
                          ...newEnquiryData,
                          email: e.target.value,
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  Product Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-gray-600 font-medium text-sm">
                      Category
                    </label>
                    <select
                      value={newEnquiryData?.category}
                      onChange={(e) =>
                        setNewEnquiryData({
                          ...newEnquiryData,
                          category: e.target.value.toUpperCase(),
                        })
                      }
                      className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    >
                      <option value="">Choose Option</option>
                      <option value="MOBILE">Mobile</option>
                      <option value="TV">TV</option>
                      <option value="FRIDGE">Fridge</option>
                      <option value="WASHING MACHINE">Washing Machine</option>
                      <option value="OTHERS">Others</option>
                    </select>
                  </div>

                  {newEnquiryData?.category && (
                    <div>
                      <label className="text-gray-600 font-medium text-sm">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={newEnquiryData?.productName}
                        onChange={(e) =>
                          setNewEnquiryData({
                            ...newEnquiryData,
                            productName: e.target.value.toUpperCase(),
                          })
                        }
                        className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setNewEnquiryData({});
                    }}
                    className="px-5 py-2 rounded-md hover:cursor-pointer w-[15%] bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() =>
                      showModal === "Add" ? addEnquiry() : updateEnquiry()
                    }
                    className="px-6 py-2 rounded-md hover:cursor-pointer bg-[#2463EB] hover:bg-[#1C4ED8] text-white font-medium transition-all w-[15%]"
                  >
                    {showModal === "Add" ? "Save" : "Update"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Enquiry;
