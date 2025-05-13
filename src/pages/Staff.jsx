import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUploader from "../components/ImageUploader";

const Staff = () => {
  const [showModal, setShowModal] = useState("");
  const [showModal2, setShowModal2] = useState(false);
  const [newStaff, setNewStaff] = useState({});
  const [staffList, setStaffList] = useState([]);
  const [attendance, setAttendance] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const today = new Date();
  const currentDay = today.getDate();
  const year = today.getFullYear();
  const month = today.getMonth();
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(year, month);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getStaffData = () => {
    axios
      .get("https://shop-software.onrender.com/api/staff")
      .then((res) => setStaffList(res.data))
      .catch((err) => console.log(err));
  };

  const addStaff = () => {
    axios
      .post(`https://shop-software.onrender.com/api/staff`,newStaff)
      .then((res) => {getStaffData(),setShowModal("")})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStaffData();
  }, []);

  const addAttendance = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    axios
      .post(`https://shop-software.onrender.com/api/attendance/${year}/${month}`, {
        staff_id: selectedId,
        status: attendance,
      })
      .then((res) => {
        console.log("Saved Successfully");
        setAttendance(""); // Clear the attendance status after successful submission
        getAttendance(); // Refresh the attendance list
        setShowModal2(false); // Close the modal
      })
      .catch((err) => {
        // Check if the error response has a message
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message); // Show the specific error message
        } else {
          alert("Error: " + err.message); // Show the general error message
        }
      });
  };

  const getStatusForDay = (staffId, day) => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0];
    const record = attendanceList.find(
      (att) => att.staff_id === staffId && att.date === dateStr
    );
    return record ? record.status : null;
  };
  // UI Components
  return (
    <div className="p-6  h-[100vh] bg-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staffs</h1>
        <button
          onClick={() => setShowModal("Add")}
          className="bg-[#615AE7] text-white px-4 py-2 rounded-md hover:bg-[#615ae7d6] hover:cursor-pointer"
        >
         <span className="mr-1">+</span> Add New Staff
        </button>
      </div>

      {/* Order Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="w-[100%] bg-gray-50 ">
            <tr className="w-[100%]">
              {[
                "S.No",
                "Work",
                "Name",
                "Phone Number",
                "Address",
                "Reportings",
                "Leaves",
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
            {staffList.map((i, index) => (
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{i.work}</td>
                <td className="px-6 py-4">{i.staffName}</td>
                <td className="px-6 py-4">{i.staffPhoneNumber}</td>
                <td className="px-6 py-4">{i.address}</td>
                <td className="px-6 py-4 flex items-center justify-center">
                  <button
                    onClick={() => {
                      setShowModal2(true);
                      setSelectedId(i._id);
                      // getAttendance();
                    }}
                    className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer"
                  >
                    Manage
                  </button>
                </td>
                <td className="px-6 py-4">{i.leavesAllowded}</td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <button
                    onClick={() => {
                      setNewStaff(i), setShowModal("Edit");
                    }}
                    className="text-blue-500 hover:text-indigo-900 hover:cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setNewStaff(i), setShowModal("View");
                    }}
                    className="text-blue-500 ml-[25%] hover:text-indigo-900 hover:cursor-pointer"
                  >
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
          <div className="bg-white rounded-lg p-6 w-[80%] max-w-4xl z-10 h-[70vh] overflow-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Work Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Work:</label>
                <input
                  value={newStaff.work}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      work: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Work Timmings:</label>
                <input
                  value={newStaff.workTimmings}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      workTimmings: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Salary:</label>
                <input
                  value={newStaff.salary}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, salary: e.target.value })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="number"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Leaves Allowded:</label>
                <input
                  value={newStaff.leavesAllowded}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, leavesAllowded: e.target.value })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="number"
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Staff's Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Name:</label>
                <input
                  value={newStaff.staffName}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      staffName: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Phone number:</label>
                <input
                  value={newStaff.staffPhoneNumber}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      staffPhoneNumber: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">E-mail:</label>
                <input
                  value={newStaff.staffEmail}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      staffEmail: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Address:</label>
                <input
                  value={newStaff.address}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      address: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Aadhar Card Number:</label>
                <input
                  value={newStaff.aadharCardNumber}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      aadharCardNumber: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">PAN Card Number:</label>
                <input
                  value={newStaff.panCardNumber}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      panCardNumber: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-2 w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Staff's Picture:</label>

                <ImageUploader
                  setNewStaff={setNewStaff}
                  newStaff={newStaff}
                  imageKey="staffImage"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setShowModal(false), setNewStaff({});
                }}
                className="px-4 py-2 w-[15%] bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              {showModal == "Add" ? (
                <button
                  onClick={() => {
                    addStaff();
                  }}
                  className="px-4 py-2 bg-[#615AE7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6] disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Save"}
                </button>
              ) : showModal == "Edit" ? (
                <button
                  onClick={() => {
                    updatestaff();
                  }}
                  className="px-4 py-2 bg-[#615AE7] w-[15%] text-white rounded-md hover:bg-[#615ae7d6]   disabled:opacity-50 hover:cursor-pointer"
                >
                  {"Update"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {showModal2 && (
        <div className="fixed flex w-full h-full top-0 left-0 items-center z-50 justify-center">
          <div className="absolute w-full h-full inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-3/4 h-[90vh] max-w-4xl z-10 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">
                Staff Attendance -{" "}
                {today.toLocaleString("default", { month: "long" })} {year}
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {daysArray.map((day) => {
                  const isToday = day === currentDay;

                  // Get the status for the specific day (present, leave, half-day)
                  const statusForDay = getStatusForDay(selectedId, day);

                  // Determine the base box class
                  const boxClassNames = [
                    "w-14 h-14 rounded-xl border flex flex-col items-center justify-center text-sm font-semibold",

                    "bg-green-100 border-green-500 shadow-md",
                  ];

                  // Apply a green color for days that are "present"
                  if (statusForDay === "present") {
                    boxClassNames.push("bg-green-100 border-green-500");
                  }

                  // Apply red color for "leave" or "absent" status
                  if (statusForDay === "leave") {
                    boxClassNames.push("bg-red-100 border-red-500");
                  }

                  return (
                    <div key={day} className={boxClassNames.join(" ")}>
                      <span>{day}</span>
                      <div className="flex gap-1 mt-1">
                        {["present", "leave", "half-day"].map((option) => (
                          <input
                            key={option}
                            type="radio"
                            name={`status-${day}`}
                            checked={
                              statusForDay === option ||
                              (isToday && attendance === option)
                            }
                            disabled={!isToday || !!statusForDay}
                            onChange={() => setAttendance(option)}
                            className={`w-4 h-4 ${
                              option === "present"
                                ? "accent-green-600"
                                : option === "leave"
                                ? "accent-red-600"
                                : "accent-blue-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={addAttendance}
                disabled={!attendance}
                className={`px-4 py-2 bg-[#615AE7] text-white rounded-md ${
                  attendance
                    ? "hover:bg-[#615ae7d6]"
                    : "opacity-50 cursor-not-allowed"
                } mr-2`}
              >
                Save
              </button>
              <button
                onClick={() => setShowModal2(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
