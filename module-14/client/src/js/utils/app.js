import MicroModal from "micromodal";
import {
  Notyf
} from "notyf";
import "notyf/notyf.min.css";
import Notepad from "./notepad-model";
import {
  NOTE_ACTIONS,
  NOTIFICATION_MESSAGES,
  PRIORITY_TYPES
} from "./constants";
import {
  renderNoteList,
  createElement
} from "./view";
import {
  ref
} from "./refs";
import Storage from "./localStorage";
import * as api from "../services/api";

const notepad = new Notepad();
const notyf = new Notyf();

api.getNotes().then(notes => renderNoteList(ref.ul, notes));

const updateValue = () => {
  const [input, text] = ref.form.elements;
  const updateValue = {
    title: input.value,
    body: text.value
  };
  return updateValue;
};

const modalOpenForUpdate = async event => {
  MicroModal.show("note-editor-modal");
  const liUpdate = event.closest("li");
  const idUpdate = liUpdate.dataset.id;
  if (ref.form.classList.contains("add")) {
    ref.form.classList.replace("add", "edit");
  } else {
    ref.form.classList.add("edit");
  }
  const [input, text] = ref.form.elements;
  const notes = await notepad.getNotes();
  const noteIdUpdate = await notes.find(note => note.id === Number(idUpdate));
  input.value = noteIdUpdate.title;
  text.value = noteIdUpdate.body;
};

const deleteListItem = event => {
  const liDelete = event.closest("li");
  const idLi = liDelete.dataset.id;
  notepad.deleteNote(idLi);
  liDelete.remove();
  notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
};

const increasePriority = async event => {
  const liPriority = event.closest("li");
  const idLi = liPriority.dataset.id;
  const priorityIncrease = await notepad.findNoteById(idLi);
  if (priorityIncrease.priority >= PRIORITY_TYPES.HIGH) return;
  const updatePriorityNote = await notepad.updateNotePriority(
    idLi,
    (priorityIncrease.priority += 1)
  );
  await api.updateNotes(idLi, updatePriorityNote);
  const renderNotes = await notepad.getNotes();
  renderNoteList(ref.ul, renderNotes);
};

const decreasePriority = async event => {
  const liPriority = event.closest("li");
  const idLi = liPriority.dataset.id;
  const priorityIncrease = await notepad.findNoteById(idLi);
  if (priorityIncrease.priority <= PRIORITY_TYPES.LOW) return;
  const updatePriorityNote = await notepad.updateNotePriority(
    idLi,
    (priorityIncrease.priority -= 1)
  );
  await api.updateNotes(idLi, updatePriorityNote);
  const renderNotes = await notepad.getNotes();
  renderNoteList(ref.ul, renderNotes);
};

const filterNotes = async event => {
  try {
    event.preventDefault();
    const filternotes = await notepad.filterNotesByQuery(event.target.value);
    renderNoteList(ref.ul, filternotes);
  } catch (error) {
    console.error(error);
  }
};

const modalOpen = () => {
  ref.form.classList.add("add");
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



//если выбрать этот вариант, то работает отлично, за исключением, не знаю как вытянуть id в addListItem строка 147,  
// чтоб динамично подставляло id


// const addListItem = async event => {
//   try {
//     if (event.target.classList.contains("add")) {
//       event.preventDefault();
//       const [input, text] = event.target.elements;
//       if (input.value.trim() === "" || text.value.trim() === "") {
//         notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
//         return;
//       }
//       const newItem = await notepad.addItem(input.value, text.value);
//       const newNote = createElement(newItem);
//       ref.ul.insertAdjacentHTML("beforeend", newNote);
//       Storage.remove("modalValue");
//       ref.form.reset();
//       MicroModal.close("note-editor-modal");
//       notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
//     }
//     if (event.target.classList.contains("edit")) {
//       event.preventDefault();
//       // const id = ???
//       const values = updateValue()
//       await notepad.updateNoteContent(2, values)
//       const renderNotes = await notepad.getNotes()
//       renderNoteList(ref.ul, renderNotes)
//       Storage.remove("modalValue");
//       ref.form.reset();
//       MicroModal.close("note-editor-modal");
//       notyf.success(NOTIFICATION_MESSAGES.NOTE_UPDATED_SUCCESS);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const actionListItem = event => {
//   if (event.target.nodeName !== "I") return;
//   const parentI = event.target.parentNode.dataset.action;
//   if (parentI === NOTE_ACTIONS.DELETE) {
//     deleteListItem(event.target);
//   }
//   if (parentI === NOTE_ACTIONS.EDIT) {
//     modalOpenForUpdate(event.target);
//   }
//   if (parentI === NOTE_ACTIONS.INCREASE_PRIORITY) {
//     increasePriority(event.target);
//   }
//   if (parentI === NOTE_ACTIONS.DECREASE_PRIORITY) {
//     decreasePriority(event.target);
//   }
// };



// если выбрать этот вариант, то когда один раз редактируешь - норм, 
// а последующие разы не обновляя страницы - что попало!

const addListItem = async event => {
  try {
    if (event.target.classList.contains("add")) {
      event.preventDefault();
      const [input, text] = event.target.elements;
      if (input.value.trim() === "" || text.value.trim() === "") {
        notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
        return;
      }
      const newItem = await notepad.addItem(input.value, text.value);
      const newNote = createElement(newItem);
      ref.ul.insertAdjacentHTML("beforeend", newNote);
      Storage.remove("modalValue");
      ref.form.reset();
      MicroModal.close("note-editor-modal");
      notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
    }

  } catch (error) {
    console.log(error);
  }
};

const actionListItem = event => {
  if (event.target.nodeName !== "I") return;
  const parentI = event.target.parentNode.dataset.action;
  if (parentI === NOTE_ACTIONS.DELETE) {
    deleteListItem(event.target);
  }
  if (parentI === NOTE_ACTIONS.EDIT) {
    modalOpenForUpdate(event.target);
    const liUpdate = event.target.closest("li");
    const idLi = liUpdate.dataset.id;
    const handleEdit = async (event) => {
      if (event.target.classList.contains("edit")) {
        event.preventDefault();
        const values = updateValue()
        await notepad.updateNoteContent(idLi, values)
        const renderNotes = await notepad.getNotes()
        renderNoteList(ref.ul, renderNotes)
        Storage.remove("modalValue");
        ref.form.reset();
        MicroModal.close("note-editor-modal");
        notyf.success(NOTIFICATION_MESSAGES.NOTE_UPDATED_SUCCESS);
      }
    }
    ref.form.addEventListener('submit', handleEdit)
  }
  if (parentI === NOTE_ACTIONS.INCREASE_PRIORITY) {
    increasePriority(event.target);
  }
  if (parentI === NOTE_ACTIONS.DECREASE_PRIORITY) {
    decreasePriority(event.target);
  }
};


ref.form.addEventListener("submit", addListItem);
ref.ul.addEventListener("click", actionListItem);
ref.input.addEventListener("input", filterNotes);
ref.btmEditor.addEventListener("click", modalOpen);
ref.form.addEventListener("input", InputToLocalStorage);
ref.form.addEventListener("input", updateValue);