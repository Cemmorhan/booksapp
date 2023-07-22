import { useState, useEffect } from 'react'
import { InputNumber} from 'antd';
import { Button } from 'antd';
function ObjetoModal({ books, enviarPrecio }) {
    const [isDefined, setIsDefined] = useState(false)
    const [vendible, setVendible] = useState([false])
    const [precioLibro, setPrecioLibro] = useState(0)


    //definir precio del libro
    const precio = (value) => {
        console.log('changed', value);
        if (value > 0) {
            setPrecioLibro(value)
            setVendible(true)
        } else {
            setPrecioLibro(0)
            setVendible(false)
        }
    };
    //mirar si books esta definido

    useEffect(() => {
        console.log("booksinsideobject", books)
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
                    <div className="imagen_item" style={{ objectFit: "scale-down" }}>
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
                            <p>{isDefined && books[0].description}</p>

                        </div>
                        <div className="botones_item">
                            <h4>Precio de venta</h4>
                                <InputNumber
                                    defaultValue={10.50}
                                    addonAfter="€" style={{
                                        width: 90,
                                      }}
                                    onChange={precio}
                                />
                            <Button type="primary" onClick={() => enviarPrecio(precioLibro, vendible) }>
                                vender
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ObjetoModal;