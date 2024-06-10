import {
    DateField,
    DeleteButton,
    EditButton,
    List,
    MarkdownField,
    ShowButton, useSimpleList,
    useTable,
} from "@refinedev/antd";
import {Avatar, List as AntdList} from "antd"
import {BaseRecord, useNavigation, useResource, useResourceParams, useRouterContext} from "@refinedev/core";
import { Space, Typography } from "antd";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import {IBusiness} from "../../models/IBusiness";

const {Title} = Typography;



export const BusinessList = () => {

    const { listProps } = useSimpleList<IBusiness>({
        syncWithLocation: true
    });

    const { show } = useNavigation();
    const { resource } = useResourceParams();



    const renderItem = ({id, name, description}: IBusiness) => {
        console.log(resource)
        return (
            <AntdList.Item style={{backgroundColor: "white", cursor: "pointer"}} onClick={() => resource && show(resource.name, id)}>
                <AntdList.Item.Meta
                    avatar={<img src={`https://api.dicebear.com/8.x/icons/svg?seed=${name}&size=120`}  alt={name}/>}
                    title={<Title level={5}>{name}</Title>}
                    description={description}

                />
            </AntdList.Item>
        );
    };


  return (
    <List>
        <AntdList
            {...listProps}
            bordered
            renderItem={renderItem}
            pagination={{
                ...listProps.pagination,
                align: "center"
            }}
        />
    </List>
  );
};
