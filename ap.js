async function send(){

  const input = document.getElementById("input");
  const text = input.value.trim();

  if(!text) return;

  const chat = document.getElementById("chat");

  // show user message
  chat.innerHTML += `<div class="msg user">You: ${text}</div>`;

  // show temporary AI message
  const aiId = Date.now();
  chat.innerHTML += `<div class="msg ai" id="${aiId}">Thinking...</div>`;

  input.value = "";

  try {

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    document.getElementById(aiId).innerHTML =
      "Continuum: " + (data.reply || "No response");

  } catch (error) {

    console.error("Error:", error);
    document.getElementById(aiId).innerHTML =
      "Error: " + error.message;

  }
}