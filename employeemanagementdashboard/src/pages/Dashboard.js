import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import EmployeeTable from "../components/EmployeeTable";

export default function Dashboard({ employees, setEmployees, onLogout }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar onLogout={onLogout} />
      <div style={{ flex: 1, padding: "24px" }}>
        <h1 className="page-title">Dashboard</h1>
        <SummaryCards employees={employees} />
      </div>
    </div>
  );
}
