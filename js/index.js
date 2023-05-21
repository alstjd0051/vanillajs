const chatLog = document.getElementById("chat-log"),
  userInput = document.getElementById("user-input"),
  sendButton = document.getElementById("send-button"),
  buttonIcon = document.getElementById("button-icon"),
  info = document.querySelector(".info");

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();
  // if Message = empty do noting
  if (message === "") {
    return;
  } else if (message === "developer") {
    userInput.value = "";
    appendMessage("user", message);

    setTimeout(() => {
      appendMessage(
        "bot",
        "This Sourcee Coded By Tyler Song \n Gmail: wsc7202@gmail.com"
      );
      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  }

  appendMessage("user", message);
  userInput.value = "";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "d2c0ad0d38msh96bd5a80c06d03bp1070b9jsnea8c89b0b2ba",
      "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
    },
    body: `{"messages":[{"role":"user","content":"${message}"}]}`,
  };
  fetch("https://chatgpt53.p.rapidapi.com/", options)
    .then((response) => response.json())
    .then((response) => {
      appendMessage("bot", response.choices[0].message.content);

      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    })
    .catch((err) => {
      if (err.name === "TypeError") {
        appendMessage("bot", "Error : Check Your Api Key!");
        buttonIcon.classList.add("fa-solid", "fa-paper-plane");
        buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
      }
    });
}

function appendMessage(sender, message) {
  info.style.display = "none";
  buttonIcon.classList.remove("fa-solid", "fa-paper-plane");
  buttonIcon.classList.add("fas", "fa-spinner", "fa-pulse");

  const messageEl = document.createElement("div");
  const iconEl = document.createElement("div");
  const ChatEl = document.createElement("div");
  const icon = document.createElement("div");

  ChatEl.classList.add("chat-box");
  iconEl.classList.add("icon");
  messageEl.classList.add(sender);
  messageEl.innerText = message;

  if (sender === "user") {
    icon.classList.add("fa-regular", "fa-user");
    iconEl.setAttribute("id", "user-icon");
  } else {
    icon.classList.add("fa-solid", "fa-robot");
    iconEl.setAttribute("id", "bot-icon");
  }

  iconEl.appendChild(icon);
  ChatEl.appendChild(iconEl);
  ChatEl.appendChild(messageEl);
  chatLog.appendChild(ChatEl);
  chatLog.scrollTo = chatLog.scrollHeight;
}
