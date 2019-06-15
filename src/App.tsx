import React, { FunctionComponent, useState, useReducer } from 'react';
import './App.scss';
import Gallery from "./components/Gallery"
import Search from "./components/Search"

const App: FunctionComponent = () => {
  const [query, setQuery] = useState("")
  return (
    <div className="App">
      <header>
        <h1>Dogs!</h1>
        <Search />
      </header>
      <main>
        <nav>

        </nav>
        <Gallery images={[]} />
      </main>
    </div>
  );
}

export default App;
