const app = document.getElementById("chat-app");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const chatBody = document.getElementById("chat-body");
const sendButton = document.getElementById("send-button");
const newChatButton = document.getElementById("new-chat");
const welcomeScreen = document.getElementById("welcome-screen");
const conversationScreen = document.getElementById("conversation-screen");
const welcomeSuggestions = document.getElementById("welcome-suggestions");
const welcomeSuggestionToggle = document.getElementById("welcome-suggestion-toggle");
const conversationSuggestions = document.getElementById("conversation-suggestions");
const offlineBanner = document.getElementById("offline-banner");
const scrollBottomButton = document.getElementById("scroll-bottom");

const MASCOT_IMAGE = "/models/mascot.webp";
const FOLLOW_UP_PROMPTS = [
  "Berapa lama perjalanan?",
  "Apa rute terbaik?",
  "Ada tempat istirahat?",
  "Apa yang perlu disiapkan?"
];

let userId;
let activeSessionId;
let isBusy = true;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value.trim());
});

input.addEventListener("input", () => {
  resizeInput();
  if (input.value.trim()) {
    if (app.classList.contains("is-welcome")) welcomeSuggestions.hidden = true;
    else conversationSuggestions.hidden = true;
  }
});
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

newChatButton.addEventListener("click", async () => {
  if (isBusy) return;
  setBusy(true);
  offlineBanner.hidden = true;
  try {
    await createSession();
  } catch (error) {
    showError(error);
  } finally {
    setBusy(false);
    input.focus();
  }
});

for (const suggestionList of [welcomeSuggestions, conversationSuggestions]) {
  suggestionList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-prompt]");
    if (!button || isBusy || !activeSessionId) return;
    sendMessage(button.dataset.prompt);
  });
}

chatBody.addEventListener("scroll", updateScrollButton, { passive: true });
scrollBottomButton.addEventListener("click", scrollToBottom);

welcomeSuggestionToggle.addEventListener("click", () => {
  const collapsed = welcomeSuggestions.classList.toggle("is-collapsed");
  welcomeSuggestionToggle.setAttribute("aria-expanded", String(!collapsed));
  welcomeSuggestionToggle.setAttribute(
    "aria-label",
    collapsed ? "Tampilkan saran pertanyaan" : "Sembunyikan saran pertanyaan"
  );
});

async function sendMessage(message, { userRow = null } = {}) {
  if (!message || isBusy || !activeSessionId) return;

  showConversation();
  welcomeSuggestions.hidden = true;
  conversationSuggestions.hidden = true;
  offlineBanner.hidden = true;

  const visibleUserRow = userRow ?? appendMessage("user", message);
  const thinkingRow = appendTypingIndicator();
  input.value = "";
  resizeInput();
  setBusy(true);

  try {
    const data = await request("/api/chat", {
      method: "POST",
      body: JSON.stringify({ userId, sessionId: activeSessionId, message })
    });
    thinkingRow.remove();
    visibleUserRow.dataset.interactionId = data.interactionId;
    appendMessage("bot", data.result, data.interactionId);
    showFollowUpSuggestions();
  } catch (error) {
    thinkingRow.remove();
    const errorRow = appendErrorMessage(error.message, () => {
      errorRow.remove();
      sendMessage(message, { userRow: visibleUserRow });
    });
    if (error.offline) offlineBanner.hidden = false;
  } finally {
    setBusy(false);
    input.focus();
    scrollToBottom();
  }
}

async function initialize() {
  try {
    userId = getUserId();
    const data = await request(`/api/sessions?userId=${encodeURIComponent(userId)}`);

    if (data.sessions.length > 0) {
      const latestSession = data.sessions[0];
      const loaded = await request(
        `/api/sessions/${encodeURIComponent(latestSession.sessionId)}?userId=${encodeURIComponent(userId)}`
      );
      showSession(loaded.session);
    } else {
      await createSession();
    }
  } catch (error) {
    showError(error);
  } finally {
    setBusy(false);
  }
}

function getUserId() {
  const storageKey = "travelbuddy-user-id";
  let id = localStorage.getItem(storageKey);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(storageKey, id);
  }
  return id;
}

async function createSession() {
  const data = await request("/api/sessions", {
    method: "POST",
    body: JSON.stringify({ userId })
  });
  showSession(data.session);
}

function showSession(session) {
  activeSessionId = session.sessionId;
  chatBox.replaceChildren();

  const messages = session.messages ?? [];
  if (messages.length === 0) {
    showWelcome();
    return;
  }

  showConversation();
  conversationSuggestions.hidden = true;
  for (const message of messages) {
    const sender = message.role === "user" ? "user" : "bot";
    const row = appendMessage(sender, message.text, message.interactionId);
    if (sender === "bot") {
      addCopyAction(row, message.text);
      showFollowUpSuggestions();
    }
  }
  scrollToBottom();
}

function showWelcome() {
  app.classList.add("is-welcome");
  welcomeScreen.hidden = false;
  conversationScreen.hidden = true;
  welcomeSuggestions.classList.remove("is-collapsed");
  welcomeSuggestionToggle.setAttribute("aria-expanded", "true");
  welcomeSuggestionToggle.setAttribute("aria-label", "Sembunyikan saran pertanyaan");
  welcomeSuggestions.hidden = false;
  conversationSuggestions.hidden = true;
  chatBox.replaceChildren();
}

function showConversation() {
  app.classList.remove("is-welcome");
  welcomeScreen.hidden = true;
  conversationScreen.hidden = false;
}

function showFollowUpSuggestions() {
  conversationSuggestions.replaceChildren();
  for (const prompt of FOLLOW_UP_PROMPTS) {
    const button = document.createElement("button");
    button.className = "suggestion-chip";
    button.type = "button";
    button.dataset.prompt = prompt;
    button.textContent = prompt;
    conversationSuggestions.appendChild(button);
  }
  conversationSuggestions.hidden = false;
}

function appendMessage(sender, text, interactionId) {
  const row = document.createElement("article");
  row.className = `message-row ${sender}`;
  if (interactionId) row.dataset.interactionId = interactionId;

  if (sender === "bot") {
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.setAttribute("aria-hidden", "true");
    const image = document.createElement("img");
    image.src = MASCOT_IMAGE;
    image.alt = "";
    avatar.appendChild(image);
    row.appendChild(avatar);
  }

  const stack = document.createElement("div");
  stack.className = "message-stack";
  const label = document.createElement("span");
  label.className = "message-label";
  label.textContent = sender === "user" ? "Kamu" : "TravelBuddy";
  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = text;
  stack.append(label, content);
  if (sender === "bot") addCopyAction(row, text, stack);
  row.appendChild(stack);
  chatBox.appendChild(row);
  scrollToBottom();
  return row;
}

function appendTypingIndicator() {
  const row = document.createElement("article");
  row.className = "message-row bot loading";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  const image = document.createElement("img");
  image.src = MASCOT_IMAGE;
  image.alt = "";
  avatar.appendChild(image);

  const stack = document.createElement("div");
  stack.className = "message-stack";
  const label = document.createElement("span");
  label.className = "message-label";
  label.textContent = "TravelBuddy sedang mengetik";
  const indicator = document.createElement("div");
  indicator.className = "message-content typing-indicator";
  indicator.setAttribute("role", "status");
  indicator.setAttribute("aria-label", "TravelBuddy sedang menyiapkan jawaban");
  for (let i = 0; i < 3; i++) indicator.appendChild(document.createElement("span"));
  stack.append(label, indicator);
  row.append(avatar, stack);
  chatBox.appendChild(row);
  scrollToBottom();
  return row;
}

function appendErrorMessage(message, retry) {
  const row = document.createElement("article");
  row.className = "message-row error";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  const image = document.createElement("img");
  image.src = MASCOT_IMAGE;
  image.alt = "";
  avatar.appendChild(image);

  const stack = document.createElement("div");
  stack.className = "message-stack";
  const label = document.createElement("span");
  label.className = "message-label";
  label.textContent = "Pesan belum terkirim";
  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = message;
  const actions = document.createElement("div");
  actions.className = "message-actions";
  const retryButton = document.createElement("button");
  retryButton.type = "button";
  retryButton.className = "message-action";
  retryButton.textContent = "Coba lagi";
  retryButton.addEventListener("click", retry);
  actions.appendChild(retryButton);
  stack.append(label, content, actions);
  row.append(avatar, stack);
  chatBox.appendChild(row);
  scrollToBottom();
  return row;
}

function addCopyAction(row, text, existingStack) {
  const stack = existingStack ?? row.querySelector(".message-stack");
  if (!stack || stack.querySelector(".copy-button")) return;

  const actions = document.createElement("div");
  actions.className = "message-actions";
  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "message-action copy-button";
  copyButton.setAttribute("aria-label", "Salin jawaban");
  copyButton.title = "Salin jawaban";
  copyButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg><span>Salin</span>';
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      copyButton.querySelector("span").textContent = "Tersalin";
    } catch {
      copyButton.title = "Tidak dapat menyalin. Periksa izin clipboard browser.";
      copyButton.querySelector("span").textContent = "Gagal";
    }
  });
  actions.appendChild(copyButton);
  stack.appendChild(actions);
}

function showError(error) {
  offlineBanner.textContent = error.message;
  offlineBanner.hidden = false;
}

async function request(url, options = {}) {
  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers
      }
    });
  } catch {
    const error = new Error("Tidak dapat terhubung ke server. Periksa koneksi lalu coba lagi.");
    error.offline = true;
    throw error;
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Server mengirim respons yang tidak valid. Periksa log server lalu coba lagi.");
  }

  if (!response.ok) {
    throw new Error(data.message || "Permintaan gagal. Silakan coba lagi.");
  }
  return data;
}

function setBusy(busy) {
  isBusy = busy;
  input.disabled = busy || !activeSessionId;
  sendButton.disabled = busy || !activeSessionId;
  newChatButton.disabled = busy;
  for (const button of document.querySelectorAll(".suggestion-chip")) {
    button.disabled = busy || !activeSessionId;
  }
}

function resizeInput() {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 150)}px`;
}

function updateScrollButton() {
  const distanceFromBottom = chatBody.scrollHeight - chatBody.clientHeight - chatBody.scrollTop;
  scrollBottomButton.hidden = distanceFromBottom < 120;
}

function scrollToBottom() {
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  scrollBottomButton.hidden = true;
}

initialize();
