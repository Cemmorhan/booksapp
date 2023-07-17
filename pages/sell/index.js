
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
        <>
            {contextHolder}
            <div className="content">
                <BuscadorApi setDatabooks={setDatabooks} setBooksMyDB={setBooksMyDB} />
                <div className="results_books" style={{ padding: "10px 20px", width: "100%" }}>

                    {booksInTable.length > 0 ? <Table

                        style={{ width: "100%" }}
                        rowSelection={{
                            type: "radio",
                            ...rowSeletionTable,
                        }}
                        columns={columns}
                        dataSource={booksInTable}
                        expandable={{
                            expandedRowRender: (record) => (<>
                                <p style={{ margin: 0 }}>Resumen:</p>
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    {record.description}
                                </p>
                                <p style={{ margin: 0 }}>ISBN:</p>
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    {record.isbn}
                                </p>
                            </>

                            ),
                            rowExpandable: (record) => record.name !== 'Not Expandable',
                        }}
                    /> : null}

                </div>
                {databooks.length > 0 ? <div style={{ display: "flex", justifyContent: "right", alignItems: "center", flexDirection: "column" }}>
                    <h4>
                        No encuentras el libro? Impórtalo de Google Books y añádelo a tu biblioteca</h4>

                    <Button type="primary" onClick={showMore} style={{ margin: "20px 0px" }}>
                        Mostrar
                    </Button>
                </div> : null}
                <Modal title="Es este tu libro? Véndelo!"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}


                    width={800}
                >
                    {modaldata}
                </Modal>

                <div style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                    <Button type="primary" onClick={Venta}>
                        vender
                    </Button>
                </div>
            </div>
        </>



    )
})