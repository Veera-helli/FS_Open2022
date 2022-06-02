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
    return (
      <div>
        <p>Too many matches. Specify another filter.</p>
      </div>
    );
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
    return (
      <div>
        <p>No countries found.</p>
      </div>
    );
  }
};

const Filter = (props) => {
  return (
    <form>
      <div>
        Find countries: <input value={props.filter} onChange={props.handler} />
      </div>
      <FilterResult {...props} />
    </form>
  );
};

export default Filter;
