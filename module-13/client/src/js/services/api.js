const URL = "http://localhost:3000/notes";

export const getNotes = () => {
  return fetch(URL).then(responce => {
    if (responce.ok) {
      return responce.json();
    }
    throw new Error("Error " + responce.statusText);
  });
};

export const saveNotes = note => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(note)
  };
  return fetch(URL, options).then(responce => {
    if (responce.ok) {
      return responce.json();
    }
    throw new Error("Error " + responce.statusText);
  });
};

export const deleteNotes = id => {
  const options = {
    method: "DELETE"
  };
  return fetch(`${URL}/${id}`, options).then(responce => {
    if (responce.ok) {
      return responce.json();
    }
    throw new Error("Error " + responce.statusText);
  });
};
