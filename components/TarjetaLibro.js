import { useState, useEffect } from 'react'
import { Select } from 'antd';
import { Button } from 'antd';
import Link from 'next/link';
function TarjetaLibro({ book }) {
    return (
        /* crear un flexbox de una tarjeta con la image, el titulo y breve descripción del libro */
        <Link
            href={{
                pathname: "/item",
                query: { isbn: book.isbn }
            }}
        >
            <div className="card">
                <div className="image_card">
                    <img src={book.image.thumbnail != undefined ? book.image.thumbnail : "Imagen"} className="card_img" alt='' />
                </div>
                <div className="datos_card">
                    <div className="descripcion_card">

                        <div className="titulo_card">
                            {book.title}
                        </div>

                        <div className="data_card">
                            {book.author}
                        </div>

                    </div>
                </div>
            </div>
        </Link>



    )
}
export default TarjetaLibro
