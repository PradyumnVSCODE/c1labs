async function send(){

  const input = document.getElementById("input");
  const text = input.value.trim();

  if(!text) return;

  const chat = document.getElementById("chat");

  // user message
  chat.innerHTML += `<div class="msg user">${text}</div>`;

  // AI placeholder
  const aiId = Date.now();
  chat.innerHTML += `<div class="msg ai" id="${aiId}">Thinking...</div>`;

  input.value = "";

  const res = await fetch("/api/chat", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

 document.getElementById(id).innerText =
  data.reply || data.error || "No response";
}
