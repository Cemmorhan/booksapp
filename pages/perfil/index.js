import MenuPerfil from "@/components/MenuPerfil";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
export default withPageAuthRequired( function Perfil() {

    return (
        <>
            <div className="contenedor_perfil">
                <div className="menu_selector">
                    <MenuPerfil />
                </div>
                <div className="caja_variable">
                    <h1>Perfil</h1>
                </div>
            </div>
        </>
    );
});