
import Scroll from '@/components/Scroll';
import Recomendados from '@/components/Recomendados';
import Buscador from '@/components/Buscador';
import { useEffect } from 'react';
import { useState } from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Home(props) {

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

  return (
    <>
        <div className="content">
          <Buscador />
          <Scroll books={books} titulo='Mas vendidos' />
          <Scroll books={books} titulo='Ultimos añadidos' />
          <Scroll books={books} titulo='Especial para tí' />
          <Recomendados titulo='Recomendados' />
        </div >
    </>
  )
})
