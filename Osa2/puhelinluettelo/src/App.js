import { useState, useEffect } from "react";
import nameService from "./services/persons";

const Filter = (props) => {
  return (
    <div>
      <p>
        Filter for names shown with{" "}
        <input value={props.filter} onChange={props.handler} />
      </p>
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addData}>
        <div>
          name:{" "}
          <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <br />
        <div>
          number:{" "}
          <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter((person) => person.name.toLowerCase().includes(props.filter))
        .map((person) => (
          <Person
            person={person}
            key={person.name}
            deleteName={props.deleteName}
          />
        ))}
    </div>
  );
};

const Person = (props) => {
  return (
    <div>
      <p>
        {props.person.name} {props.person.number}{" "}
        <button onClick={() => props.deleteName(props.person.id)}>
          delete
        </button>
      </p>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    nameService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    //console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setFilter(event.target.value);
  };

  const addData = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((p) => p.name === newName)) {
      // newName is already added to phonebook;
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        const nameId = persons.find((p) => p.name === newName).id;
        nameService.update(nameId, nameObject).then((returnedName) => {
          setPersons(
            persons.map((person) =>
              person.id !== nameId ? person : returnedName
            )
          );
          console.log("replaced number");
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      // Add new name to phonebook
      nameService.create(nameObject).then((returnedName) => {
        setPersons([...persons, returnedName]);
        setNewName("");
        setNewNumber("");
      });
      console.log("new name added");
    }
  };

  const deleteName = (id) => {
    if (
      // Asking for confirmation
      window.confirm(
        `Do you really want to delete ${persons.find((n) => n.id === id).name}?`
      )
    ) {
      nameService.nameDelete(id);
      console.log(`deleting ${persons.find((n) => n.id === id).name}`);
      setPersons(persons.filter((n) => n.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handler={handleFilterChange} />
      <h2>Add New</h2>
      <PersonForm
        addData={addData}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteName={deleteName} />
    </div>
  );
};

export default App;
