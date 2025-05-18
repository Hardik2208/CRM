import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Helper to flatten deeply nested objects
const flattenObject = (obj, parentKey = "", result = {}) => {
  for (let key in obj) {
    const fullKey = parentKey ? `${parentKey}_${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], fullKey, result);
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
};

// PDF Export
export const exportPDF = async (data, suggestedName = "exported_data.pdf") => {
  if (!data?.length) {
    alert("No data to export.");
    return;
  }

  const flatData = data.map((item) => flattenObject(item));
  const tableColumn = Object.keys(flatData[0]);
  const tableRows = flatData.map((item) => Object.values(item));

  const doc = new jsPDF();
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    styles: { fontSize: 8 },
  });

  const blob = doc.output("blob");

  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName,
        types: [{
          description: "PDF Document",
          accept: { "application/pdf": [".pdf"] },
        }],
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (err) {
      console.error("Save cancelled or failed", err);
    }
  } else {
    saveAs(blob, suggestedName);
  }
};

// Excel Export
export const exportExcel = async (data, suggestedName = "exported_data.xlsx") => {
  if (!data?.length) {
    alert("No data to export.");
    return;
  }

  const flatData = data.map((item) => flattenObject(item));
  const worksheet = XLSX.utils.json_to_sheet(flatData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName,
        types: [{
          description: "Excel Workbook",
          accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
          },
        }],
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (err) {
      console.error("Save cancelled or failed", err);
    }
  } else {
    saveAs(blob, suggestedName);
  }
};
