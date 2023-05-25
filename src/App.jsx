import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [listActu, setListActu] = useState([]);
  const [search, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);

  const getArticle = async () => {
    let response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=f36e2b11dc594ce08ff914342fd78ce0"
    );

    let data = await response.json();
    setListActu(data.articles);

    console.log("data", data);
  };

  const getArticleBySearch = async () => {
    console.log("search", search);
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&from=2023-05-14&sortBy=popularity&apiKey=f36e2b11dc594ce08ff914342fd78ce0`
    );

    let data = await response.json();
    setListSearch(data.articles);

    console.log("data search", data);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getArticle();
  }, []);

  useEffect(() => {}, [listActu, listSearch]);

  const renderActu = () => {
    return listActu.slice(0, 5).map((item, key) => {
      return (
        <div>
          <p>{item.title}</p>
          <a href={item.url}>
            <p>Voir l'article</p>
          </a>
        </div>
      );
    });
  };

  const renderActuSearch = () => {
    return listSearch.slice(0, 5).map((item, key) => {
      return (
        <div>
          <p>{item.title}</p>
          <a href={item.url}>
            <p>Voir l'article</p>
          </a>
        </div>
      );
    });
  };

  return (
    <>
      <h1>Actu du jour</h1>
      {renderActu()}
      <h1> Rechercher un article</h1>
      <input onChange={handleChange} />
      <button onClick={getArticleBySearch}>Valider</button>
      {renderActuSearch()}
    </>
  );
}

export default App;
