import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import "../styles/table.css";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdLocalPrintshop } from "react-icons/md";
import { Toaster, toast } from 'react-hot-toast';

export default function EmployeeTable({ employees, setEmployees }) {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const openAddForm = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const openEditForm = emp => {
    setEditingEmployee(emp);
    setShowForm(true);
  };

  // const deleteEmployee = id => {
  //   if (window.confirm("Are you sure you want to delete this employee?")) {
  //     setEmployees(employees.filter(e => e.id !== id));
  //   }
  // };
//   const deleteEmployee = id => {
//   if (window.confirm("Delete employee?")) {
//     setEmployees(employees.filter(e => e.id !== id));
//     toast.success("Employee removed successfully", {
//       style: {
//         border: '1px solid #713200',
//         padding: '16px',
//         color: '#713200',
//       },
//       iconTheme: {
//         primary: '#ff4b4b',
//         secondary: '#FFFAEE',
//       },
//     });
//   }
// };

const deleteEmployee = (id) => {
  toast((t) => (
    <span style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <b>Delete employee?</b>
      <p style={{ margin: 0, fontSize: '14px' }}>Are you sure you want to delete this employee?</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
        <button
          onClick={() => {
            setEmployees(employees.filter((e) => e.id !== id));
            toast.dismiss(t.id);
            toast.success("Employee deleted!");
          }}
          style={{
            background: '#ff4b4b',
            color: '#fff',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Yes, Delete
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            background: '#eee',
            color: '#333',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </span>
  ), {
    duration: 6000, // Give user 6 seconds to decide
    position: 'top-center',
  });
};

  const filteredEmployees = employees.filter(emp => {
    debugger
    const matchesName = emp.name
      ? emp.name.toLowerCase().includes(searchName.toLowerCase())
      : false;
    const matchesGender = filterGender ? emp.gender === filterGender : true;
    const matchesStatus =
      filterStatus
        ? (filterStatus === "Active" && emp.active) ||
          (filterStatus === "Inactive" && !emp.active)
        : true;

    return matchesName && matchesGender && matchesStatus;
  });

  const handlePrint = () => {
  const table = document
    .getElementById("employee-print-table")
    .querySelector("table")
    .cloneNode(true);

  table.querySelector("thead tr").lastElementChild.remove();
  table.querySelectorAll("tbody tr").forEach(row => {
    row.lastElementChild.remove();
  });

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <html>
      <head>
        <title></title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; }
          th { background: #f3f4f6; }
        </style>
      </head>
      <body>
        ${table.outerHTML}
      </body>
    </html>
  `);
  doc.close();

  iframe.contentWindow.focus();
  iframe.contentWindow.print();

  iframe.contentWindow.onafterprint = () => {
    document.body.removeChild(iframe);
  };
};




  return (
    <>
    <div className="table-header">
      <button className="add-btn" onClick={openAddForm}>
        + Add Employee
      </button>
        <button className="print-btn" onClick={handlePrint}>
        <MdLocalPrintshop /> Print
      </button>
    </div>
    <div className="filters">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
        <select
          value={filterGender}
          onChange={e => setFilterGender(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    <div id="employee-print-table">
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Profile Image</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.empId?emp.empId:"--"}</td>
              <td>
                {emp.image ? (
                  <img src={emp.image} alt="" className="avatar" width="40"/>
                ) : "—"}
              </td>
              <td>{emp.name?emp.name:"--"}</td>
              <td>{emp.gender?emp.gender:'--'}</td>
              <td>{emp.dob?emp.dob:"--"}</td>
              <td>{emp.state?emp.state:"--"}</td>
              <td>{emp.active ? "Active" : "Inactive"}</td>
              <td>
                <div className="action-icons">
                <CiEdit onClick={() => openEditForm(emp)}/>
                <RiDeleteBin6Line onClick={() => deleteEmployee(emp.id)}/>
                  </div>
              </td>
            </tr>
          ))}
          {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No employees found.
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
      {showForm && (
        <EmployeeForm
          employees={employees}
          setEmployees={setEmployees}
          editingEmployee={editingEmployee}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
