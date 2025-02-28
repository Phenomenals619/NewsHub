import React, { useEffect, useState } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const API_KEY = import.meta.env.VITE_SECRET_KEY;
  console.log("API_KEY" +API_KEY)

  // const getData = async () => {
  //   const response = await fetch(
  //     `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
  //   );
  //   const jsonData = await response.json();
  //   let dt = jsonData.articles.slice(0, 5);
  //   setNewsData(dt);
  // };
  const getData = async () => {
    if (!search) {
      console.log('Search term is empty');
      return;
    }
  
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      
      if (jsonData.articles && Array.isArray(jsonData.articles)) {
        let dt = jsonData.articles.slice(0, 5);
        setNewsData(dt);
      } else {
        console.error('No articles found or invalid response:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    getData();
  }, [search]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const userInput = (category) => {
    setSearch(category);
  };

  return (
    <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid me-5">
            <a className="navbar-brand" href="#">NewsHub</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex w-100 ms-2">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={handleInput}
                />
                <button
                  className="btn btn-outline-dark"
                  onClick={getData}
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="container-fluid">
        <p className="head">🔥Stay Updated with Hot News🔥</p>
        <div className="categoryBtn">
          <button onClick={() => userInput("sports")}>Sports</button>
          <button onClick={() => userInput("politics")}>Politics</button>
          <button onClick={() => userInput("entertainment")}>Entertainment</button>
          <button onClick={() => userInput("health")}>Health</button>
          <button onClick={() => userInput("fitness")}>Fitness</button>
        </div>
        <hr />
      </div>

      <div>{newsData ? <Card data={newsData} /> : <p>Loading...</p>}</div>
    </>
  );
};

export default Newsapp;
