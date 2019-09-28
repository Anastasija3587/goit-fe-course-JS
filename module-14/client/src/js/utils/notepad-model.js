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
  async findNoteById(id) {
    try {
      const notes = await this.getNotes();
      const findById = await notes.find(note => note.id === Number(id));
      return findById;
    } catch (error) {
      console.error(error);
    }
  }
  async deleteNote(id) {
    try {
      await api.deleteNotes(id);
      return this._notes.filter(note => note.id !== id);
    } catch (error) {
      console.error(error);
    }
  }
  async updateNoteContent(id, updatedContent) {
    try {
      let updateNew = {};
      let findIdIndex;
      const findId = await this.findNoteById(id);
      if (findId.id) {
        findIdIndex = this.notes.indexOf(findId);
        const updateNote = await api.updateNotes(id, updatedContent);
        updateNew = {
          ...findId,
          ...updateNote.data
        };
        this._notes[findIdIndex] = updateNew;
      }
      return updateNew;
    } catch (error) {
      console.error(error);
    }
  }
  async updateNotePriority(id, priority) {
    try {
      const findId = await this.findNoteById(id);
      if (findId.id) {
        findId.priority = priority;
        return findId;
      }
    } catch (error) {
      throw new Error("Error!!!!");
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
