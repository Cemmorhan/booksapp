import { Input } from 'antd';
import { Select, Space } from 'antd';
import { FiSearch } from "react-icons/fi";
import Link from 'next/link';

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
          <div className="selector_title">
            <h3>Más vendidos</h3>
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

        <div className="selector_scroll">
          <div className="selector_title">
            <h3>Ultimos añadidos</h3>
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

        <div className="selector_scroll">
          <div className="selector_title">
            <h3>Especial para tí</h3>
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


        <div className="seccion_recomendados">
          <div className="selector_title">
            <h3>Recomendados</h3>
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

      </div >
      {/*       <div className="footer">
        <h1>Esto es el footer</h1>
      </div> */}
    </>
  )
}
