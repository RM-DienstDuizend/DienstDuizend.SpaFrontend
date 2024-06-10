import { ResourceProps } from "@refinedev/core"

const resources: ResourceProps[] = [
    {
        name: "businesses",
        list: "/businesses",
        create: "/businesses/create",
        edit: "/businesses/edit/:id",
        show: "/businesses/show/:id",
        meta: {
            canDelete: true,
        },
    },
]


export default resources;