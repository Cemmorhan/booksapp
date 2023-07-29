import { useState, useEffect } from 'react'
import { Select } from 'antd';
function Objeto({ books, itembookHistorial }) {
    const [isDefined, setIsDefined] = useState(false)
    const [options, setOptions] = useState([])
    const [cantidad, setCantidad] = useState(0)

    //cosas select
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    useEffect(() => {
        if (itembookHistorial !== undefined && itembookHistorial.length > 0) {
            setCantidad(itembookHistorial.length)
            setOptions(itembookHistorial.map((bookshistorial, index) => {
                return { 
                    value: bookshistorial._id, 
                    label: bookshistorial.envio != undefined ? bookshistorial.price + " €" + " + " + bookshistorial.envio + " € de envío" : bookshistorial.price, 
                    key: index, 
                }
            }
            ))
        }else{
            setCantidad(0)
        }
    }, [itembookHistorial])

    useEffect(() => {
        console.log("options", options)
    }, [options])

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
                    <div className="imagen_item" style={{ objectFit: "scale-down" }}>
                        <img src={isDefined && books[0].image.thumbnail != undefined ? books[0].image.thumbnail : "Imagen"} className="caratula_img" alt='' />
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
                            <div className="boton_item" >
                                <h3>En venta: <span style={{color:cantidad>0?"green":"red"}}>{cantidad}</span></h3>
                            </div>
                            <Select
                                style={{ width: 200 }}
                                showSearch
                                placeholder="Opciones"
                                onChange={onChange}
                                options={options}
                            />

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