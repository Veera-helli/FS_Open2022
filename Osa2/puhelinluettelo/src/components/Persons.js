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

export default Persons;
