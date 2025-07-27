import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ImageUploader from "../components/ImageUploader";
import { exportPDF, exportExcel } from "../components/Pdf";
import { FileText, Table } from "lucide-react";
import { useUserRole } from "../components/hooks";
import Loader from "../components/loader";

import Sidebar from "../components/Sidebar";

function Purchase() {
  const [purchase, setPurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userRole } = useUserRole();

  const getPurchase = () => {
    axios
      .get("https://shop-software.onrender.com/api/purchase")
      .then((res) => {
        setPurchase(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPurchase();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-white h-[100vh] overflow-auto w-[90%]">
          <div className="flex justify-left items-center mb-6">
            <h1 className="text-3xl font-bold">Recent Purchases</h1>
          </div>

          {/* Purchase Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="w-[100%] bg-gray-50 ">
                <tr className="w-[100%]">
                  {[
                    "Serial No",
                    "Category",
                    "Modal Name",
                    "Quanity",
                    "Supplier Name",
                    "Supplier GST No",
                    "Supplier Address",
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
                {purchase.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3 font-medium">
                      {item?.category || "-"}
                    </td>
                    <td className="px-6 py-3 font-medium">
                      {item?.modelName || "-"}
                    </td>
                    <td className="px-6 py-3">{item?.quantity || "-"}</td>
                    <td className="px-6 py-3 font-medium">
                      {item?.supplierObject?.name || "-"}
                    </td>
                    <td className="px-6 py-3">
                      {item?.supplierObject?.gstNo || "-"}
                    </td>
                    <td className="px-6 py-3">
                      {item?.supplierObject?.address || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchase;
