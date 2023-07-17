
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import BuscadorApi from "../../components/BuscadorApi"
import { Divider, Radio, Table } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { message, Button, Modal } from 'antd';/* 
import { useFileSystemPublicRoutes } from '@/next.config'; */
import  ObjetoModal  from "../../components/ObjetoModal";


export default withPageAuthRequired(function sell(props) {
    const { user, error, isLoading } = useUser();
    const [renderizado, setRenderizado] = useState(false);
    const [databooks, setDatabooks] = useState([]);
    const [book, setBook] = useState(undefined);
    const [booksMyDB, setBooksMyDB] = useState([]);
    const [booksInTable, setBooksInTable] = useState([]);
    const [showMoreBooks, setShowMoreBooks] = useState(false);
    const [modaldata, setModaldata] = useState([]);



    return (
       <div>
        holav
       </div>


    )
})