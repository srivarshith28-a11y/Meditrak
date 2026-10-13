
import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import { getSummary, getReport } from "./api";
import WasteEntry from "./pages/WasteEntry";
import Reports from "./pages/Reports";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("Dashboard");
  const [summary, setSummary] = useState(null);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  async function openPage(nextPage) {
    setPage(nextPage);
    setError("");

    try {
      if (nextPage === "Dashboard") {
        setSummary(await getSummary());
      }

      if (nextPage === "Reports") {
        setReport(await getReport());
      }
    } catch {
      setError(
        "Could not load data. Check that your Java backend is running."
      );
    }
  }

  if (!loggedIn) {
    return <Login onLogin={() => {
      setLoggedIn(true);
      openPage("Dashboard");
    }} />;
  }

  const menuItems = ["Dashboard", "Waste Entry", "Reports"];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>MediTrak</h2>
        <p>Management System</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={page === item ? "active" : ""}
              onClick={() => openPage(item)}
            >
              {item}
            </button>
          ))}

          <button onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </nav>
      </aside>

      <main className="main">
        <header>
          <h1>{page}</h1>
          <span>MediTrak Portal</span>
        </header>

        {error && <p className="login-error">{error}</p>}

        {page === "Dashboard" && (
          <section>
            <h2>Welcome to MediTrak</h2>
            <p>Manage waste entries and view reports.</p>

            
{summary && (
  <div className="stats-grid">
    <article className="stat-card">
      <h3>Total Hospitals</h3>
      <p>{summary.hospitalCount}</p>
    </article>

    <article className="stat-card">
      <h3>Waste Entries</h3>
      <p>{summary.wasteEntries}</p>
    </article>

    <article className="stat-card">
      <h3>Total Routes</h3>
      <p>{summary.routes}</p>
    </article>

    <article className="stat-card">
      <h3>North Zone Waste</h3>
      <p>{summary.northZoneWasteKg} kg</p>
    </article>
  </div>
)}

            <div className="cards">
              <article>
                <h3>Waste Entry</h3>
                <p>Record and manage waste entries.</p>
                <button onClick={() => openPage("Waste Entry")}>
                  Open Waste Entry
                </button>
              </article>

              <article>
                <h3>Reports</h3>
                <p>View management reports.</p>
                <button onClick={() => openPage("Reports")}>
                  Open Reports
                </button>
              </article>
            </div>
          </section>
        )}

        {page === "Waste Entry" && <WasteEntry />}

        {page === "Reports" && <Reports />}
      </main>
    </div>
  );
}

export default App;