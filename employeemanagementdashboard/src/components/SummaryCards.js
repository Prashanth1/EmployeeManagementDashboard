import "../styles/dashboard.css";

export default function SummaryCards({ employees }) {
  const active = employees.filter(e => e.active).length;

  return (
    <div className="summary">
      <div className="card total">Total: {employees.length}</div>
      <div className="card active">Active: {active}</div>
      <div className="card inactive">Inactive: {employees.length - active}</div>
    </div>
  );
}
