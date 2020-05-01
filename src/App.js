import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function buildRepository(baseNumber) {
  return {
    title: `Repository ${baseNumber}`,
    url: `https://github.com/natanaelsirqueira/repository-${baseNumber}`,
    techs: []
  }
}

function App() {
  const [repositories, setRepositories] = useState([])
  const [currentIndex, setCurrentIndex] = useState(1)

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', buildRepository(currentIndex))

    setRepositories([...repositories, response.data])
    setCurrentIndex(currentIndex + 1)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
