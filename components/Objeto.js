import { useState, useEffect } from 'react'
function Objeto({ books }) {
    const [isDefined, setIsDefined] = useState(false)

    useEffect(() => {
        if (books !== undefined && books.length > 0) {
            setIsDefined(true)
        } else {
            setIsDefined(false)
        }
    }, [books])

    return (
        <>
            <div className="content_item">
                <div className="ficha_item">
                    <div className="imagen_item">
                        <img src={isDefined && books[0].image.thumbnail} className="caratula_img" alt='' />
                    </div>
                    <div className="datos_item">
                        <div className="descripcion_item">
                            <div className="titulo_item">
                                <h1>{isDefined && books[0].title}</h1>
                            </div>

                            <h2>{isDefined && books[0].author}</h2>
                            <h5>{isDefined && books[0].isbn}</h5>
                            <h4>{isDefined && books[0].genre}</h4>
                            <h3>Sinopsis de {isDefined && books[0].title}:</h3>
                            <p>{isDefined && books[0].summary}</p>

                        </div>
                        <div className="botones_item">
                            <div className="boton_item">
                                <h3>Disponibles:</h3>
                            </div>
                            <button /*onClick={añadirCesta}*/ className="boton_item">
                                Añadir a la cesta
                            </button>
                            <div className="boton_item">
                                <h3>Comprar</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Objeto;