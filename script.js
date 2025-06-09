const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const input = document.getElementById("user-input");
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage("user", userText);
  input.value = "";

  setTimeout(() => {
    handleBotResponse(userText.toLowerCase());
  }, 500);
}
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

function appendMessage(sender, text, isHTML = false) {
  const msg = document.createElement("div");
  msg.classList.add(sender === "user" ? "user-msg" : "bot-msg");

  msg.innerHTML = isHTML ? text : escapeHTML(text);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let userName = "";

function handleBotResponse(msg) {
  
  const reserveRegex = /reserve.*for\s(\d+).*at\s(\d+(am|pm))\s?(under\s([a-zA-Z]+))?/;
  const match = msg.match(reserveRegex);

  if (match) {
    
    const guests = match[1];
    const time = match[2];
    const name = match[5] || "guest";
    appendMessage("bot", `✅ Table for ${guests} reserved at ${time} under the name "${name}".`);
  } else if (msg.includes("reserve")|| msg.includes("reservation")|| msg.includes("i would like to make a reservation")|| msg.includes("i want to book a table") || msg.includes("book")|| msg.includes("booking")) {
    appendMessage("bot", `
      📝 To make a reservation, type:<br>
      <em>Reserve table for [number] at [time] under [name]</em><br>
      <small>Example: Reserve table for 3 at 8pm under Emma</small>
    `, true);
  } else if (msg.includes("hours") || msg.includes("open")|| msg.includes("open hours")) {
    appendMessage("bot", "🕒 We're open daily from 10 AM to 10 PM.");
  } else if (msg.includes("contact")) {
    appendMessage("bot", "📞 Contact us at: 0812500867");
  } else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
  const greetings = [
    "Hey there! How can I assist you today?",
    "Hello! Hope you're having a great day!",
    "Hi! Need help with reservations or the menu?",
    "Hey! What can I do for you today?",
    "Hello! I'm here to assist. Ask me anything.",
    "Hi! 👋 Looking for special offers or our menu?",
    "Hey hey! 😊 Ready to help. Ask away!"
  ];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  appendMessage("bot", `
    <img src="giphy.gif" class="menu-img">
    <br>${randomGreeting}
  `, true);



  // ✅ Additional logic below
    } else if (msg.includes("menu")|| msg.includes("Food")|| msg.includes("Food items"))  {
    let menuHTML = "<strong>🍽 Our Menu:</strong><br><br>";
    menu.forEach(section => {
      menuHTML += `🔹 <strong>${section.category}</strong><br>`;
      section.items.forEach(item => {
        menuHTML += `&nbsp;&nbsp;&nbsp;• ${item.name} - ${item.price}<br>`;
      });
      menuHTML += `<br>`;
    });
    appendMessage("bot", menuHTML, true);


  } else if (msg.includes("special offers") || msg.includes("any offers") || msg.includes("offers")) {
  fetch('offers.php')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        data.forEach(offer => appendMessage("bot", offer));
      } else {
        appendMessage("bot", "Sorry! Couldn’t fetch offers right now.");
      }
    })
    .catch(err => {
      appendMessage("bot", "An error occurred while fetching offers.");
    });

  } else if (msg.includes("what is your name") || msg.includes("your name")) {
    appendMessage("bot", "My name is Reddie! 👋 How can I help you?");
  } else if (msg.includes("Are you a real person")|| msg.includes("Real person")) {
    appendMessage("bot", "NO! I'am a Software!")
  } else if (msg.startsWith("my name is") || msg.startsWith("i am") || msg.startsWith("i'm")|| msg.startsWith("im")|| msg.startsWith("i")) {
    userName = msg.split(" ").slice(-1)[0];
    appendMessage("bot", `Nice to meet you, ${userName}! How can I assist you today?`);
  } else if (msg.includes("good morning") || msg.includes("morning")) {
    appendMessage("bot", "Hi! Good Morning!");
  } else if (msg.includes("good evening") || msg.includes("evening")) {
    appendMessage("bot", "Hi! Good Evening!");
  } else if (msg.includes("how are you")) {
    appendMessage("bot", "I'm Fine!! Thank you!!");
    appendMessage("bot", `<img src="smile.gif" width='200px' height='200px' alt="Smile" />`, true);
  } else if (msg.includes("play area") || msg.includes("any play area")|| msg.includes("any play ground for children")) {
    appendMessage("bot", "Yeah! We have a play area.");
    appendMessage("bot", `<img src="playground.jpeg" width='300px' height='300px' alt="Play Area" />`, true);
  } else if (msg.includes("payment") || msg.includes("how can we pay") || msg.includes("card or cash") || msg.includes("card or cash") || msg.includes("what are the payment methods?")) {
    appendMessage("bot", "You can pay online using your credit/debit card or by using COD.");
    appendMessage("bot", `<img src="money.gif" width='200px' height='200px' alt="Payment Method" />`, true);
  } else if (msg.includes("extra charges") || msg.includes("any extra charges")|| msg.includes("other payments")) {
    appendMessage("bot", "No!! There are no extra charges.");
    appendMessage("bot", `<img src="clap.gif" width='200px' height='200px' alt="Clap" />`, true);
  } else if (msg.includes("party packages") || msg.includes("packages")) {
    appendMessage("bot", `
      ⚡PARTY PACKAGE SRI LANKAN MENU (10pax) just for 13000/= <br>
      ⚡PARTY PACKAGE SET MENU (10pax) just for 10000/= <br>
      ⚡PARTY PACKAGE BBQ NIGHT MENU (10pax) just for 25000/=
    `, true);
  } else if (msg.includes("thanks") || msg.includes("thank you") || msg.includes("okay")) {
    appendMessage("bot", "Is there anything else I can help with?");
  } else if (msg.includes("no thank you") || msg === "no") {
    appendMessage("bot", "Sure! Thank you for using our chatbot!! Have a good day!!");
    appendMessage("bot", `<img src="wave.gif" width='200px' height='100px' alt="Wave" />`, true);
  } else if (msg.includes("bye")) {
    appendMessage("bot", "Thank you for using our chatbot!! Have a good day!!");
    appendMessage("bot", `<img src="wave.gif" width='200px' height='100px' alt="Wave" />`, true);
  } else {
    if (userName) {
      appendMessage("bot", `I'm sorry, ${userName}, I didn't understand that. How can I assist you?`);
    } else {
      appendMessage("bot", "🤖 I didn't understand that. Try asking about reservations or party packages.");
    }
    
  }
}
