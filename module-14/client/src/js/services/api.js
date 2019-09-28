import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const getNotes = async () => {
  try {
    const getNotes = await axios.get("/notes");
    return getNotes.data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const saveNotes = async note => {
  try {
    const postNote = await axios.post("/notes", note);
    return postNote.data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const deleteNotes = async id => {
  try {
    const removedNote = await axios.delete(`/notes/${id}`);
    return removedNote.data;
  } catch (error) {
    throw new Error("Error ");
  }
};

export const updateNotes = async (id, updateText) => {
  try {
    const updateNote = await axios.patch(`/notes/${id}`, updateText);
    return updateNote.data;
  } catch (error) {
    throw new Error("Error ");
  }
};
