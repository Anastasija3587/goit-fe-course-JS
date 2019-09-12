import template from "../../template/list.hbs";

export const createElement = note => {
  return template(note);
};

export const renderNoteList = (listRef, notes) => {
  const noteList = notes.map(note => createElement(note));
  listRef.innerHTML = "";
  listRef.innerHTML = noteList.join("");
};
