import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";

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
        setFilter={setFilter}
      />
    </div>
  );
};

export default App;
