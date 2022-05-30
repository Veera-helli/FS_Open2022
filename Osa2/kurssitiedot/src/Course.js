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

export default Course;
