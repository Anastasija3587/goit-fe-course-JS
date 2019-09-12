import Notepad from "./notepad-model";
import initialNotes from "../../assets/notes.json";
import { NOTE_ACTIONS } from "./constants";
import { ref } from "./refs";
import { renderNoteList, createListItem } from "./view";

const notepad = new Notepad(initialNotes);

renderNoteList(ref.ul, notepad.notes);

const addListItem = event => {
  event.preventDefault();
  const [input, text] = event.target.elements;
  if (input.value === "" || text.value === "") {
    alert("Необходимо заполнить все поля!");
    ref.form.reset();
    return;
  }
  const newItem = notepad.addItem(input.value, text.value);
  const newNote = createListItem(newItem);
  ref.ul.append(newNote);
  ref.form.reset();
};

const deleteListItem = el => {
  const liDelete = el.closest("li");
  const idLi = liDelete.dataset.id;
  notepad.deleteNote(idLi);
  liDelete.remove();
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

ref.form.addEventListener("submit", addListItem);
ref.ul.addEventListener("click", removeListItem);
ref.input.addEventListener("input", filterNotes);
