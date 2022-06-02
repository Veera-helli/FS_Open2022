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

export default Filter;
