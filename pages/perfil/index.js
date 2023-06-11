
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import { Tabs } from 'antd';
import { Descriptions } from 'antd';
import Ventas from "@/components/Ventas";

export default withPageAuthRequired(function Perfil() {
    const { user, error, isLoading } = useUser();
    if (error) {
        return <div>{error.message}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(user);
    const onChange = (key) => {
        console.log(key);
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
            children: <Ventas></Ventas>,
        },
    ];
    return (
        <>
            <div className="content">
                <div className="tabsperfil">
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
                </div>
            </div>
        </>
    );
});