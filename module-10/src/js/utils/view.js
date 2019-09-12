import { ICON_TYPES, NOTE_ACTIONS } from "./constants";

const createElement = (tag, className) => {
  const createElement = document.createElement(tag);
  createElement.classList.add(className);
  return createElement;
};

const createNoteContent = (title, body) => {
  const noteContent = createElement("div", "note__content");
  const noteTitle = createElement("h2", "note__title");
  noteTitle.textContent = title;
  const noteBody = createElement("p", "note__body");
  noteBody.textContent = body;
  noteContent.append(noteTitle, noteBody);
  return noteContent;
};

const createActionButton = (data, icon) => {
  const action = createElement("button", "action");
  action.dataset.action = data;
  const actionIcon = createElement("i", "material-icons");
  actionIcon.classList.add("action__icon");
  actionIcon.textContent = icon;
  action.appendChild(actionIcon);
  return action;
};

const createSection = (buttonOnePr, iconOne, buttonTwoPr, iconTwo) => {
  const noteSection = createElement("section", "note__section");
  noteSection.append(
    createActionButton(buttonOnePr, iconOne),
    createActionButton(buttonTwoPr, iconTwo)
  );
  return noteSection;
};

const createNoteFooter = priority => {
  const noteFooter = createElement("footer", "note__footer");
  const notePriority = createElement("span", "note__priority");
  notePriority.textContent = `Priority: ${priority}`;
  const sectionOne = createSection(
    NOTE_ACTIONS.DECREASE_PRIORITY,
    ICON_TYPES.ARROW_DOWN,
    NOTE_ACTIONS.INCREASE_PRIORITY,
    ICON_TYPES.ARROW_UP
  );
  sectionOne.appendChild(notePriority);
  noteFooter.append(
    sectionOne,
    createSection(
      NOTE_ACTIONS.EDIT,
      ICON_TYPES.EDIT,
      NOTE_ACTIONS.DELETE,
      ICON_TYPES.DELETE
    )
  );
  return noteFooter;
};

export const createListItem = note => {
  const noteListItem = createElement("li", "note-list__item");
  noteListItem.dataset.id = note.id;
  const noteDiv = createElement("div", "note");
  noteDiv.append(
    createNoteContent(note.title, note.body),
    createNoteFooter(note.priority)
  );
  noteListItem.appendChild(noteDiv);
  return noteListItem;
};

export const renderNoteList = (listRef, notes) => {
  const noteList = notes.map(note => createListItem(note));
  listRef.innerHTML = "";
  listRef.append(...noteList);
};
