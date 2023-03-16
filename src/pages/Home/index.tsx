// import { TabsFilter } from "@newrank/fe-youdesign";
import React from "react";

import XLSX from "xlsx";
import { saveAs } from "file-saver";

const App: React.FC = () => {
  const data = [
    { name: "Jack", age: 23, gender: "male" },
    { name: "Alice", age: 21, gender: "female" },
    { name: "Tom", age: 25, gender: "male" },
  ];

  const exportExecl = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "example.xlsx");
  };

  return (
    <div>
      <h1>home</h1>
      {/* <button onClick={exportExecl}>导出</button> */}
    </div>
  );
};

export default App;
