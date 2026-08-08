import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://uyofqzrgyubdsgheuhbl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_TOj9Iqr3gRFktXxvzYA7kQ_g9-edYzp";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false }
});

const $ = (selector) => document.querySelector(selector);
const createView = $("#createView");
const pollView = $("#pollView");
const errorView = $("#errorView");
const createForm = $("#createForm");
const titleInput = $("#titleInput");
const startDateInput = $("#startDateInput");
const endDateInput = $("#endDateInput");
const dayStartInput = $("#dayStartInput");
const dayEndInput = $("#dayEndInput");
const slotMinutesInput = $("#slotMinutesInput");
const slotPreview = $("#slotPreview");
const createMessage = $("#createMessage");
const createButton = $("#createButton");
const pollTitle = $("#pollTitle");
const pollMeta = $("#pollMeta");
const copyLinkButton = $("#copyLinkButton");
const newPollButton = $("#newPollButton");
const resultsPanel = $("#resultsPanel");
const responseCountBadge = $("#responseCountBadge");
const bestTimes = $("#bestTimes");
const participantNameInput = $("#participantNameInput");
const slotGroups = $("#slotGroups");
const voteMessage = $("#voteMessage");
const selectedCount = $("#selectedCount");
const saveResponseButton = $("#saveResponseButton");
const toast = $("#toast");

const state = {
  pollToken: null,
  poll: null,
  selectedSlotIds: new Set(),
  participantToken: null
};

init();

function init() {
  seedDates();
  wireEvents();
  const token = new URLSearchParams(window.location.search).get("poll");
  if (token) loadPoll(token);
  else showView("create");
  updatePreview();
}

function wireEvents() {
  createForm.addEventListener("submit", createPoll);
  [startDateInput, endDateInput, dayStartInput, dayEndInput, slotMinutesInput]
    .forEach((el) => el.addEventListener("input", updatePreview));
  copyLinkButton.addEventListener("click", copyCurrentLink);
  newPollButton.addEventListener("click", () => {
    history.pushState({}, "", window.location.pathname);
    resetPollState();
    showView("create");
  });
  saveResponseButton.addEventListener("click", saveResponse);
  window.addEventListener("popstate", () => {
    const token = new URLSearchParams(window.location.search).get("poll");
    if (token) loadPoll(token);
    else showView("create");
  });
}

function seedDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);
  startDateInput.value = toDateInput(tomorrow);
  endDateInput.value = toDateInput(dayAfter);
}

function toDateInput(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function showView(name) {
  createView.classList.toggle("hidden", name !== "create");
  pollView.classList.toggle("hidden", name !== "poll");
  errorView.classList.toggle("hidden", name !== "error");
}

function updatePreview() {
  const result = buildSlotsFromForm();
  if (result.error) {
    slotPreview.textContent = result.error;
    return;
  }
  const dayCount = countInclusiveDays(startDateInput.value, endDateInput.value);
  slotPreview.textContent = `${result.slots.length} time blocks across ${dayCount} ${dayCount === 1 ? "day" : "days"}. Guests will see times in their own device timezone.`;
}

function buildSlotsFromForm() {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const startTime = dayStartInput.value;
  const endTime = dayEndInput.value;
  const minutes = Number(slotMinutesInput.value);

  if (!startDate || !endDate || !startTime || !endTime) return { error: "Choose the date and time range." };
  if (endDate < startDate) return { error: "Last date must be after the first date." };

  const dayCount = countInclusiveDays(startDate, endDate);
  if (dayCount < 1 || dayCount > 7) return { error: "Keep this MVP poll between 1 and 7 days." };

  const startMinute = timeToMinutes(startTime);
  const endMinute = timeToMinutes(endTime);
  if (endMinute <= startMinute) return { error: "The daily end time must be later than the start time." };
  if (!Number.isFinite(minutes) || minutes < 30) return { error: "Choose a valid time block length." };

  const slots = [];
  for (let offset = 0; offset < dayCount; offset += 1) {
    const date = parseLocalDate(startDate);
    date.setDate(date.getDate() + offset);
    for (let minute = startMinute; minute + minutes <= endMinute; minute += minutes) {
      const start = new Date(date);
      start.setHours(Math.floor(minute / 60), minute % 60, 0, 0);
      const end = new Date(start.getTime() + minutes * 60_000);
      slots.push({ starts_at: start.toISOString(), ends_at: end.toISOString() });
    }
  }

  if (slots.length < 2) return { error: "Create at least two time blocks." };
  if (slots.length > 60) return { error: `That creates ${slots.length} blocks. Reduce the date range or increase the block length (maximum 60).` };
  return { slots };
}

function parseLocalDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

function countInclusiveDays(start, end) {
  const a = parseLocalDate(start);
  const b = parseLocalDate(end);
  return Math.floor((b - a) / 86_400_000) + 1;
}

function timeToMinutes(value) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

async function createPoll(event) {
  event.preventDefault();
  createMessage.textContent = "";
  const built = buildSlotsFromForm();
  if (built.error) {
    createMessage.textContent = built.error;
    return;
  }

  createButton.disabled = true;
  createButton.textContent = "Creating…";

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Australia/Perth";
  const { data, error } = await supabase.rpc("create_availability_poll", {
    p_title: titleInput.value.trim(),
    p_timezone: timezone,
    p_slots: built.slots
  });

  createButton.disabled = false;
  createButton.innerHTML = "Create share link <span>↗</span>";

  if (error || !data) {
    console.error(error);
    createMessage.textContent = friendlyError(error, "Could not create the poll. Try again.");
    return;
  }

  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("poll", data);
  history.pushState({}, "", url);
  await loadPoll(data);
  showToast("Poll created — copy the link and send it to your friends.");
}

async function loadPoll(token) {
  resetPollState();
  state.pollToken = token;
  showView("poll");
  pollTitle.textContent = "Loading…";
  pollMeta.textContent = "";
  slotGroups.innerHTML = "";
  resultsPanel.classList.add("hidden");

  const { data, error } = await supabase.rpc("get_availability_poll", { p_token: token });
  if (error || !data) {
    console.error(error);
    showView("error");
    return;
  }

  state.poll = data;
  state.participantToken = localStorage.getItem(participantStorageKey(token));
  if (state.participantToken) await loadSavedResponse();
  renderPoll();
}

async function loadSavedResponse() {
  const { data, error } = await supabase.rpc("get_availability_response", {
    p_token: state.pollToken,
    p_participant_token: state.participantToken
  });

  if (error || !data) {
    localStorage.removeItem(participantStorageKey(state.pollToken));
    state.participantToken = null;
    return;
  }

  participantNameInput.value = data.name || "";
  state.selectedSlotIds = new Set((data.slot_ids || []).map(Number));
}

function renderPoll() {
  pollTitle.textContent = state.poll.title;
  const slotCount = state.poll.slots?.length || 0;
  pollMeta.textContent = `${slotCount} options · created in ${state.poll.timezone} · shown here in ${Intl.DateTimeFormat().resolvedOptions().timeZone || "your local timezone"}`;
  renderResults();
  renderSlotGroups();
  updateSelectedCount();
}

function renderResults() {
  const participantCount = Number(state.poll.participant_count || 0);
  responseCountBadge.textContent = `${participantCount} ${participantCount === 1 ? "response" : "responses"}`;

  if (participantCount === 0) {
    resultsPanel.classList.add("hidden");
    bestTimes.innerHTML = "";
    return;
  }

  const ranked = [...state.poll.slots]
    .sort((a, b) => Number(b.available_count) - Number(a.available_count) || new Date(a.starts_at) - new Date(b.starts_at))
    .slice(0, 3);

  bestTimes.innerHTML = ranked.map((slot, index) => {
    const names = slot.available_names || [];
    return `
      <article class="best-time rank-${index + 1}">
        <span class="rank">#${index + 1}</span>
        <strong>${escapeHtml(formatSlotDate(slot))}</strong>
        <p>${Number(slot.available_count)} available${names.length ? ` · ${escapeHtml(names.join(", "))}` : ""}</p>
      </article>`;
  }).join("");

  resultsPanel.classList.remove("hidden");
}

function renderSlotGroups() {
  const groups = new Map();
  for (const slot of state.poll.slots || []) {
    const key = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric" }).format(new Date(slot.starts_at));
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(slot);
  }

  const bestIds = new Set([...state.poll.slots]
    .sort((a, b) => Number(b.available_count) - Number(a.available_count) || new Date(a.starts_at) - new Date(b.starts_at))
    .slice(0, state.poll.participant_count > 0 ? 3 : 0)
    .map((slot) => Number(slot.id)));

  slotGroups.innerHTML = [...groups.entries()].map(([label, slots]) => `
    <section class="slot-group">
      <h3>${escapeHtml(label)}</h3>
      <div class="slot-list">
        ${slots.map((slot) => {
          const id = Number(slot.id);
          const selected = state.selectedSlotIds.has(id);
          const names = slot.available_names || [];
          return `<button class="slot-button ${selected ? "selected" : ""} ${bestIds.has(id) ? "best" : ""}" type="button" data-slot-id="${id}" aria-pressed="${selected}">
            <strong>${escapeHtml(formatTimeRange(slot))}</strong>
            <span>${Number(slot.available_count)} free${names.length ? ` · ${escapeHtml(names.join(", "))}` : ""}</span>
          </button>`;
        }).join("")}
      </div>
    </section>`).join("");

  slotGroups.querySelectorAll("[data-slot-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.slotId);
      if (state.selectedSlotIds.has(id)) state.selectedSlotIds.delete(id);
      else state.selectedSlotIds.add(id);
      button.classList.toggle("selected", state.selectedSlotIds.has(id));
      button.setAttribute("aria-pressed", String(state.selectedSlotIds.has(id)));
      updateSelectedCount();
    });
  });
}

function updateSelectedCount() {
  const count = state.selectedSlotIds.size;
  selectedCount.textContent = `${count} selected`;
}

async function saveResponse() {
  voteMessage.textContent = "";
  const name = participantNameInput.value.trim();
  if (!name) {
    voteMessage.textContent = "Add your name first.";
    participantNameInput.focus();
    return;
  }

  saveResponseButton.disabled = true;
  saveResponseButton.textContent = "Saving…";

  const { data, error } = await supabase.rpc("submit_availability_response", {
    p_token: state.pollToken,
    p_name: name,
    p_slot_ids: [...state.selectedSlotIds],
    p_participant_token: state.participantToken
  });

  saveResponseButton.disabled = false;
  saveResponseButton.textContent = state.participantToken ? "Update availability" : "Save availability";

  if (error || !data) {
    console.error(error);
    voteMessage.textContent = friendlyError(error, "Could not save your availability.");
    return;
  }

  state.participantToken = data;
  localStorage.setItem(participantStorageKey(state.pollToken), data);
  saveResponseButton.textContent = "Update availability";
  showToast("Availability saved.");
  await refreshPollAfterSave();
}

async function refreshPollAfterSave() {
  const { data, error } = await supabase.rpc("get_availability_poll", { p_token: state.pollToken });
  if (!error && data) {
    state.poll = data;
    renderPoll();
  }
}

async function copyCurrentLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Share link copied.");
  } catch {
    window.prompt("Copy this link:", window.location.href);
  }
}

function formatSlotDate(slot) {
  const date = new Date(slot.starts_at);
  const day = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(date);
  return `${day} · ${formatTimeRange(slot)}`;
}

function formatTimeRange(slot) {
  const formatter = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
  return `${formatter.format(new Date(slot.starts_at))}–${formatter.format(new Date(slot.ends_at))}`;
}

function participantStorageKey(token) {
  return `freewhen_participant_${token}`;
}

function resetPollState() {
  state.pollToken = null;
  state.poll = null;
  state.selectedSlotIds = new Set();
  state.participantToken = null;
  participantNameInput.value = "";
  voteMessage.textContent = "";
}

function friendlyError(error, fallback) {
  const message = error?.message || "";
  if (message.includes("already being used")) return message;
  if (message.includes("between 1 and 80") || message.includes("between 1 and 40") || message.includes("between 2 and 60")) return message;
  return fallback;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
