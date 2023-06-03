import { useState, useEffect } from 'react'
function Objeto({books}) {
    const [isDefined, setIsDefined] = useState(false)
    
    useEffect(() => {
        if (books!==undefined && books.length>0) {
          setIsDefined(true)
        }else{
          setIsDefined(false)
        }
      }, [books])

    return (
        <>
            <div className="content_item">
                <div className="titulo_item">
                    <h1>{isDefined && books[0].title}</h1>
                </div>
                <div className="ficha_item">
                    <div className="imagen_item">
                    <img src={isDefined && books[0].image} className="caratula_img" alt=''/>
                    </div>
                    <div className="datos_item">
                        <div className="descripcion_item">
                        <h2>{isDefined && books[0].title}</h2>
                            <h3>{isDefined && books[0].summary}</h3>
                            
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