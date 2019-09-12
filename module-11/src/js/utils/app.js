import MicroModal from "micromodal";
import { Notyf } from "notyf";
import Notepad from "./notepad-model";
import initialNotes from "../../assets/notes.json";
import { NOTE_ACTIONS, NOTIFICATION_MESSAGES } from "./constants";
import { ref } from "./refs";
import { renderNoteList, createElement } from "./view";
import "notyf/notyf.min.css";

const notepad = new Notepad(initialNotes);
const notyf = new Notyf();

renderNoteList(ref.ul, notepad.notes);

const addListItem = event => {
  event.preventDefault();
  const [input, text] = event.target.elements;
  if (input.value === "" || text.value === "") {
    notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
    ref.form.reset();
    return;
  }
  const newItem = notepad.addItem(input.value, text.value);
  const newNote = createElement(newItem);
  ref.ul.insertAdjacentHTML("beforeend", newNote);
  ref.form.reset();
  MicroModal.close("note-editor-modal");
  notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
};

const deleteListItem = el => {
  const liDelete = el.closest("li");
  const idLi = liDelete.dataset.id;
  notepad.deleteNote(idLi);
  liDelete.remove();
  notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
};

const removeListItem = event => {
  if (event.target.nodeName !== "I") return;
  const parentI = event.target.parentNode.dataset.action;
  if (parentI === NOTE_ACTIONS.DELETE) {
    deleteListItem(event.target);
  }
};

const filterNotes = event => {
  event.preventDefault();
  const filternote = notepad.filterNotesByQuery(event.target.value);
  renderNoteList(ref.ul, filternote);
};

const modalOpen = () => {
  MicroModal.show("note-editor-modal");
};

ref.form.addEventListener("submit", addListItem);
ref.ul.addEventListener("click", removeListItem);
ref.input.addEventListener("input", filterNotes);
ref.btmEditor.addEventListener("click", modalOpen);
