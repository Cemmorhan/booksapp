import { Input } from 'antd';
import { Select} from 'antd';
import { FiSearch } from "react-icons/fi";
import Link from 'next/link';

function Buscador() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
    return (
        <>
            <div className="buscador">
                
                <Input placeholder="Basic usage" />
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

                <Link href="/search">
                    <div className="search">
                        <FiSearch size={30} color='white' />
                    </div>
                </Link>

            </div>
        </>
    )
}
export default Buscador;