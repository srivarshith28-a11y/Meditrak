const { useEffect, useState } = React;

function DashboardCard({ title, value }) {
  return (
    <article className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
    </article>
  );
}

function App() {
  const [summary, setSummary] = useState({});
  const [report, setReport] = useState({ routes: [] });
  const [zone, setZone] = useState("North");
  const [optimizedRoutes, setOptimizedRoutes] = useState([]);

  useEffect(() => {
    fetch("/api/summary").then((res) => res.json()).then(setSummary);
    fetch("/api/getReport").then((res) => res.json()).then(setReport);
  }, []);

  const optimize = async () => {
    const response = await fetch("/api/optimizeRoute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zone })
    });
    const data = await response.json();
    setOptimizedRoutes(data);
  };

  return (
    <div className="page-grid">
      <section className="stats-grid">
        <DashboardCard title="Hospitals" value={summary.hospitalCount ?? "-"} />
        <DashboardCard title="Waste Entries" value={summary.wasteEntries ?? "-"} />
        <DashboardCard title="Routes" value={summary.routes ?? "-"} />
        <DashboardCard title="North Zone Waste" value={`${summary.northZoneWasteKg ?? "-"} kg`} />
      </section>

      <section className="card">
        <h2>Optimize Route by Zone</h2>
        <div className="nav-links">
          <select value={zone} onChange={(event) => setZone(event.target.value)}>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>
          <button onClick={optimize}>Run Optimization</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Zone</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Waste (kg)</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {optimizedRoutes.map((route) => (
              <tr key={route.routeId}>
                <td>{route.zone}</td>
                <td>{route.vehicleNumber}</td>
                <td>{route.driverName}</td>
                <td>{route.estimatedWasteKg}</td>
                <td>{route.optimizedDistanceKm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Report Output</h2>
        <table>
          <thead>
            <tr>
              <th>Zone</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Waste (kg)</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {(report.routes || []).map((route) => (
              <tr key={route.routeId}>
                <td>{route.zone}</td>
                <td>{route.vehicleNumber}</td>
                <td>{route.driverName}</td>
                <td>{route.estimatedWasteKg}</td>
                <td>{route.optimizedDistanceKm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
