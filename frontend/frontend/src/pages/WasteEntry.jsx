
import { useEffect, useState } from "react";
import { addWaste, getHospitals } from "../api";

function WasteEntry() {
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState({
    hospitalId: "",
    wasteType: "",
    quantityKg: "",
    binColor: "",
    pickupDate: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getHospitals()
      .then(setHospitals)
      .catch(() => setError("Could not load hospitals. Check the backend."));
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    try {
      await addWaste({
        ...form,
        hospitalId: Number(form.hospitalId),
        quantityKg: Number(form.quantityKg),
      });

      setMessage("Waste entry saved successfully!");
      setForm({
        hospitalId: "",
        wasteType: "",
        quantityKg: "",
        binColor: "",
        pickupDate: "",
      });
    } catch (err) {
      setError(err.message || "Could not save the waste entry.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="waste-form-section">
      <h2>Record Waste Entry</h2>
      <p>Enter hospital waste collection details.</p>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="login-error">{error}</p>}

      {hospitals.length === 0 && (
        <p>No hospitals available. Register a hospital before adding waste.</p>
      )}

      <form className="waste-form" onSubmit={handleSubmit}>
        <label htmlFor="hospitalId">Hospital</label>
        <select
          id="hospitalId"
          name="hospitalId"
          value={form.hospitalId}
          onChange={handleChange}
          required
        >
          <option value="">Select hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name}
            </option>
          ))}
        </select>

        <label htmlFor="wasteType">Waste type</label>
        <select
          id="wasteType"
          name="wasteType"
          value={form.wasteType}
          onChange={handleChange}
          required
        >
          <option value="">Select waste type</option>
          <option value="General">General</option>
          <option value="Biomedical">Biomedical</option>
          <option value="Hazardous">Hazardous</option>
          <option value="Sharps">Sharps</option>
        </select>

        <label htmlFor="quantityKg">Quantity (kg)</label>
        <input
          id="quantityKg"
          name="quantityKg"
          type="number"
          min="0.01"
          step="0.01"
          value={form.quantityKg}
          onChange={handleChange}
          required
        />

        <label htmlFor="binColor">Bin color</label>
        <select
          id="binColor"
          name="binColor"
          value={form.binColor}
          onChange={handleChange}
          required
        >
          <option value="">Select bin color</option>
          <option value="Yellow">Yellow</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
        </select>

        <label htmlFor="pickupDate">Pickup date</label>
        <input
          id="pickupDate"
          name="pickupDate"
          type="date"
          value={form.pickupDate}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={saving || hospitals.length === 0}
        >
          {saving ? "Saving..." : "Save Waste Entry"}
        </button>
      </form>
    </section>
  );
}

export default WasteEntry;