import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function repos() {
    const response = await api.get(`/repositories`);

    setRepositories(response.data);
  }

  useEffect(() => {
    repos();
  }, []);

  async function handleAddRepository() {
    await api.post("/repositories", {
      title: "Desafio Node.js",
      url: "https://github.com/Rocketseat/unform",
      techs: ["Nodejs", "Reactjs", "Nodejs", "Reactjs"],
    });
    repos();
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    repos();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <button onClick={handleAddRepository}>Adicionar</button>

        {repositories.map((repos) => (
          <li key={repos.id}>
            {repos.title}
            <br />
            {repos.url}
            <br />
            {repos.techs}
            <br />
            likes {repos.likes}
            <button onClick={() => handleRemoveRepository(repos.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
