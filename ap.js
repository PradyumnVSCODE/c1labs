async function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  const chat = document.getElementById("chat");

  chat.innerHTML += `<div class="msg user">${text}</div>`;

  const aiId = Date.now();
  chat.innerHTML += `<div class="msg ai" id="${aiId}">Thinking...</div>`;

  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    if (data.reply) {
      document.getElementById(aiId).innerHTML = data.reply;
    } else {
      document.getElementById(aiId).innerHTML =
        "Error: " + (data.error || "No response from server");
    }

  } catch (err) {
    document.getElementById(aiId).innerHTML =
      "Network error / API failed";
  }
}
