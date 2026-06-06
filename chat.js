async function send(){

const input = document.getElementById("input");
const text = input.value.trim();
if(!text) return;

const chat = document.getElementById("chat");

// user msg
chat.innerHTML += `<div class="msg user">${text}</div>`;

// AI placeholder
const id = Date.now();
chat.innerHTML += `<div class="msg ai" id="${id}">Thinking...</div>`;

input.value = "";

try{

const res = await fetch("/api/chat", {
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ message: text })
});

const data = await res.json();

document.getElementById(id).innerText = data.reply;

}catch(err){
document.getElementById(id).innerText = "Error connecting API";
}

}
