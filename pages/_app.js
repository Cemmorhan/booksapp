import '@/styles/globals.css'
import MyMenu from '../components/MyMenu.js'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [usuarioAdquirido, setUsuarioAdquirido] = useState(false);

  return (
    <UserProvider>
    <div className="mainContainer">
    <MyMenu user={usuarioAdquirido} />
    <Component {...pageProps} setUsuarioAdquirido={setUsuarioAdquirido} usuarioAdquirido={usuarioAdquirido} />
    </div>
     </UserProvider>
   )
}
