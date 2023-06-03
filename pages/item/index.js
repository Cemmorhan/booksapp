import Objeto from "@/components/Objeto";
import Scroll from "@/components/Scroll";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Item() {

    const [books, setBooks] = useState([]);
    const [isbn, setIsbn] = useState("0");

    const router = useRouter();

    useEffect(() => {
        setIsbn(router.query.isbn)
    }, []);

    useEffect(() => {
        console.log(isbn);
        getbooks();
    }, [isbn]);

    useEffect(() => {
        console.log(books);
    }, [books]);

    const getbooks = async () => {
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
        setBooks(books);
    };

    return (
        <div className="content">
            <Objeto books={books}/>
            <Scroll books={books} titulo='Vistos recientemente' />
        </div>


    )
}