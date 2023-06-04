import { Menu } from 'antd';
import { useState, useEffect } from 'react';


function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type, };
}

const items = [
    getItem('Cuenta', 'grp', null, [
        getItem('Perfil', 'grp1', null, [getItem('Ver perfil', '1'), getItem('Modificar perfil', '2')]),
        getItem('Productos', 'grp2', null, [getItem('Comprados', '3'), getItem('Vendidos', '4')]),
        getItem('Cerrar sesion', '5')], 'group'),
];
const MenuPerfil = () => {
    return (

                    <div className="menu_selector">
                        
                        <Menu
                            defaultSelectedKeys={['0']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={items}
                        />
                        

                    </div>
         
    );
};
export default MenuPerfil;