
import Scroll from '@/components/Scroll';
import Recomendados from '@/components/Recomendados';
import Buscador from '@/components/Buscador';

export default function Home() {


  return (
    <>
      <div className="content">
        <Buscador />
        <Scroll titulo='Mas vendidos' />
        <Scroll titulo='Ultimos añadidos' />
        <Scroll titulo='Especial para tí' />
        <Recomendados titulo='Recomendados' />
      </div >
      {/*       <div className="footer">
        <h1>Esto es el footer</h1>
      </div> */}
    </>
  )
}
