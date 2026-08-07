import {
  createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


/* =====================================
   SUPABASE
===================================== */

const SUPABASE_URL =
  "https://uyofqzrgyubdsgheuhbl.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_TOj9Iqr3gRFktXxvzYA7kQ_g9-edYzp";


const supabase =
  createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );



/* =====================================
   LOCAL FRIEND IDENTITY
===================================== */

const FRIEND_STORAGE_KEY =
  "friends_calendar_identity_v1";



/* =====================================
   TEMPLATE DEFINITIONS
===================================== */

const templates = {

  /* HANG OUT */

  hangout: {
    title: "Hangout",
    duration: 180
  },


  "eat-out": {
    title: "Eat out",
    duration: 120
  },


  movie: {
    title: "Movie",
    duration: 180
  },


  "game-night": {
    title: "Game night",
    duration: 180
  },


  "friends-game-night": {
    title: "Game night with friends",
    duration: 240
  },


  /* CHILL */

  walk: {
    title: "Walk",
    duration: 90
  },


  "cozy-hangout": {
    title: "Cozy hangout",
    duration: 120
  },


  "creative-activity": {
    title: "Creative activity",
    duration: 120
  },


  "quiet-hangout": {
    title: "Quiet hangout",
    duration: 90
  },


  /* ACTIVITIES */

  karaoke: {
    title: "Karaoke",
    duration: 120
  },


  "ice-skating": {
    title: "Ice skating",
    duration: 120
  },


  bouldering: {
    title: "Bouldering",
    duration: 120
  },


  gym: {
    title: "Gym",
    duration: 90
  },


  "run-jog": {
    title: "Run / jog",
    duration: 60
  },


  "try-something-new": {
    title: "Try something new",
    duration: 180
  },


  /* OTHER */

  custom: {
    title: "",
    duration: 60
  }

};



/* =====================================
   APP STATE
===================================== */

const state = {

  currentDate:
    new Date(),

  selectedDate:
    null,

  editingId:
    null,

  friend:
    null,

  items:
    [],

  refreshTimer:
    null

};



/* =====================================
   LOGIN ELEMENTS
===================================== */

const loginView =
  document.querySelector(
    "#loginView"
  );


const appView =
  document.querySelector(
    "#appView"
  );


const friendLoginForm =
  document.querySelector(
    "#friendLoginForm"
  );


const friendNameInput =
  document.querySelector(
    "#friendNameInput"
  );


const loginButton =
  document.querySelector(
    "#loginButton"
  );


const loginMessage =
  document.querySelector(
    "#loginMessage"
  );


const currentFriendName =
  document.querySelector(
    "#currentFriendName"
  );


const logoutButton =
  document.querySelector(
    "#logoutButton"
  );


const syncStatus =
  document.querySelector(
    "#syncStatus"
  );



/* =====================================
   MONTH ELEMENTS
===================================== */

const monthLabel =
  document.querySelector(
    "#monthLabel"
  );


const calendarDays =
  document.querySelector(
    "#calendarDays"
  );


const previousMonthButton =
  document.querySelector(
    "#previousMonth"
  );


const nextMonthButton =
  document.querySelector(
    "#nextMonth"
  );


const todayButton =
  document.querySelector(
    "#todayButton"
  );



/* =====================================
   DAY ELEMENTS
===================================== */

const dayModal =
  document.querySelector(
    "#dayModal"
  );


const dayTitle =
  document.querySelector(
    "#dayTitle"
  );


const timeline =
  document.querySelector(
    "#timeline"
  );


const addPlanButton =
  document.querySelector(
    "#addPlanButton"
  );


const closeDayModalButton =
  document.querySelector(
    "#closeDayModal"
  );



/* =====================================
   INFO MODAL
===================================== */

const infoModal =
  document.querySelector(
    "#infoModal"
  );


const infoTitle =
  document.querySelector(
    "#infoTitle"
  );


const infoDate =
  document.querySelector(
    "#infoDate"
  );


const infoTime =
  document.querySelector(
    "#infoTime"
  );


const privateMessage =
  document.querySelector(
    "#privateMessage"
  );


const closeInfoModalButton =
  document.querySelector(
    "#closeInfoModal"
  );



/* =====================================
   EDITOR ELEMENTS
===================================== */

const eventModal =
  document.querySelector(
    "#eventModal"
  );


const eventForm =
  document.querySelector(
    "#eventForm"
  );


const editorLabel =
  document.querySelector(
    "#editorLabel"
  );


const editorHeading =
  document.querySelector(
    "#editorHeading"
  );


const templateSelect =
  document.querySelector(
    "#templateSelect"
  );


const customTitleField =
  document.querySelector(
    "#customTitleField"
  );


const customEventTitle =
  document.querySelector(
    "#customEventTitle"
  );


const eventDateInput =
  document.querySelector(
    "#eventDate"
  );


const startTimeSelect =
  document.querySelector(
    "#startTime"
  );


const endTimeSelect =
  document.querySelector(
    "#endTime"
  );


const notesInput =
  document.querySelector(
    "#eventNotes"
  );


const formMessage =
  document.querySelector(
    "#formMessage"
  );


const cancelEditorButton =
  document.querySelector(
    "#cancelEditor"
  );


const closeEventModalButton =
  document.querySelector(
    "#closeEventModal"
  );


const saveEventButton =
  document.querySelector(
    "#saveEventButton"
  );


const deleteEventButton =
  document.querySelector(
    "#deleteEvent"
  );



/* =====================================
   START
===================================== */

buildTimeOptions();

attachEventListeners();

boot();



/* =====================================
   BOOT
===================================== */

async function boot() {

  const savedFriend =
    loadSavedFriend();


  if (
    savedFriend?.displayName
  ) {

    const validFriend =
      await findFriendByName(
        savedFriend.displayName
      );


    if (
      validFriend
    ) {

      await enterCalendar(
        validFriend
      );


      return;

    }


    clearSavedFriend();

  }


  showLogin();

}



/* =====================================
   EVENT LISTENERS
===================================== */

function attachEventListeners() {

  friendLoginForm
    .addEventListener(
      "submit",
      loginFriend
    );


  logoutButton
    .addEventListener(
      "click",
      logoutFriend
    );


  previousMonthButton
    .addEventListener(
      "click",
      () => {

        state.currentDate =
          new Date(

            state.currentDate
              .getFullYear(),

            state.currentDate
              .getMonth() - 1,

            1

          );


        renderCalendar();

      }
    );


  nextMonthButton
    .addEventListener(
      "click",
      () => {

        state.currentDate =
          new Date(

            state.currentDate
              .getFullYear(),

            state.currentDate
              .getMonth() + 1,

            1

          );


        renderCalendar();

      }
    );


  todayButton
    .addEventListener(
      "click",
      () => {

        state.currentDate =
          new Date();


        renderCalendar();

      }
    );


  closeDayModalButton
    .addEventListener(
      "click",
      closeDayView
    );


  addPlanButton
    .addEventListener(
      "click",
      () => {

        openEditor({
          start:
            "18:00",

          end:
            "19:00"
        });

      }
    );


  closeInfoModalButton
    .addEventListener(
      "click",
      closeInfoModal
    );


  closeEventModalButton
    .addEventListener(
      "click",
      closeEditor
    );


  cancelEditorButton
    .addEventListener(
      "click",
      closeEditor
    );


  deleteEventButton
    .addEventListener(
      "click",
      deleteCurrentEvent
    );


  templateSelect
    .addEventListener(
      "change",
      () => {

        updateCustomTitleField();

        applyTemplateDuration();

      }
    );


  startTimeSelect
    .addEventListener(
      "change",
      () => {

        if (
          templateSelect.value
        ) {

          applyTemplateDuration();

        }

      }
    );


  eventForm
    .addEventListener(
      "submit",
      saveEvent
    );


  dayModal
    .addEventListener(
      "click",
      event => {

        if (
          event.target ===
          dayModal
        ) {

          closeDayView();

        }

      }
    );


  infoModal
    .addEventListener(
      "click",
      event => {

        if (
          event.target ===
          infoModal
        ) {

          closeInfoModal();

        }

      }
    );


  eventModal
    .addEventListener(
      "click",
      event => {

        if (
          event.target ===
          eventModal
        ) {

          closeEditor();

        }

      }
    );


  document
    .addEventListener(
      "keydown",
      event => {

        if (
          event.key !==
          "Escape"
        ) {

          return;

        }


        if (
          !eventModal
            .classList
            .contains(
              "hidden"
            )
        ) {

          closeEditor();

          return;

        }


        if (
          !infoModal
            .classList
            .contains(
              "hidden"
            )
        ) {

          closeInfoModal();

          return;

        }


        if (
          !dayModal
            .classList
            .contains(
              "hidden"
            )
        ) {

          closeDayView();

        }

      }
    );


  window.addEventListener(
    "focus",
    async () => {

      if (
        state.friend
      ) {

        await refreshCalendar();

      }

    }
  );

}



/* =====================================
   FRIEND LOGIN
===================================== */

async function loginFriend(
  event
) {

  event.preventDefault();


  loginMessage.textContent =
    "";


  loginButton.disabled =
    true;


  loginButton.textContent =
    "Checking...";


  const name =
    friendNameInput
      .value
      .trim();


  const friend =
    await findFriendByName(
      name
    );


  if (
    !friend
  ) {

    loginMessage.textContent =
      "That name is not on the calendar list.";


    loginButton.disabled =
      false;


    loginButton.textContent =
      "Continue";


    return;

  }


  saveFriend(
    friend
  );


  await enterCalendar(
    friend
  );


  loginButton.disabled =
    false;


  loginButton.textContent =
    "Continue";

}



/* =====================================
   FIND FRIEND
===================================== */

async function findFriendByName(
  name
) {

  if (
    !name
  ) {

    return null;

  }


  const {
    data,
    error
  } =
    await supabase
      .rpc(
        "friend_login",
        {
          p_name:
            name
        }
      );


  if (
    error
  ) {

    console.error(
      "Friend login error:",
      error
    );


    return null;

  }


  const row =
    data?.[0];


  if (
    !row
  ) {

    return null;

  }


  return {

    id:
      row.friend_id,

    displayName:
      row.display_name

  };

}



/* =====================================
   ENTER CALENDAR
===================================== */

async function enterCalendar(
  friend
) {

  state.friend =
    friend;


  currentFriendName.textContent =
    friend.displayName;


  loginView.classList.add(
    "hidden"
  );


  appView.classList.remove(
    "hidden"
  );


  await refreshCalendar();


  startAutoRefresh();

}



/* =====================================
   LOG OUT / SWITCH USER
===================================== */

function logoutFriend() {

  stopAutoRefresh();


  state.friend =
    null;


  state.items =
    [];


  clearSavedFriend();


  closeEditor();

  closeInfoModal();

  closeDayView();


  showLogin();

}



/* =====================================
   SHOW LOGIN
===================================== */

function showLogin() {

  appView.classList.add(
    "hidden"
  );


  loginView.classList.remove(
    "hidden"
  );


  friendNameInput.value =
    "";


  loginMessage.textContent =
    "";

}



/* =====================================
   SAVE FRIEND LOCALLY
===================================== */

function saveFriend(
  friend
) {

  localStorage.setItem(

    FRIEND_STORAGE_KEY,

    JSON.stringify(
      friend
    )

  );

}



/* =====================================
   LOAD FRIEND LOCALLY
===================================== */

function loadSavedFriend() {

  try {

    const raw =
      localStorage.getItem(
        FRIEND_STORAGE_KEY
      );


    if (
      !raw
    ) {

      return null;

    }


    return JSON.parse(
      raw
    );

  } catch {

    return null;

  }

}



/* =====================================
   CLEAR FRIEND
===================================== */

function clearSavedFriend() {

  localStorage.removeItem(
    FRIEND_STORAGE_KEY
  );

}



/* =====================================
   LOAD SAFE CALENDAR
===================================== */

async function refreshCalendar() {

  if (
    !state.friend
  ) {

    return;

  }


  setSyncStatus(
    "syncing...",
    true
  );


  const {
    data,
    error
  } =
    await supabase
      .rpc(
        "friend_calendar",
        {
          p_friend_id:
            state.friend.id
        }
      );


  if (
    error
  ) {

    console.error(
      "Calendar load error:",
      error
    );


    setSyncStatus(
      "sync error",
      true
    );


    return;

  }


  state.items =
    (data || [])
      .map(
        mapCalendarItem
      );


  renderCalendar();


  if (
    !dayModal
      .classList
      .contains(
        "hidden"
      )
  ) {

    renderTimeline();

  }


  setSyncStatus(
    "● synced",
    false
  );

}



/* =====================================
   DATABASE ITEM → APP ITEM
===================================== */

function mapCalendarItem(
  item
) {

  return {

    id:
      item.item_id,

    source:
      item.source,

    type:
      item.item_type,

    title:
      item.title,

    template:
      item.template,

    date:
      item.event_date,

    start:
      normaliseDatabaseTime(
        item.start_time
      ),

    end:
      normaliseDatabaseTime(
        item.end_time
      ),

    notes:
      item.notes || "",

    createdByName:
      item.created_by_name,

    canEdit:
      Boolean(
        item.can_edit
      )

  };

}



/* =====================================
   AUTO REFRESH
===================================== */

function startAutoRefresh() {

  stopAutoRefresh();


  state.refreshTimer =
    window.setInterval(
      () => {

        refreshCalendar();

      },
      10000
    );

}



/* =====================================
   STOP REFRESH
===================================== */

function stopAutoRefresh() {

  if (
    state.refreshTimer
  ) {

    clearInterval(
      state.refreshTimer
    );


    state.refreshTimer =
      null;

  }

}



/* =====================================
   MONTH CALENDAR
===================================== */

function renderCalendar() {

  const year =
    state.currentDate
      .getFullYear();


  const month =
    state.currentDate
      .getMonth();


  monthLabel.textContent =
    new Intl.DateTimeFormat(
      "en-AU",
      {
        month:
          "long",

        year:
          "numeric"
      }
    )
      .format(
        new Date(
          year,
          month,
          1
        )
      );


  calendarDays.innerHTML =
    "";


  const firstWeekday =
    new Date(
      year,
      month,
      1
    )
      .getDay();


  const mondayFirstOffset =
    (
      firstWeekday +
      6
    ) % 7;


  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    )
      .getDate();


  const totalCells =
    Math.max(

      35,

      Math.ceil(
        (
          mondayFirstOffset +
          daysInMonth
        ) / 7
      ) * 7

    );


  const todayKey =
    toDateKey(
      new Date()
    );


  for (
    let index = 0;
    index < totalCells;
    index += 1
  ) {

    const dayNumber =
      index -
      mondayFirstOffset +
      1;


    if (
      dayNumber < 1 ||
      dayNumber > daysInMonth
    ) {

      const blank =
        document.createElement(
          "div"
        );


      blank.className =
        "day-cell blank-day";


      calendarDays.append(
        blank
      );


      continue;

    }


    const dateKey =
      makeDateKey(
        year,
        month,
        dayNumber
      );


    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";


    button.className =
      "day-cell";


    if (
      dateKey ===
      todayKey
    ) {

      button.classList.add(
        "today"
      );

    }


    const number =
      document.createElement(
        "span"
      );


    number.className =
      "day-number";


    number.textContent =
      String(
        dayNumber
      );


    button.append(
      number
    );


    const summary =
      document.createElement(
        "span"
      );


    summary.className =
      "day-summary";


    const items =
      getItemsForDate(
        dateKey
      );


    const visible =
      items.slice(
        0,
        3
      );


    for (
      const item
      of visible
    ) {

      const entry =
        document.createElement(
          "span"
        );


      entry.className =
        `summary-entry ${getVisualClass(item)}`;


      entry.textContent =
        `${item.start} ${item.title}`;


      summary.append(
        entry
      );

    }


    const remaining =
      items.length -
      visible.length;


    if (
      remaining > 0
    ) {

      const more =
        document.createElement(
          "span"
        );


      more.className =
        "more-entry";


      more.textContent =
        `+${remaining} more`;


      summary.append(
        more
      );

    }


    button.append(
      summary
    );


    button.addEventListener(
      "click",
      () => {

        openDayView(
          dateKey
        );

      }
    );


    calendarDays.append(
      button
    );

  }

}



/* =====================================
   DAY VIEW
===================================== */

function openDayView(
  dateKey
) {

  state.selectedDate =
    dateKey;


  dayTitle.textContent =
    formatDateLong(
      dateKey
    );


  renderTimeline();


  dayModal.classList.remove(
    "hidden"
  );


  document.body.classList.add(
    "modal-open"
  );

}



/* =====================================
   CLOSE DAY
===================================== */

function closeDayView() {

  dayModal.classList.add(
    "hidden"
  );


  updateBodyModalState();

}



/* =====================================
   TIMELINE
===================================== */

function renderTimeline() {

  timeline.innerHTML =
    "";


  /* 48 x 30-minute slots */

  for (
    let slotIndex = 0;
    slotIndex < 48;
    slotIndex += 1
  ) {

    const label =
      document.createElement(
        "div"
      );


    label.className =
      "time-label";


    label.style.gridRow =
      String(
        slotIndex + 1
      );


    label.style.gridColumn =
      "1";


    /*
      xx:00 is labelled.
      xx:30 is only a dashed line.
    */

    if (
      slotIndex % 2 === 0
    ) {

      label.textContent =
        indexToTime(
          slotIndex
        );

    }


    timeline.append(
      label
    );


    const slot =
      document.createElement(
        "button"
      );


    slot.type =
      "button";


    slot.className =
      slotIndex % 2 === 0
        ? "time-slot whole-hour"
        : "time-slot half-hour";


    slot.style.gridRow =
      String(
        slotIndex + 1
      );


    slot.style.gridColumn =
      "2";


    const slotTime =
      indexToTime(
        slotIndex
      );


    slot.addEventListener(
      "click",
      () => {

        const startMinutes =
          timeToMinutes(
            slotTime
          );


        const endMinutes =
          Math.min(
            startMinutes + 60,
            1440
          );


        openEditor({

          start:
            slotTime,

          end:
            minutesToTime(
              endMinutes
            )

        });

      }
    );


    timeline.append(
      slot
    );

  }



  /* EVENT BLOCKS */

  const items =
    getItemsForDate(
      state.selectedDate
    );


  for (
    const item
    of items
  ) {

    const startIndex =
      timeToMinutes(
        item.start
      ) / 30;


    const endIndex =
      timeToMinutes(
        item.end
      ) / 30;


    if (
      !Number.isInteger(
        startIndex
      ) ||
      !Number.isInteger(
        endIndex
      ) ||
      endIndex <= startIndex
    ) {

      continue;

    }


    const block =
      document.createElement(
        "button"
      );


    block.type =
      "button";


    block.className =
      `event-block ${getVisualClass(item)}`;


    block.style.gridRow =
      `${startIndex + 1} / ${endIndex + 1}`;


    block.style.gridColumn =
      "2";


    const title =
      document.createElement(
        "strong"
      );


    title.textContent =
      item.title;


    const detail =
      document.createElement(
        "span"
      );


    detail.textContent =
      `${item.start}–${item.end}`;


    block.append(
      title,
      detail
    );


    block.addEventListener(
      "click",
      () => {

        if (
          item.source ===
            "friend" &&
          item.canEdit
        ) {

          openEditor({
            item
          });

        } else {

          openInfoModal(
            item
          );

        }

      }
    );


    timeline.append(
      block
    );

  }

}



/* =====================================
   VISUAL EVENT CLASS
===================================== */

function getVisualClass(
  item
) {

  if (
    item.type ===
      "schedule"
  ) {

    return item.title ===
      "Work"
      ? "work"
      : "busy";

  }


  if (
    item.source ===
      "private"
  ) {

    return "private";

  }


  return "friend";

}



/* =====================================
   INFO MODAL
===================================== */

function openInfoModal(
  item
) {

  infoTitle.textContent =
    item.title;


  infoDate.textContent =
    formatDateLong(
      item.date
    );


  infoTime.textContent =
    `${item.start}–${item.end}`;


  privateMessage.classList.toggle(
    "hidden",
    item.type === "schedule"
  );


  infoModal.classList.remove(
    "hidden"
  );


  document.body.classList.add(
    "modal-open"
  );

}



/* =====================================
   CLOSE INFO
===================================== */

function closeInfoModal() {

  infoModal.classList.add(
    "hidden"
  );


  updateBodyModalState();

}



/* =====================================
   OPEN EDITOR
===================================== */

function openEditor({

  start =
    "18:00",

  end =
    "19:00",

  item =
    null

} = {}) {


  eventForm.reset();


  formMessage.textContent =
    "";


  state.editingId =
    item?.id ||
    null;


  if (
    item
  ) {

    editorLabel.textContent =
      "edit your plan";


    editorHeading.textContent =
      item.title;


    saveEventButton.textContent =
      "Save changes";


    deleteEventButton.classList.remove(
      "hidden"
    );

  } else {

    editorLabel.textContent =
      "propose a plan";


    editorHeading.textContent =
      "Add an event";


    saveEventButton.textContent =
      "Add event";


    deleteEventButton.classList.add(
      "hidden"
    );

  }


  templateSelect.value =
    item?.template ||
    "";


  if (
    item?.template ===
      "custom"
  ) {

    customEventTitle.value =
      item.title;

  } else {

    customEventTitle.value =
      "";

  }


  updateCustomTitleField();


  eventDateInput.value =
    item?.date ||
    state.selectedDate ||
    toDateKey(
      new Date()
    );


  startTimeSelect.value =
    item?.start ||
    start;


  endTimeSelect.value =
    item?.end ||
    end;


  notesInput.value =
    item?.notes ||
    "";


  eventModal.classList.remove(
    "hidden"
  );


  document.body.classList.add(
    "modal-open"
  );

}



/* =====================================
   CLOSE EDITOR
===================================== */

function closeEditor() {

  eventModal.classList.add(
    "hidden"
  );


  state.editingId =
    null;


  formMessage.textContent =
    "";


  updateBodyModalState();

}



/* =====================================
   CUSTOM EVENT FIELD
===================================== */

function updateCustomTitleField() {

  const custom =
    templateSelect.value ===
    "custom";


  customTitleField.classList.toggle(
    "hidden",
    !custom
  );


  customEventTitle.required =
    custom;


  if (
    !custom
  ) {

    customEventTitle.value =
      "";

  }

}



/* =====================================
   TEMPLATE DURATION
===================================== */

function applyTemplateDuration() {

  const template =
    templates[
      templateSelect.value
    ];


  if (
    !template
  ) {

    return;

  }


  const start =
    timeToMinutes(
      startTimeSelect.value
    );


  const end =
    Math.min(
      start +
      template.duration,
      1440
    );


  endTimeSelect.value =
    minutesToTime(
      end
    );

}



/* =====================================
   SAVE FRIEND EVENT
===================================== */

async function saveEvent(
  event
) {

  event.preventDefault();


  formMessage.textContent =
    "";


  if (
    !state.friend
  ) {

    return;

  }


  const template =
    templateSelect.value;


  if (
    !templates[
      template
    ]
  ) {

    showFormError(
      "Please select a template."
    );


    return;

  }


  let title =
    templates[
      template
    ].title;


  if (
    template ===
      "custom"
  ) {

    title =
      customEventTitle
        .value
        .trim();


    if (
      !title
    ) {

      showFormError(
        "Please type an event name."
      );


      customEventTitle.focus();


      return;

    }

  }


  const date =
    eventDateInput.value;


  const start =
    startTimeSelect.value;


  const end =
    endTimeSelect.value;


  if (
    !date
  ) {

    showFormError(
      "Please select a date."
    );


    return;

  }


  const startMinutes =
    timeToMinutes(
      start
    );


  const endMinutes =
    timeToMinutes(
      end
    );


  if (
    endMinutes <=
    startMinutes
  ) {

    showFormError(
      "The end time must be later than the start time."
    );


    return;

  }



  /* =====================================
     CONFLICT CHECK
  ====================================== */

  const conflict =
    state.items.find(
      item => {

        if (
          item.id ===
            state.editingId ||
          item.date !==
            date
        ) {

          return false;

        }


        const existingStart =
          timeToMinutes(
            item.start
          );


        const existingEnd =
          timeToMinutes(
            item.end
          );


        return (
          startMinutes <
            existingEnd &&
          endMinutes >
            existingStart
        );

      }
    );


  if (
    conflict
  ) {

    showFormError(
      `That time overlaps with “${conflict.title}” (${conflict.start}–${conflict.end}).`
    );


    return;

  }



  saveEventButton.disabled =
    true;


  saveEventButton.textContent =
    "Saving...";


  let error;



  /* UPDATE */

  if (
    state.editingId
  ) {

    const result =
      await supabase
        .rpc(
          "update_friend_event",
          {

            p_friend_id:
              state.friend.id,

            p_event_id:
              state.editingId,

            p_template:
              template,

            p_title:
              title,

            p_event_date:
              date,

            p_start_time:
              start,

            p_end_time:
              end,

            p_notes:
              notesInput
                .value
                .trim()

          }
        );


    error =
      result.error;

  }


  /* CREATE */

  else {

    const result =
      await supabase
        .rpc(
          "create_friend_event",
          {

            p_friend_id:
              state.friend.id,

            p_template:
              template,

            p_title:
              title,

            p_event_date:
              date,

            p_start_time:
              start,

            p_end_time:
              end,

            p_notes:
              notesInput
                .value
                .trim()

          }
        );


    error =
      result.error;

  }


  saveEventButton.disabled =
    false;


  if (
    error
  ) {

    console.error(
      "Save error:",
      error
    );


    saveEventButton.textContent =
      state.editingId
        ? "Save changes"
        : "Add event";


    showFormError(
      "Could not save the event."
    );


    return;

  }


  state.selectedDate =
    date;


  const chosenDate =
    new Date(
      `${date}T00:00:00`
    );


  state.currentDate =
    new Date(

      chosenDate
        .getFullYear(),

      chosenDate
        .getMonth(),

      1

    );


  await refreshCalendar();


  dayTitle.textContent =
    formatDateLong(
      date
    );


  closeEditor();


  renderTimeline();


  renderCalendar();

}



/* =====================================
   DELETE OWN EVENT
===================================== */

async function deleteCurrentEvent() {

  if (
    !state.friend ||
    !state.editingId
  ) {

    return;

  }


  const item =
    state.items.find(
      calendarItem =>
        calendarItem.id ===
        state.editingId
    );


  if (
    !item ||
    !item.canEdit
  ) {

    return;

  }


  deleteEventButton.disabled =
    true;


  deleteEventButton.textContent =
    "Deleting...";


  const {
    error
  } =
    await supabase
      .rpc(
        "delete_friend_event",
        {

          p_friend_id:
            state.friend.id,

          p_event_id:
            state.editingId

        }
      );


  deleteEventButton.disabled =
    false;


  deleteEventButton.textContent =
    "Delete";


  if (
    error
  ) {

    console.error(
      "Delete error:",
      error
    );


    showFormError(
      "Could not delete the event."
    );


    return;

  }


  await refreshCalendar();


  closeEditor();


  renderTimeline();


  renderCalendar();

}



/* =====================================
   BUILD TIME OPTIONS
===================================== */

function buildTimeOptions() {

  startTimeSelect.innerHTML =
    "";


  endTimeSelect.innerHTML =
    "";


  /* 00:00 → 23:30 */

  for (
    let index = 0;
    index < 48;
    index += 1
  ) {

    const time =
      indexToTime(
        index
      );


    startTimeSelect.add(
      new Option(
        time,
        time
      )
    );

  }


  /* 00:30 → 24:00 */

  for (
    let index = 1;
    index <= 48;
    index += 1
  ) {

    const time =
      indexToTime(
        index
      );


    endTimeSelect.add(
      new Option(
        time,
        time
      )
    );

  }

}



/* =====================================
   ITEMS FOR DATE
===================================== */

function getItemsForDate(
  dateKey
) {

  return state.items
    .filter(
      item =>
        item.date ===
        dateKey
    )
    .sort(
      (
        first,
        second
      ) => {

        return (
          timeToMinutes(
            first.start
          )
          -
          timeToMinutes(
            second.start
          )
        );

      }
    );

}



/* =====================================
   DATE HELPERS
===================================== */

function makeDateKey(
  year,
  zeroBasedMonth,
  day
) {

  const month =
    String(
      zeroBasedMonth + 1
    )
      .padStart(
        2,
        "0"
      );


  const date =
    String(
      day
    )
      .padStart(
        2,
        "0"
      );


  return (
    `${year}-${month}-${date}`
  );

}


function toDateKey(
  date
) {

  return makeDateKey(

    date.getFullYear(),

    date.getMonth(),

    date.getDate()

  );

}


function formatDateLong(
  dateKey
) {

  const date =
    new Date(
      `${dateKey}T00:00:00`
    );


  return new Intl
    .DateTimeFormat(
      "en-AU",
      {

        weekday:
          "long",

        day:
          "numeric",

        month:
          "long",

        year:
          "numeric"

      }
    )
    .format(
      date
    );

}



/* =====================================
   TIME HELPERS
===================================== */

function indexToTime(
  index
) {

  return minutesToTime(
    index * 30
  );

}


function minutesToTime(
  totalMinutes
) {

  if (
    totalMinutes ===
    1440
  ) {

    return "24:00";

  }


  const hours =
    Math.floor(
      totalMinutes / 60
    );


  const minutes =
    totalMinutes %
    60;


  return (
    String(
      hours
    )
      .padStart(
        2,
        "0"
      )
    +
    ":"
    +
    String(
      minutes
    )
      .padStart(
        2,
        "0"
      )
  );

}


function timeToMinutes(
  time
) {

  if (
    time ===
    "24:00"
  ) {

    return 1440;

  }


  const [
    hours,
    minutes
  ] =
    normaliseDatabaseTime(
      time
    )
      .split(":")
      .map(Number);


  return (
    hours * 60 +
    minutes
  );

}


function normaliseDatabaseTime(
  time
) {

  if (
    !time
  ) {

    return "00:00";

  }


  return String(
    time
  )
    .slice(
      0,
      5
    );

}



/* =====================================
   ERROR
===================================== */

function showFormError(
  message
) {

  formMessage.textContent =
    message;

}



/* =====================================
   SYNC STATUS
===================================== */

function setSyncStatus(
  text,
  syncing
) {

  syncStatus.textContent =
    text;


  syncStatus.classList.toggle(
    "syncing",
    syncing
  );

}



/* =====================================
   BODY MODAL STATE
===================================== */

function updateBodyModalState() {

  const anythingOpen =
    !dayModal.classList.contains(
      "hidden"
    )
    ||
    !infoModal.classList.contains(
      "hidden"
    )
    ||
    !eventModal.classList.contains(
      "hidden"
    );


  document.body.classList.toggle(
    "modal-open",
    anythingOpen
  );

}