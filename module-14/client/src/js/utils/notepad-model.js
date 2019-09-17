import { PRIORITY_TYPES } from "./constants";
import * as api from "../services/api";

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
  async getNotes() {
    try {
      const getNotes = await api.getNotes();
      this._notes = await getNotes;
      return this._notes;
    } catch (error) {
      console.error(error);
    }
  }
  findNoteById(id) {
    return this._notes.find(note => note.id === id);
  }
  saveNote(note) {
    this._notes.push(note);
    return note;
  }
  async deleteNote(id) {
    try {
      await api.deleteNotes(id);
      return this._notes.filter(note => note.id !== id);
    } catch (error) {
      console.error(error);
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
  async filterNotesByQuery(query) {
    try {
      const notes = await api.getNotes();
      const filteredNotes = notes.filter(note => {
        const queryLowerCase = query.toLowerCase();
        const titleLowerCase = note.title.toLowerCase();
        const bodyLowerCase = note.body.toLowerCase();
        return (
          titleLowerCase.includes(queryLowerCase) ||
          bodyLowerCase.includes(queryLowerCase)
        );
      });
      return filteredNotes;
    } catch (error) {
      console.error(error);
    }
  }
  filterNotesByPriority(priority) {
    return this._notes.filter(note => (note.priority = priority));
  }
  async addItem(titleInput, bodyText) {
    try {
      const newItem = {
        title: titleInput,
        body: bodyText,
        priority: PRIORITY_TYPES.LOW
      };
      const savedNote = await api.saveNotes(newItem);
      this._notes.push(savedNote);
      return savedNote;
    } catch (error) {
      console.error(error);
    }
  }
}
