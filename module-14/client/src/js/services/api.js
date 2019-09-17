import axios from "axios";

const URL = "http://localhost:3000/notes";

export const getNotes = async () => {
  try {
    const getNotes = await axios.get(URL);
    return getNotes.data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const saveNotes = async note => {
  try {
    const postNote = await axios.post("http://localhost:3000/notes", note);
    return postNote.data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const deleteNotes = async id => {
  try {
    const removedNote = await axios.delete(`${URL}/${id}`);
    return removedNote.data;
  } catch (error) {
    throw new Error("Error ");
  }
};
