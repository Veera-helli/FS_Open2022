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

export default Country;
