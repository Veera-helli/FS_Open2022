import Country from "./Country";

const ListElement = (props) => {
  const showHandler = (country) => {
    props.setFilter(country.name.common);
  };

  return (
    <div>
      <p>
        {props.country.name.common}{" "}
        <button onClick={() => showHandler(props.country)}>show</button>
      </p>
    </div>
  );
};

const FilterResult = (props) => {
  const filtered = props.countries.filter((country) =>
    country.name.common.toLowerCase().includes(props.filter.toLowerCase())
  );

  if (filtered.length > 10) {
    return <p>Too many matches. Specify another filter.</p>;
  } else if (10 > filtered.length && 1 < filtered.length) {
    return (
      <div>
        {filtered.map((country) => (
          <ListElement country={country} key={country.name.common} {...props} />
        ))}
      </div>
    );
  } else if (1 === filtered.length) {
    return <Country country={filtered[0]} api_key={props.api_key} />;
  } else {
    return <p>No countries found.</p>;
  }
};

const Filter = (props) => {
  return (
    <form>
      <p>
        Find countries: <input value={props.filter} onChange={props.handler} />
      </p>
      <FilterResult {...props} />
    </form>
  );
};

export default Filter;
