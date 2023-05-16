import { Input } from 'antd';
import { Select, Space } from 'antd';
import { FiSearch } from "react-icons/fi";
import Link from 'next/link';
import Scroll from '@/components/Scroll';
import Recomendados from '@/components/Recomendados';

export default function Home() {

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


  return (
    <>
      <div className="content">
        <div className="buscador">
        <Select
            defaultValue="lucy"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'Yiminghe',
                label: 'yiminghe',
              },
              {
                value: 'disabled',
                label: 'Disabled',
                disabled: true,
              },
            ]}
          />
          
          <Input placeholder="Basic usage" />

        <Link href="/search">
          <div className="search">
          <FiSearch size={30} color='white' />
          </div>
        </Link>

        </div>
        <div className="selector_scroll">
          <Scroll 
          titulo='Mas vendidos'/>
        </div>

        <div className="selector_scroll">
          <Scroll 
          titulo='Ultimos añadidos'/>
        </div>

        <div className="selector_scroll">
          <Scroll 
          titulo='Especial para tí'/>
        </div>


        <div className="seccion_recomendados">
          <Recomendados 
          titulo='Recomendados'/>
        </div>

      </div >
      {/*       <div className="footer">
        <h1>Esto es el footer</h1>
      </div> */}
    </>
  )
}
