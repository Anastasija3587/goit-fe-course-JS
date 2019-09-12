'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
  static GenerateUniqueId() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
  findNoteById(id) {
    return this._notes.find(note => note.id === id)
  }
  saveNote(note) {
    this._notes.push(note);
    return note;
  }
  deleteNote(id) {
    this._notes = this._notes.filter(note => note.id !== id);
  }
  updateNoteContent(id, updatedContent) {
    let updateNew;
    let findIdIndex;
    const findId = this.findNoteById(id);
    if (findId.id === id) {
      findIdIndex = this.notes.indexOf(findId);
      updateNew = {
        ...findId,
        ...updatedContent,
      };
      this._notes[findIdIndex] = updateNew;
    }
    return updateNew;
  }
  updateNotePriority(id, priority) {
    const findId = this.findNoteById(id);
    if (findId.id === id) {
      findId.priority = priority;
      return findId;
    }
  }
  filterNotesByQuery(query) {
    const newNotes = [];
    this._notes.forEach(note => {
      const titleLowerCase = note.title.toLowerCase();
      const bodyLowerCase = note.body.toLowerCase();
      if (titleLowerCase.includes(query) || bodyLowerCase.includes(query)) {
        newNotes.push(note);
      }
    });
    return newNotes;
  }
  filterNotesByPriority(priority) {
    const newPriority = [];
    for (let key of this._notes) {
      if (key.priority === priority) {
        newPriority.push(key);
      }
    }
    return newPriority;
  }
  addItem(titleInput, bodyText) {
    const newItem = {
      id: Notepad.GenerateUniqueId(),
      title: titleInput,
      body: bodyText,
      priority: PRIORITY_TYPES.LOW,
    };
    this._notes.push(newItem);
    return newItem;
  }
}

const notepad = new Notepad(initialNotes);

const ref = {
  ul: document.querySelector('.note-list'),
  form: document.querySelector('.note-editor'),
  input: document.querySelector('.search-form__input'),
};

const createElement = (tag, className) => {
  const createElement = document.createElement(tag);
  createElement.classList.add(className);
  return createElement;
};

const createNoteContent = (title, body) => {
  const noteContent = createElement('div', 'note__content');
  const noteTitle = createElement('h2', 'note__title');
  noteTitle.textContent = title;
  const noteBody = createElement('p', 'note__body');
  noteBody.textContent = body;
  noteContent.append(noteTitle, noteBody);
  return noteContent;
};

const createActionButton = (data, icon) => {
  const action = createElement('button', 'action');
  action.dataset.action = data;
  const actionIcon = createElement('i', 'material-icons');
  actionIcon.classList.add('action__icon');
  actionIcon.textContent = icon;
  action.appendChild(actionIcon);
  return action;
};

const createSection = (buttonOnePr, iconOne, buttonTwoPr, iconTwo) => {
  const noteSection = createElement('section', 'note__section');
  noteSection.append(
    createActionButton(buttonOnePr, iconOne),
    createActionButton(buttonTwoPr, iconTwo)
  );
  return noteSection;
};

const createNoteFooter = priority => {
  const noteFooter = createElement('footer', 'note__footer');
  const notePriority = createElement('span', 'note__priority');
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

const createListItem = note => {
  const noteListItem = createElement('li', 'note-list__item');
  noteListItem.dataset.id = note.id;
  const noteDiv = createElement('div', 'note');
  noteDiv.append(
    createNoteContent(note.title, note.body),
    createNoteFooter(note.priority)
  );
  noteListItem.appendChild(noteDiv);
  return noteListItem;
};

const renderNoteList = (listRef, notes) => {
  const noteList = notes.map(note => createListItem(note));
  listRef.innerHTML = '';
  listRef.append(...noteList);
};

renderNoteList(ref.ul, notepad.notes);

const addListItem = event => {
  event.preventDefault();
  const [input, text] = event.target.elements;
  if (input.value === '' || text.value === '') {
    alert('Необходимо заполнить все поля!');
    ref.form.reset();
    return;
  }
  const newItem = notepad.addItem(input.value, text.value);
  const newNote = createListItem(newItem);
  ref.ul.append(newNote);
  ref.form.reset();
};

const deleteListItem = el => {
  const liDelete = el.closest('li');
  const idLi = liDelete.dataset.id;
  notepad.deleteNote(idLi);
  liDelete.remove();
};

const removeListItem = event => {
  if (event.target.nodeName !== 'I') return;
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

ref.form.addEventListener('submit', addListItem);
ref.ul.addEventListener('click', removeListItem);
ref.input.addEventListener('input', filterNotes);
