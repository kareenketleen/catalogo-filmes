import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Description.css";
import Header from "../components/Header";

const API_BASE = "http://localhost:3333";

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

async function getDescription(id) {
  return { item: await basicFetch(`/movies/${id}`) };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const load = async () => {
      let req = await getDescription(id);
      setMovie(req.item);
    };
    load();
  }, []);

  return (
    <div id="description">
      <Header />

      <section>
        <div className="container" style={{ height: 100 }}></div>
      </section>

      <h1 id="title-description">{movie.title}</h1>
      <div id="content" key={movie.id}>
        <br></br>
        <img id="img-description" src={movie.image_url} alt=""></img>

        <p id="movie-description">{movie.description}</p>
      </div>
    </div>
  );
};
