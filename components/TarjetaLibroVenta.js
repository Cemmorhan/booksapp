import { useState, useEffect } from 'react'
import { Select } from 'antd';
import { Button } from 'antd';
import Link from 'next/link';
function TarjetaLibroVenta({ book }) {
    const [itembook, setItembook] = useState(null);

    const getonebookbyisbn = async () => {
        if (book.isbn === undefined) {
            return;
        }
        if (book.isbn  === "0") {
            return;
        }
        const send = { isbn: book.isbn  }
        const results = await fetch("/api/getonebook", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const books = results.map((result) => {
            return { ...result }
        });
        setItembook(books[0]);
    };

    useEffect(() => {
        getonebookbyisbn();
    }, [book.isbn ]);

    useEffect(() => {
        console.log(itembook);
    }, [itembook]);


    function showCard()
    {
        if (itembook === undefined) {
            return;
        }
        if (itembook === null) {
            return;
        }
        return (
            <div className="card">
                <div className="image_card">
                    <img src={itembook.image.thumbnail !== undefined ? itembook.image.thumbnail : "Imagen"} className="card_img" alt='' />
                </div>
                <div className="datos_card">
                    <div className="descripcion_card">

                        <div className="titulo_card">
                            {itembook.title}
                        </div>

                        <div className="data_card">
                           <p>{itembook.author}</p> 
                           <p>{"Precio de venta " + book.price + "€"}</p>
                           <p>{"Estado: " + book.state}</p>
                           <p>{"Fecha de subida: " + book.updatedate.split("T")[0]}</p>
                           <b>Datos comprador</b>
                           <p>{"Nombre: " + book.salesdata.userbuy.name + " " + book.salesdata.userbuy.lastname}</p>
                           <p>{"Dirección: " + book.salesdata.userbuy.address}</p>
                           <p>{"Ciudad: " + book.salesdata.userbuy.state}</p>
                           <p>{"Código postal: " + book.salesdata.userbuy.zip}</p>
                           <p>{"País: " + book.salesdata.userbuy.country}</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        /* crear un flexbox de una tarjeta con la image, el titulo y breve descripción del libro */
        <Link
            href={{
                pathname: "/item",
                query: { isbn: book.isbn }
            }}
        >
           {   showCard()}
        </Link>



    )
}
export default TarjetaLibroVenta
