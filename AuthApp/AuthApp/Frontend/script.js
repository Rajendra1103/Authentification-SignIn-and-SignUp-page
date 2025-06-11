function showNotification(message, isSuccess) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.padding = "15px";
  notification.style.borderRadius = "5px";
  notification.style.color = "#fff";
  notification.style.backgroundColor = isSuccess ? "green" : "red";
  notification.style.fontSize = "16px";
  notification.style.zIndex = "1000";
  notification.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
  notification.style.cursor = "pointer";
  document.body.appendChild(notification);

  let timeoutId = setTimeout(() => {
    notification.remove();
  }, 5000);

  notification.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId); // Stop the timer when hovered
  });

  notification.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      notification.remove();
    }, 5000); // Restart the timer when mouse leaves
  });
}

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5280/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const message = await res.text();
    showNotification(message, res.ok);
  } catch (error) {
    showNotification("Registration failed: " + error.message, false);
  }
});

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:5280/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const message = await res.text();
    showNotification(message, res.ok);
  } catch (error) {
    showNotification("Login failed: " + error.message, false);
  }
});
