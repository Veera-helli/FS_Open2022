import { useState, useEffect } from "react";
import axios from "axios";
//https://restcountries.com/v3.1/all

const Languages = (props) => {
  console.log(Object.entries(props.languages));
  return (
    <div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(props.languages).map((language) => {
          console.log(language[1]);
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
    </div>
  );
};

const FilterResult = (props) => {
  const filtered = props.countries.filter((country) =>
    country.name.common.toLowerCase().includes(props.filter)
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
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </div>
    );
  } else if (1 == filtered.length) {
    return <Country country={filtered[0]} />;
  } else {
    console.log("nothing");
  }
};

const Filter = (props) => {
  return (
    <form>
      <div>
        Find countries: <input value={props.filter} onChange={props.handler} />
      </div>
      <FilterResult filter={props.filter} countries={props.countries} />
    </form>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Country Info</h2>
      <Filter
        countries={countries}
        filter={filter}
        handler={handleFilterChange}
      />
    </div>
  );
};

export default App;
