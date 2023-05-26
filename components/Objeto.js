import books from '../public/books.json'

function Objeto() {

    const book = books[0];

    return (
        <>
            <div className="content_item">
                <div className="titulo_item">
                    <h1>{book.title}</h1>
                </div>
                <div className="ficha_item">
                    <div className="imagen_item">
                    <img src={book.image} className="caratula_img" alt=''/>
                    </div>
                    <div className="datos_item">
                        <div classname="descripcion_item">
                            <h2>{book.summary}</h2>
                            
                        </div>
                        <div className="botones_item">
                            <div className="boton_item">
                                <h3>Cantidad</h3>
                            </div>
                            <div className="boton_item">
                                <h3>Añadir a la cesta</h3>
                            </div>
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