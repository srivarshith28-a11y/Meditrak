<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MediTrack Reports</title>
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <main class="page-grid">
    <section class="card">
      <h1>Route Optimization Reports</h1>
      <div class="stats-grid">
        <article class="stat-card">
          <span>Total Hospitals</span>
          <strong>${summary.hospitalCount}</strong>
        </article>
        <article class="stat-card">
          <span>Total Waste Entries</span>
          <strong>${summary.wasteEntries}</strong>
        </article>
        <article class="stat-card">
          <span>North Zone Waste</span>
          <strong>${summary.northZoneWasteKg} kg</strong>
        </article>
      </div>
    </section>

    <section class="card">
      <h2>Optimized Route Report</h2>
      <table>
        <thead>
          <tr>
            <th>Route ID</th>
            <th>Zone</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Waste</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          <c:forEach items="${routes}" var="route">
            <tr>
              <td>${route.routeId}</td>
              <td>${route.zone}</td>
              <td>${route.vehicleNumber}</td>
              <td>${route.driverName}</td>
              <td>${route.estimatedWasteKg}</td>
              <td>${route.optimizedDistanceKm}</td>
            </tr>
          </c:forEach>
        </tbody>
      </table>
      <a href="/react/dashboard.html">Open React dashboard</a>
    </section>
  </main>
</body>
</html>
