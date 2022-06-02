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
          <Person person={person} key={person.name} />
        ))}
    </div>
  );
};

const Person = (props) => {
  return (
    <div>
      <p>
        {props.person.name} {props.person.number}
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

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      nameService.create(nameObject).then((returnedNote) => {
        setPersons([...persons, returnedNote]);
        //setPersons(persons.concat(nameObject));
        setNewName("");
        setNewNumber("");
      });
      console.log("new name added");
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
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
