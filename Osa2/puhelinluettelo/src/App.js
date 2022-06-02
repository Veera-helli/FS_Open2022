import { useState, useEffect } from "react";
import nameService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  useEffect(() => {
    nameService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
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
          setMessageClass("notif");
          setMessage(`Updated ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
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
        setMessageClass("notif");
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
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
      const name = persons.find((n) => n.id === id).name;
      console.log(`deleting ${name}`);
      setMessageClass("delete");
      setMessage(`Deleted ${name}`);
      setPersons(persons.filter((n) => n.id !== id));
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} classType={messageClass} />
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
