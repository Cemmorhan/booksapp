import Objeto from "@/components/Objeto";
import Scroll from "@/components/Scroll";
import { useEffect } from "react";
import { useState } from "react";

export default function Item() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        getbooks();
    }, []);

    useEffect(() => {
        console.log(books);
    }, [books]);

    const getbooks = async () => {
        /* 
            const send = { books_id: "0"} */
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
        <div className="content">
            <Objeto />
            <Scroll titulo='Vistos recientemente' />
        </div>


    )
}