"use client";

import { useState } from "react";
import { fetchAnimalsApi } from "../../services/AnimalSservice";
import { fetchPeopleApi } from "../../services/PeopleService";
import "./Main.css";

export default function Main() {
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<string[]>([]);

  function fetchAnimals() {
    setData(fetchAnimalsApi());
    setIsLoading(false);
  }

  function fetchPeople() {
    setData(fetchPeopleApi());
    setIsLoading(false);
  }

  function handleUserInputSubmit() {
    if (userInput.trim() === "") return;

    setIsLoading(true);

    if (userInput.toLowerCase().includes("animals")) {
      setTimeout(fetchAnimals, 3000);
    } else if (userInput.toLowerCase().includes("people")) {
      setTimeout(fetchPeople, 3000);
    } else {
      setIsLoading(false);
      alert("Invalid Input");
    }
  }

  return (
    <div className="main-container">
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <button onClick={handleUserInputSubmit}>Search</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <section>
          <ul>
            {(data || []).map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
