

function Scroll({ titulo }) {
  console.log(titulo)
  return (
    <>
      <div className="selector_scroll">
        <div className="selector_title">
          <h3>{titulo}</h3>
        </div>
        <div className="scrollX">
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
  const res = await fetch('http://localhost:3000/index')
  const titulo = await res.json()
  return {
    props: {
      titulo
    }
  }
}

export default Scroll;