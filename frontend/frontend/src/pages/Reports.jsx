
import { useEffect, useState } from "react";
import { getReport } from "../api";

function Reports() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadReport() {
    setLoading(true);
    setError("");

    try {
      const data = await getReport();
      setReport(data);
    } catch (err) {
      setError("Could not load reports. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport();
  }, []);

  if (loading) {
    return <section><h2>Reports</h2><p>Loading reports...</p></section>;
  }

  if (error) {
    return (
      <section>
        <h2>Reports</h2>
        <p>{error}</p>
        <button onClick={loadReport}>Retry</button>
      </section>
    );
  }

  const entries = report?.wasteEntries ?? [];

  return (
    <section className="reports-section">
      <h2>Waste Reports</h2>
      <p>Waste collection records retrieved from the database.</p>

      <div className="report-summary">
        <div className="stat-card">
          <h3>Total Hospitals</h3>
          <p>{report?.summary?.hospitalCount ?? 0}</p>
        </div>

        <div className="stat-card">
          <h3>Total Waste Entries</h3>
          <p>{entries.length}</p>
        </div>

        <div className="stat-card">
          <h3>Total Quantity (kg)</h3>
          <p>
            {entries
              .reduce(
                (total, entry) =>
                  total + Number(entry.quantityKg ?? 0),
                0
              )
              .toFixed(2)}
          </p>
        </div>
      </div>

      <div className="report-table-container">
        <h3>Waste Entry Records</h3>

        {entries.length === 0 ? (
          <p>No waste entries found.</p>
        ) : (
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hospital ID</th>
                <th>Waste Type</th>
                <th>Quantity (kg)</th>
                <th>Bin Color</th>
                <th>Status</th>
                <th>Pickup Date</th>
              </tr>
            </thead>

            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.hospitalId}</td>
                  <td>{entry.wasteType}</td>
                  <td>{Number(entry.quantityKg ?? 0).toFixed(2)}</td>
                  <td>{entry.binColor}</td>
                  <td>{entry.collectionStatus}</td>
                  <td>
                    {entry.pickupDate
                      ? String(entry.pickupDate).slice(0, 10)
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button onClick={loadReport}>Refresh Reports</button>
      </div>
    </section>
  );
}

export default Reports;