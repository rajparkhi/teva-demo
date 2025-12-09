"use client";

import { useState } from "react";
import { fetchAnimalsApi } from "../../services/AnimalSservice";
import { fetchPeopleApi } from "../../services/PeopleService";
import "./Main.css";

// Component to show the fetched data
export default function Main() {
  // User input variable
  const [userInput, setUserInput] = useState<string>("");

  // variable to manage loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // variable to store fetched data
  const [data, setData] = useState<string[]>([]);

  // function to fetch animals data from Backend
  function fetchAnimals() {
    setData(fetchAnimalsApi());
    setIsLoading(false);
  }

  // function to fetch people data from Backend
  function fetchPeople() {
    setData(fetchPeopleApi());
    setIsLoading(false);
  }

  /*
   * function to handle to user input search
   * Return if user input is empty
   * fetches animal data if user input contains keyword 'animals'
   * fetches people data if user input contains keyword 'people'
   * Alerts user if invalid input is made
   */
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
