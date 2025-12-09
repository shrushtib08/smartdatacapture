import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToPDF = (content: string, filename: string) => {
  const doc = new jsPDF();
  const splitText = doc.splitTextToSize(content, 180);
  doc.text(splitText, 10, 10);
  doc.save(`${filename}.pdf`);
};

export const exportToExcel = (content: string, filename: string) => {
  const ws = XLSX.utils.json_to_sheet([{ content, timestamp: new Date().toISOString() }]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportToWord = (content: string, filename: string) => {
  const blob = new Blob([`
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>${content.replace(/\n/g, "<br>")}</p>
      </body>
    </html>
  `], { type: "application/msword;charset=utf-8" });
  saveAs(blob, `${filename}.doc`);
};
