import { PRIORITY_TYPES } from "./constants";
import shortid from "shortid";

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
  findNoteById(id) {
    return this._notes.find(note => note.id === id);
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
        ...updatedContent
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
    return this._notes.filter(note => {
      const queryLowerCase = query.toLowerCase();
      const titleLowerCase = note.title.toLowerCase();
      const bodyLowerCase = note.body.toLowerCase();
      return (
        titleLowerCase.includes(queryLowerCase) ||
        bodyLowerCase.includes(queryLowerCase)
      );
    });
  }
  filterNotesByPriority(priority) {
    return this._notes.filter(note => (note.priority = priority));
  }
  addItem(titleInput, bodyText) {
    const newItem = {
      id: shortid.generate(),
      title: titleInput,
      body: bodyText,
      priority: PRIORITY_TYPES.LOW
    };
    this._notes.push(newItem);
    return newItem;
  }
}
