import { useState } from 'react'
import './App.css'

function App() {
  const [pokemon1, setPokemon1] = useState('')
  const [pokemon2, setPokemon2] = useState('')
  const [battleResult, setBattleResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setBattleResult(null)
    setErrorMessage('')

    if (!pokemon1.trim() || !pokemon2.trim()) {
      setErrorMessage('Informe os dois Pokémons para iniciar a batalha.')
      return
    }

    setIsLoading(true)

    try {
      const body = new URLSearchParams({
        pokemon1,
        pokemon2,
      })

      const response = await fetch('/battle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body,
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Não foi possível realizar a batalha.')
        return
      }

      setBattleResult(data)
    } catch {
      setErrorMessage('Não foi possível conectar com a API Rails.')
    } finally {
      setIsLoading(false)
    }
  }

  function resetBattle() {
    setPokemon1('')
    setPokemon2('')
    setBattleResult(null)
    setErrorMessage('')
  }

  return (
    <main className="page">
      <section className="container">
        <header className="page-header">
          <p className="eyebrow">Pokémon Battle</p>
          <h1>Simulador de batalha</h1>
          <p className="description">
            Compare o HP de dois Pokémons usando dados reais da PokéAPI.
          </p>
        </header>

        <form className="battle-form" onSubmit={handleSubmit}>
          <PokemonInput
            label="Pokémon 1"
            value={pokemon1}
            onChange={setPokemon1}
            placeholder="pikachu"
          />

          <span className="vs">contra</span>

          <PokemonInput
            label="Pokémon 2"
            value={pokemon2}
            onChange={setPokemon2}
            placeholder="charizard"
          />

          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Consultando...' : 'Batalhar'}
            </button>

            <button type="button" className="button-secondary" onClick={resetBattle}>
              Limpar
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="message error">
            {errorMessage}
          </div>
        )}

        {battleResult && (
          <BattleResult result={battleResult} />
        )}
      </section>
    </main>
  )
}

function PokemonInput({ label, value, onChange, placeholder }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function BattleResult({ result }) {
  const pokemon1 = result.pokemon1
  const pokemon2 = result.pokemon2
  const isDraw = result.draw === true

  return (
    <section className="battle-result">
      <div className="pokemon-list">
        <PokemonCard
          pokemon={pokemon1}
          isWinner={!isDraw && result.winner?.name === pokemon1?.name}
        />

        <PokemonCard
          pokemon={pokemon2}
          isWinner={!isDraw && result.winner?.name === pokemon2?.name}
        />
      </div>

      <div className={isDraw ? 'summary draw' : 'summary'}>
        <strong>{isDraw ? 'Empate' : `${formatName(result.winner?.name)} venceu`}</strong>
        <p>{result.result_message}</p>
      </div>
    </section>
  )
}

function PokemonCard({ pokemon, isWinner }) {
  if (!pokemon) return null

  return (
    <article className={isWinner ? 'pokemon-card winner' : 'pokemon-card'}>
      <div className="sprite-wrapper">
        {pokemon.sprite ? (
          <img src={pokemon.sprite} alt={pokemon.name} />
        ) : (
          <span className="sprite-placeholder">?</span>
        )}
      </div>

      <div>
        <h2>{formatName(pokemon.name)}</h2>
        <p>
          HP <strong>{pokemon.hp}</strong>
        </p>
      </div>

      {isWinner && (
        <span className="winner-badge">Vencedor</span>
      )}
    </article>
  )
}

function formatName(name) {
  if (!name) return ''

  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default App