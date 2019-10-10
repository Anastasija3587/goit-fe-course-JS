"use strict";

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
  static Priority() {
    (LOW = 0), (NORMAL = 1), (HIGH = 2);
  }
  findNoteById(id) {
    for (let key of this._notes) {
      if (key.id === id) {
        return key;
      }
    }
  }
  saveNote(note) {
    this._notes.push(note);
    return note;
  }
  deleteNote(id) {
    const findId = this.findNoteById(id);
    if (findId.id === id) {
      this._notes.splice(this._notes.indexOf(findId), 1);
    }
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
    const newNotes = [];
    for (let key of this._notes) {
      const titleLowerCase = key.title.toLowerCase();
      const bodyLowerCase = key.body.toLowerCase();
      if (titleLowerCase.includes(query) || bodyLowerCase.includes(query)) {
        newNotes.push(key);
      }
    }
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
}
