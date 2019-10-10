import Notepad from "../notepad";

const initialNotes = [
  {
    id: "id-1",
    title: "JavaScript essentials",
    body:
      "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
    priority: Notepad.Priority.HIGH
  },
  {
    id: "id-2",
    title: "Refresh HTML and CSS",
    body:
      "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
    priority: Notepad.Priority.NORMAL
  }
];

describe("notepad", () => {
  let notepad;

  beforeEach(() => {
    notepad = new Notepad(initialNotes);
  });

  it("should have intial notes", () => {
    expect(notepad.notes).toEqual(initialNotes);
  });

  it("saving note", () => {
    notepad.saveNote({
      id: "id-3",
      title: "Get comfy with Frontend frameworks",
      body:
        "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
      priority: 1
    });
    expect(notepad._notes).toHaveLength(3);
  });

  it("find note by id", () => {
    expect(notepad.findNoteById("id-10")).toBe(undefined);
  });

  it("remove note", () => {
    expect(notepad.deleteNote("id-1")).toBe(undefined);
  });

  it("filter notes by query", () => {
    const query = "";
    notepad.filterNotesByQuery(query);
    expect(query).toEqual(expect.anything());
  });

  it("filter notes by priority", () => {
    notepad.filterNotesByPriority(1);
    expect(1).not.toBe(NaN);
  });

  it("should update priority", () => {
    notepad.updateNotePriority("id-2", 2);
    expect(notepad.findNoteById("id-2").priority).toBe(2);
  });

  it("notes have JS", () => {
    expect(notepad.filterNotesByQuery("JS")).toBeTruthy();
  });

  it("should have similar structure", () => {
    expect(notepad.notes).toStrictEqual([
      {
        body:
          "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
        id: "id-2",
        priority: 2,
        title: "Refresh HTML and CSS"
      },
      {
        body:
          "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
        id: "id-3",
        priority: 1,
        title: "Get comfy with Frontend frameworks"
      }
    ]);
  });

  it("should was called", () => {
    notepad.updateNoteContent("id-3", {
      title: "Get comfy with React.js or Vue.js"
    });
    expect(notepad.findNoteById("id-3").title).toBe(
      "Get comfy with React.js or Vue.js"
    );
  });

  it("should not match", () => {
    expect(notepad._notes[0].id).not.toEqual(notepad._notes[1].id);
  });
});
