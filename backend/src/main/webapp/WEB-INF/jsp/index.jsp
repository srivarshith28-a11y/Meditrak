<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MediTrack | Full Stack Biomedical Waste Management</title>
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <header class="topbar">
    <div>
      <p class="eyebrow">MediTrack</p>
      <h1>Biomedical Waste Collection and Route Optimization System</h1>
      <p class="lead">Built with HTML, CSS, JavaScript, JSP, JDBC, MySQL, Spring Boot, and React concepts from your sessions.</p>
    </div>
    <nav class="nav-links">
      <a href="/login">Login</a>
      <a href="/hospitals">Hospital Registration</a>
      <a href="/waste-entry">Waste Entry</a>
      <a href="/reports">Reports</a>
      <a href="/react/dashboard.html">React Dashboard</a>
    </nav>
  </header>

  <main class="page-grid">
    <section class="card hero-card">
      <h2>Full Stack Flow</h2>
      <div class="flow-grid">
        <div><strong>Frontend</strong><span>JSP pages, forms, CSS, JavaScript validation</span></div>
        <div><strong>Database</strong><span>MySQL schema, SQL queries, normalized design</span></div>
        <div><strong>Backend</strong><span>Spring Boot controllers, JdbcTemplate, REST APIs</span></div>
        <div><strong>Dashboard</strong><span>React UI consuming <code>/api</code> endpoints</span></div>
      </div>
    </section>

    <section class="stats-grid">
      <article class="card stat-card">
        <span>Hospitals</span>
        <strong>${summary.hospitalCount}</strong>
      </article>
      <article class="card stat-card">
        <span>Waste Entries</span>
        <strong>${summary.wasteEntries}</strong>
      </article>
      <article class="card stat-card">
        <span>Routes</span>
        <strong>${summary.routes}</strong>
      </article>
      <article class="card stat-card">
        <span>North Zone Waste</span>
        <strong>${summary.northZoneWasteKg} kg</strong>
      </article>
    </section>

    <section class="card">
      <h2>Optimized Routes</h2>
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
          <c:forEach items="${routes}" var="route">
            <tr>
              <td>${route.zone}</td>
              <td>${route.vehicleNumber}</td>
              <td>${route.driverName}</td>
              <td>${route.estimatedWasteKg}</td>
              <td>${route.optimizedDistanceKm}</td>
            </tr>
          </c:forEach>
        </tbody>
      </table>
    </section>
  </main>
</body>
</html>
