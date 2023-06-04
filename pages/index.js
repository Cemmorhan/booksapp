import Scroll from '@/components/Scroll';
import Recomendados from '@/components/Recomendados';
import Buscador from '@/components/Buscador';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Home(props) {

  const [books, setBooks] = useState([]);
  useEffect(() => {
    getbooks();
  }, []);
  useEffect(() => {
    console.log(books);
  }, [books]);
  const getbooks = async () => {
    const send = { books_id: "0" }
    const results = await fetch("/api/getbooks", {
      method: "POST",
      body: JSON.stringify(send),
    }).then((response) => response.json());
    const books = results.map((result) => {
      return { ...result }
    });
    setBooks(books);
  };
  const [topventas, setTopventas] = useState([]);
  useEffect(() => {
    gettopventas();
  }, []);
  useEffect(() => {
    console.log(topventas);
  }, [topventas]);
  const gettopventas = async () => {
    const send = { topventas_id: "0" }
    const results = await fetch("/api/gettopventas", {
      method: "POST",
      body: JSON.stringify(send),
    }).then((response) => response.json());
    const topventas = results.map((result) => {
      return { ...result }
    });
    setTopventas(topventas);
  };
  const [recientes, setRecientes] = useState([]);
  useEffect(() => {
    getrecientes();
  }, []);
  useEffect(() => {
    console.log(recientes);
  }, [recientes]);
  const getrecientes = async () => {
    const send = { recientes_id: "0" }
    const results = await fetch("/api/getrecientes", {
      method: "POST",
      body: JSON.stringify(send),
    }).then((response) => response.json());
    const recientes = results.map((result) => {
      return { ...result }
    });
    setRecientes(recientes);
  };
  return (
    <>
        <div className="content">
          <Buscador />
          <Scroll books={topventas} titulo='Mas vendidos' />
          <Scroll books={recientes} titulo='Ultimos añadidos' />
          <Scroll books={books} titulo='Especial para tí' />
          <Recomendados titulo='Recomendados' />
        </div >
    </>
  )
}
