import MicroModal from "micromodal";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Notepad from "./notepad-model";
import { NOTE_ACTIONS, NOTIFICATION_MESSAGES } from "./constants";
import { renderNoteList, createElement } from "./view";
import { ref } from "./refs";
import Storage from "./localStorage";
import * as api from "../services/api";

const notepad = new Notepad();
const notyf = new Notyf();

api.getNotes().then(notes => renderNoteList(ref.ul, notes));

const addListItem = event => {
  event.preventDefault();
  const [input, text] = event.target.elements;
  if (input.value.trim() === "" || text.value.trim() === "") {
    notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
    return;
  }
  notepad
    .addItem(input.value, text.value)
    .then(newItem => createElement(newItem))
    .then(newNote => {
      ref.ul.insertAdjacentHTML("beforeend", newNote);
      Storage.remove("modalValue");
      ref.form.reset();
      MicroModal.close("note-editor-modal");
      notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
    })
    .catch(error => {
      console.log(error);
    });
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
  notepad
    .filterNotesByQuery(event.target.value)
    .then(filternotes => {
      renderNoteList(ref.ul, filternotes);
    })
    .catch(error => {
      console.log(error);
    });
};

const modalOpen = () => {
  MicroModal.show("note-editor-modal");

  const [input, text] = ref.form.elements;
  const modalValueLocal = localStorage.getItem("modalValue");
  const modalParse = JSON.parse(modalValueLocal);
  if (modalParse) {
    input.value = modalParse.inputValue;
    text.value = modalParse.textValue;
  }
};

const InputToLocalStorage = () => {
  const [input, text] = ref.form.elements;
  const modalValue = {
    inputValue: input.value,
    textValue: text.value
  };
  localStorage.setItem("modalValue", JSON.stringify(modalValue));
};

ref.form.addEventListener("submit", addListItem);
ref.ul.addEventListener("click", removeListItem);
ref.input.addEventListener("input", filterNotes);
ref.btmEditor.addEventListener("click", modalOpen);
ref.form.addEventListener("input", InputToLocalStorage);
