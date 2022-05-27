import "./App.css";
import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];
  const initial = Object.assign(
    {},
    ...anecdotes.map((x) => ({ [anecdotes.indexOf(x)]: 0 }))
  );

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initial);

  const handleVote = (num) => {
    const voting = () => {
      const newPoints = { ...points };
      newPoints[num] += 1;
      setPoints(newPoints);
    };
    return voting;
  };

  const maxVotesAnecdote = () => {
    return anecdotes[
      Object.values(points).indexOf(Math.max(...Object.values(points)))
    ];
  };

  const randSelect = () => {
    let randi = Math.floor(Math.random() * anecdotes.length);
    setSelected(randi);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {points[selected]} votes</p>
      <button onClick={handleVote(selected)}>vote</button>
      <button onClick={randSelect}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{maxVotesAnecdote()}</p>
    </div>
  );
};

export default App;
