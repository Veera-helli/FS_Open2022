import Weather from "./Weather";

const Languages = (props) => {
  return (
    <div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(props.languages).map((language) => {
          return <li key={language[0]}>{language[1]}</li>;
        })}
      </ul>
    </div>
  );
};

const Country = (props) => {
  return (
    <div>
      <h3>{props.country.name.common}</h3>
      <p>capital {props.country.capital}</p>
      <p>area {props.country.area}</p>
      <Languages languages={props.country.languages} />
      <img src={props.country.flags.png} alt="Flag" />
      <Weather {...props} />
    </div>
  );
};

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
