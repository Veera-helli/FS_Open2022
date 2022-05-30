const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <h3>
        Total of exercises{" "}
        {props.parts.map((part) => part.exercises).reduce((a, b) => a + b, 0)}
      </h3>
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <div>
        {props.course.parts.map((part) => (
          <Part part={part} key={part.id} />
        ))}
      </div>
      <div>
        <Total parts={props.course.parts} />
      </div>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "State of a thing",
        exercises: 10,
        id: 4,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
