

function Recomendados({ titulo }) {
  console.log(titulo)
  return (
    <>
      <div className="seccion_recomendados">
        <div className="selector_title">
          <h3>{titulo}</h3>
        </div>
        <div className="contenedor_recomendados">
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>
          <div className="caratulas">
          </div>


        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/recomendados')
  const titulo = await res.json()
  return {
    props: {
      titulo
    }
  }
}

export default Recomendados;