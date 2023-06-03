import Scroll from "@/components/Scroll"
import { useEffect } from "react";
import { useState } from "react";

export default function Cesta() {
    
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
                <div className="contenedor_carrito">
                    <div className="articulos_carrito">
                        <h1>Articulos</h1>
                    </div>

                    <div className="compra_carrito">
                        <div className="total_carrito">
                            <h1>Total</h1>
                        </div>
                    </div>
                </div>
                <Scroll books={books} titulo='Vistos recientemente' />
                <Scroll books={books} titulo='Similares' />
                <Scroll books={books} titulo='Otros libros' />
            </div>


        </>
    )
}