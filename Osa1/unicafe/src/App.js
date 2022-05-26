import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const total = good + neutral + bad;

  if (good > 0 || bad > 0 || neutral > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Average " value={(good + bad * -1) / total} />
          <StatisticLine text="Positive" value={(good / total) * 100 + " %"} />
        </tbody>
      </table>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
};

const Button = (props) => {
  return (
    <button onClick={() => props.set(props.feedback + 1)}>{props.name}</button>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button feedback={good} set={setGood} name="good" />
      <Button feedback={neutral} set={setNeutral} name="neutral" />
      <Button feedback={bad} set={setBad} name="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
