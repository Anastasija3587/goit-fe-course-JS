import initialNotes from "../../assets/notes.json";

const load = key => {
  try {
    const notesFromLocal = localStorage.getItem(key);
    return notesFromLocal === null ? initialNotes : JSON.parse(notesFromLocal);
  } catch (err) {
    console.error("Get state error: ", err);
  }
};

const save = (key, value) => {
  try {
    const newNoteValue = JSON.stringify(value);
    localStorage.setItem(key, newNoteValue);
  } catch (err) {
    console.error("Get state error: ", err);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Get state error: ", err);
  }
};

export default { load, save, remove };
