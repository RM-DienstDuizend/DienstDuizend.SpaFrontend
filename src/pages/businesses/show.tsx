import {
    DateField, DeleteButton, EditButton, List,
    MarkdownField,
    NumberField,
    Show, ShowButton,
    TextField, UrlField, useSimpleList, useTable,
} from "@refinedev/antd";
import {BaseRecord, useOne, useResourceParams, useShow} from "@refinedev/core";
import {Space, Table, Typography} from "antd";
import {IBusiness} from "../../models/IBusiness";
import {IService} from "../../models/IService";

const {Title} = Typography;

export const BusinessShow = () => {
    const {queryResult} = useShow<IBusiness>({});
    const {data: queryData, isLoading} = queryResult;

    const {id} = useResourceParams();


    const {tableProps} = useTable<IService>({
        resource: `businesses/${id}/services`
    });

    const resource = queryData?.data;

    return (
        <Space direction="vertical" size="large" style={{width:'100%'}}>
            <Show title={resource?.name} breadcrumb={null} headerButtons={() => <></>} canDelete={false} canEdit={false}
                  isLoading={isLoading}>
                <Title level={5}>{"Description"}</Title>
                <MarkdownField value={resource?.description ?? ""}/>
                <Title level={5}>{"Kvk Number"}</Title>
                <TextField value={resource?.kvkNumber}/>
                <Title level={5}>{"Website Url"}</Title>
                {resource?.websiteUri ? <UrlField value={resource?.websiteUri}/> : "-"}
            </Show>

            <List title={"Services"} breadcrumb={null} headerButtons={() => <></>}>
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="title" title={"Title"}/>
                    <Table.Column
                        dataIndex="price"
                        title={"Price"}
                        render={(value: number) => {
                            if (!value) return "-";
                            return <TextField value={`€${value}`}/>;
                        }}
                    />
                </Table>
            </List>
        </Space>
    );
};
