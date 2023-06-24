import BuscadorApi from "@/components/BuscadorApi"
import { Divider, Radio, Table } from 'antd';
import { useEffect, useState } from 'react';


export default function About() {
    const [databooks, setDatabooks] = useState([]);
    const [librostest, setLibrostest] = useState([]);



    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Autor',
            dataIndex: 'author',
        },
        {
            title: 'Idioma',
            dataIndex: 'language',
        }
    ];
    

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    return (

        <div className="content">
            <BuscadorApi setDatabooks={setDatabooks}/>

            <div className="results_books" style={{ padding: "10px 20px", width: "100%" }}>

                {databooks.length > 0 ? <Table
                    style={{ width: "100%" }}
                    rowSelection={{
                        type: "radio",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={databooks}
                    expandable={{
                        expandedRowRender: (record) => (<>
                            <p style={{ margin: 0 }}>Resumen:</p>
                          <p
                            style={{
                              margin: 0,
                            }}
                          >
                            {record.description}
                          </p></>
                        ),
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                      }}
                /> : null}

            </div>
        </div>


    )
}