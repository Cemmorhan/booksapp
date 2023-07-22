
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import { Tabs } from 'antd';
import { Descriptions } from 'antd';
import Ventas from "@/components/Ventas";
import { useEffect } from 'react';
import { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    message
} from 'antd';



export default withPageAuthRequired(function Perfil(props) {
    const { user, error, isLoading } = useUser();
    const [renderizado, setRenderizado] = useState(false);
    const items = [
        {
            key: '1',
            label: `Perfil`,
            children:
                <Descriptions title="User Info">
                    <Descriptions.Item ><img src={user.picture} alt=""></img></Descriptions.Item>
                    <Descriptions.Item label="Nombre de usuario">{props.usuarioAdquirido.nickname}</Descriptions.Item>
                    <Descriptions.Item label="Nombre">{props.usuarioAdquirido.name} {props.usuarioAdquirido.lastname}  </Descriptions.Item>
                    <Descriptions.Item label="Correo">{props.usuarioAdquirido.email}</Descriptions.Item>
                    <Descriptions.Item label="Address">{props.usuarioAdquirido.address}  {props.usuarioAdquirido.zip}  {props.usuarioAdquirido.city}  {props.usuarioAdquirido.state}  {props.usuarioAdquirido.country}</Descriptions.Item>
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
    //metodo post para recuperar datos o crear usuario
    const getUsers = async () => {
        if (!user) return;
        const send = { user_id: user.sub, user_email: user.name };
        const results = await fetch("/api/getuser", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        props.setUsuarioAdquirido(newResults[0]);
    };
    //actualizar datos usuario
    const updateUsers = async (values) => {
        if (!user) return;
        const send = {
            user_id: user.sub,
            set: values.set === undefined ? {} : values.set,
            push: values.push === undefined ? {} : values.push,
            inc: values.inc === undefined ? {} : values.inc,
        };
        const results = await fetch("/api/updateuser", {
            method: "POST",
            body: JSON.stringify(send),
        }).then((response) => response.json());
        const newResults = results.map((result) => {
            return { ...result }
        });
        props.setUsuarioAdquirido(newResults);
    };

    function setSaldo() {
        console.log("setSaldo");
        updateUsers({ inc: { saldo: 1000 } });
    }

    useEffect(() => {
        setRenderizado(true);
    }, []);

    useEffect(() => {setIsModalOpen
        if (renderizado) {
            getUsers();
        }
    }, [renderizado]);

    useEffect(() => {
        console.log(props.usuarioAdquirido);
    }, [props.usuarioAdquirido]);





    // Parte del formulario
    const onFinish = (values) => {
        console.log('Success:', values);
        updateUsers({ set: values });
        setIsModalOpen(false);
        successMessage();



    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        errorMessage();
    };

    //parte modal

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    // messages
    const [messageApi, contextHolder] = message.useMessage();
    const successMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };
    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        });
    };


    return (
        <>
            {contextHolder}
            <div className="content">
                <div className="tabsperfil">
                    <Tabs defaultActiveKey="1" items={items} size="large" />
                    <div className='tabsbotton'>
                        <Button type="primary" onClick={showModal}>
                            Editar perfil      </Button>
                    </div>
                </div>
                <button onClick={setSaldo}>Subir saldo</button>
                <br></br>
                <Modal title="Editar perfil"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}


                    width={800}
                >
                    <Form

                        name="basic"

                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues=
                        {
                            {
                                name: props.usuarioAdquirido.name,
                                lastname: props.usuarioAdquirido.lastname,
                                address: props.usuarioAdquirido.address,
                                city: props.usuarioAdquirido.city,
                                country: props.usuarioAdquirido.country,
                                state: props.usuarioAdquirido.state,
                                zip: props.usuarioAdquirido.zip,



                            }
                        }
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >


                        <Form.Item
                            label="Nombre de usuario"
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Por favor, introduzca su nombre de usuario!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Nombre"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Por favor, introduzca su nombre!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Apellido"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Por favor, introduzca su apellido!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Dirección"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Por favor, introduzca su direccion de residencia!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="País"
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Por favor, introduzca su país de residencia!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Comunidad autónoma"
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Por favor, introduzca su comunidad autonoma de residencia!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Ciudad"
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Por favor, introduzca su ciudad de residencia!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item
                            label="Código postal"
                            name="zip"
                            rules={[
                                {
                                    required: true,
                                    message: '¡Por favor, introduzca su codigo postal!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <br></br>
                        <div style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Guardar cambios
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>


            </div >
        </>
    );
});