<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MediTrack Login</title>
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <main class="form-page">
    <form class="card form-card" method="post" action="/login">
      <h1>Hospital Login</h1>
      <p class="muted">Demo credentials: <code>admin</code> / <code>meditrak123</code></p>
      <label>Username <input type="text" name="username" required></label>
      <label>Password <input type="password" name="password" required></label>
      <button type="submit">Login</button>
      <p class="message">${message}</p>
      <a href="/">Back to home</a>
    </form>
  </main>
</body>
</html>
