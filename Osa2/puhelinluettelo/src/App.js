import { useState } from "react";

const Person = (props) => {
  return (
    <div>
      <p>{props.person.name}</p>
    </div>
  );
};
//alert("Hello world!");

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      const nameObject = {
        name: newName,
        id: persons.length + 1,
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      console.log("new name added");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Person person={person} key={person.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
