import { useRef, useState } from "react";
import "../styles/form.css";

const STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"];

export default function EmployeeForm({
  employees,
  setEmployees,
  editingEmployee,
  onClose
}) {
  const [empId, setEmpId] = useState(editingEmployee?.empId || "");
  const [name, setName] = useState(editingEmployee?.name || "");
  const [gender, setGender] = useState(editingEmployee?.gender || "");
  const [dob, setDob] = useState(editingEmployee?.dob || "");
  const [state, setState] = useState(editingEmployee?.state || "");
  const [active, setActive] = useState(
    editingEmployee ? editingEmployee.active : true
  );
  const [image, setImage] = useState(editingEmployee?.image || "");
  const [error, setError] = useState("");

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const fileInputRef = useRef(null)

  const removeImage = () => {
    setImage("");
      if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!empId || !name || !gender || !dob || !state) {
      setError("All fields are required");
      return;
    }

    if (editingEmployee) {
      setEmployees(
        employees.map(emp =>
          emp.id === editingEmployee.id
            ? {
                ...emp,
                name,
                gender,
                dob,
                state,
                active,
                image
              }
            : emp
        )
      );
    } else {
      setEmployees([
        ...employees,
        {
          id: Date.now(),
          empId,
          name,
          gender,
          dob,
          state,
          active,
          image
        }
      ]);
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Employee ID */}
          <input
            placeholder="Employee ID"
            value={empId}
            onChange={e => setEmpId(e.target.value)}
            disabled={!!editingEmployee}
            // className={editingEmployee ? "readonly" : ""}
          />

          {/* Full Name */}
          <input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          {/* Gender */}
          <div className="radio-group">
                          
            <label>
                <input
                type="radio"
                name="gender"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
              />
              Male
            </label>
                        
            <label>
                <input
                type="radio"
                name="gender"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
              />
              Female
            </label>
                          
            <label>
                <input
                type="radio"
                name="gender"
                checked={gender === "Other"}
                onChange={() => setGender("Other")}
              />
              Other
            </label>
          </div>

          {/* DOB */}
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />

          {/* State */}
          <select value={state} onChange={e => setState(e.target.value)}>
            <option value="">Select State</option>
            {STATES.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Active */}
          <label className="checkbox">
            <input
              type="checkbox"
              checked={active}
              onChange={() => setActive(!active)}
            />
            Active
          </label>

          {/* Image Upload */}
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />

          {image && (
            <div className="image-preview">
              <img src={image} alt="Preview" />
              <button
                type="button"
                className="remove-image"
                onClick={removeImage}
              >
                Remove
              </button>
            </div>
          )}

          <div className="actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

