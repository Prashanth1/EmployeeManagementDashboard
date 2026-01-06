import Sidebar from "../components/Sidebar";
import EmployeeTable from "../components/EmployeeTable";

export default function Employees({ employees, setEmployees, onLogout }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar onLogout={onLogout} />
      <div style={{ flex: 1, padding: "24px" }}>
        <h1>Employees</h1>
        <EmployeeTable employees={employees} setEmployees={setEmployees} />
      </div>
    </div>
  );
}
