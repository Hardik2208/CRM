import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Flatten nested objects like orderObject, customerObject, etc.
const flattenObject = (obj, parentKey = "", result = {}) => {
  for (let key in obj) {
    const fullKey = parentKey ? `${parentKey}_${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], fullKey, result);
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
};

// Export to PDF
export const exportPDF = (data, filename = "data.pdf") => {
  if (!data.length) return;

  const flatData = data.map((item) => flattenObject(item));
  const tableColumn = Object.keys(flatData[0]);
  const tableRows = flatData.map((item) => Object.values(item));

  const doc = new jsPDF();
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    styles: { fontSize: 8 },
  });
  doc.save(filename);
};

// Export to Excel
export const exportExcel = (data, filename = "data.xlsx") => {
  if (!data.length) return;

  const flatData = data.map((item) => flattenObject(item));
  const worksheet = XLSX.utils.json_to_sheet(flatData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, filename);
};
