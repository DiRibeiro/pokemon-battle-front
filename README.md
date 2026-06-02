# Pokemon Battle Front

Interface web em React para simular uma batalha entre dois Pokemons. A aplicacao recebe os nomes dos Pokemons, envia os dados para a API Rails e exibe o vencedor com base no HP retornado pela API.

## Tecnologias

- React 19
- Vite
- JavaScript ES Modules
- CSS
- ESLint

## Funcionalidades

- Formulario para informar dois Pokemons.
- Validacao para impedir batalhas com campos vazios.
- Integracao com a rota `POST /battle` da API backend.
- Estado de carregamento durante a consulta.
- Exibicao de mensagens de erro.
- Resultado da batalha com sprite, HP e destaque para o vencedor.
- Tratamento visual para empate.
- Layout responsivo para desktop e mobile.

## Requisitos

- Node.js instalado.
- npm instalado.
- API backend Rails rodando em `http://localhost:3000`.

O Vite esta configurado para redirecionar chamadas de `/battle` para `http://localhost:3000`, conforme definido em `vite.config.js`.

## Como executar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse a URL exibida no terminal, normalmente:

```text
http://localhost:5173
```

## Scripts disponiveis

```bash
npm run dev
```

Executa a aplicacao em modo de desenvolvimento.

```bash
npm run build
```

Gera a versao de producao em `dist`.

```bash
npm run preview
```

Executa uma pre-visualizacao local da build de producao.

```bash
npm run lint
```

Executa a verificacao de lint no projeto.

## Integracao com a API

A aplicacao envia uma requisicao `POST` para:

```text
/battle
```

Com o corpo em `application/x-www-form-urlencoded`:

```text
pokemon1=pikachu&pokemon2=charizard
```

A resposta esperada deve conter os dados dos dois Pokemons, o vencedor ou empate, e uma mensagem de resultado.

Exemplo de estrutura esperada:

```json
{
  "pokemon1": {
    "name": "pikachu",
    "hp": 35,
    "sprite": "https://..."
  },
  "pokemon2": {
    "name": "charizard",
    "hp": 78,
    "sprite": "https://..."
  },
  "winner": {
    "name": "charizard"
  },
  "draw": false,
  "result_message": "Charizard venceu a batalha."
}
```

Em caso de erro, a aplicacao espera uma resposta com:

```json
{
  "error": "Mensagem de erro"
}
```

## Estrutura principal

```text
src/
  App.jsx       # Componente principal da aplicacao
  App.css       # Estilos da interface
  main.jsx      # Ponto de entrada do React
```

## Observacoes

- Os nomes dos Pokemons devem ser informados conforme aceitos pela API/PokeAPI.
- A API backend precisa estar ativa antes de iniciar uma batalha.
- Caso a API esteja indisponivel, a interface exibira uma mensagem de falha de conexao.
