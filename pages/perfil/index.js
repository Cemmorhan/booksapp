
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import { Tabs } from 'antd';
import { Descriptions } from 'antd';
import Ventas from "@/components/Ventas";
import { useEffect } from 'react';
import { useState } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
  } from 'antd';

export default withPageAuthRequired(function Perfil() {
    const { user, error, isLoading } = useUser();
    const [userDB, setUserDB] = useState([]);
    const [renderizado, setRenderizado] = useState(false);


    const getUsers = async () => {
        if (!user) return;
        const send = { user_id: user.sub };
        const results = await fetch("/api/getuser", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        setUserDB(newResults);
    };

    const updateUsers = async () => {
        if (!user) return;
        const send = {
            user_id: user.sub,
            set: {
                monedero: { phone: "myphone" }
            },
            push: {
                "historial.compras": {
                    id: "id3",
                    fecha: "fecha3",
                    precio: "precio3",
                    titulo: "titulo3",
                    url: "url3",
                }
            },
            inc: { saldo: 1200 }

        };
        const results = await fetch("/api/updateuser", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        setUserDB(newResults);
    };
    const App = () => {
        const [componentSize, setComponentSize] = useState('default');
        const onFormLayoutChange = ({ size }) => {
          setComponentSize(size);
        };
        return (
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item label="Input">
              <Input />
            </Form.Item>
            <Form.Item label="Button">
              <Button onClick={updateCajon} >subir cajon</Button>
            </Form.Item>
          </Form>
        );
      };


    const items = [
        {
            key: '1',
            label: `Perfil`,
            children:
                <Descriptions title="User Info">
                    <Descriptions.Item ><img src={user.picture} alt=""></img></Descriptions.Item>
                    <Descriptions.Item label="UserName">{user.nickname}</Descriptions.Item>
                    <Descriptions.Item label="Correo">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="UserUD">{user.sub}</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>
            ,
        },
        {
            key: '2',
            label: `Historial`,
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: `Ventas`,
            children: <Ventas ></Ventas>,
        },
    ];
    function updateCajon() {

    }

    function setSaldo() {
        console.log("setSaldo");
        updateUsers();
    }

    useEffect(() => {
        setRenderizado(true);
    }, []);

    useEffect(() => {
        if (renderizado) {
            getUsers();
        }
    }, [renderizado]);

    useEffect(() => {
        console.log(userDB);
    }, [userDB]);


    return (
        <>
            <div className="content">
                <div className="tabsperfil">
                    <Tabs defaultActiveKey="1" items={items} size="large" />
                </div>
                <button onClick={setSaldo}>Subir saldo</button>
                <App></App>


            </div >
        </>
    );
});