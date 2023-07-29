import Objeto from "../../components/Objeto";
import Scroll from "../../components/Scroll";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Item() {
    const [itembook, setItembook] = useState([]);
    const [books, setBooks] = useState([]);
    const [isbn, setIsbn] = useState("0");
    const [itembookHistorial, setItembookHistorial] = useState([]);

    const router = useRouter();

    useEffect(() => {
        setIsbn(router.query.isbn)
    }, [router.query.isbn]);

    useEffect(() => {
        console.log(isbn);
        getbooks();
        getonebookbyisbn();
        gethistorial();
    }, [isbn]);

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

    const getonebookbyisbn = async () => {
        if (isbn === undefined) {
            return;
        }
        if (isbn === "0") {
            return;
        }
        const send = { isbn: isbn }
        const results = await fetch("/api/getonebook", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const books = results.map((result) => {
            return { ...result }
        });
        setItembook(books);
    };
    //buscar libros historial
    const gethistorial = async () => {
        if (isbn === undefined) {
            return;
        }
        if (isbn === "0") {
            return;
        }
        const send = { isbn: isbn }
        const results = await fetch("/api/gethistorial", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const books = results.map((result) => {
            return { ...result }
        });
        setItembookHistorial(books);
    };


    return (
        <div className="content">
            {itembook.length>0?<Objeto books={itembook} itembookHistorial={itembookHistorial} />:<h2>No se encuentra el libro</h2>}
            <Scroll books={books} titulo='Vistos recientemente' />
        </div>


    )
}
