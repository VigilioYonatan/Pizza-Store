<script lang="ts" setup>
import UsersIcon from "@heroicons/vue/24/outline/UsersIcon";
import MagnifyingGlassIcon from "@heroicons/vue/24/outline/MagnifyingGlassIcon";
import PencilSquareIcon from "@heroicons/vue/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/vue/24/outline/TrashIcon";
import BASE_URL from "~/lib/axios";
import { formatDate } from "~/lib/helpers";
import { watch, h  } from "vue";
import { useQuery } from "@vigilio/vue-fetching";
import { useTable, type Columns } from "@vigilio/vue-table";
import {
    type ProductsPaginatorAPI,
    type ProductPaginator,
} from "../apis/products.paginator.api";
const PRODUCTS_COLUMNS: Columns<ProductPaginator, "actions"> = [
    { key: "id" ,cell:(val)=>String(val.id)},
    { key: "name", header: "nombre" },
    { key: "price", header: "precio" },
    {
        key: "createdAt",
        header: "creado",
        cell: (val) => formatDate(val.createdAt),
    },
    {
        key: "actions",
        header: "acciones",
        cell:()=> {
            return h("div", { class: "flex gap-2 items-center" }, [
                h(
                    "button",
                    {
                     
                        onClick:  () => {
                            console.log('hi')
                        },
                
                        class: "bg-orange-600 flex items-center gap-1 px-4 py-1 text-white rounded-md",
                    },
                    [
                        h(PencilSquareIcon, { class: "text-white w-4 h-4" }),
                        "Editar",
                    ]
                ),
                h(
                    "a",
                    {
                        href: "/",
                        class: "bg-danger flex items-center gap-1 px-4 py-1 text-white rounded-md", // onClick: clicked,
                    },
                    [h(TrashIcon, { class: "text-white w-4 h-4" }), "Eliminar"]
                ),
            ]);
        },
    },
];
const { table, pagination, updateData } = useTable({
    columns: PRODUCTS_COLUMNS,
});
const {  refetch } = useQuery(
    "/paginator/products",
    async function (url: string) {
        const params = new URLSearchParams();
        params.append("offset", String(pagination.pagination.offset));
        params.append("limit", String(pagination.pagination.limit));
        // for (const [key, value] of Object.entries(sort.sort)) {
        //     data.append(key, value);
        // }
        const { data } = await BASE_URL.get<ProductsPaginatorAPI>(
            `${url}?${params}`
        );
        return data;
    },
    {
        onSuccess(data) {
            updateData(data.data, { count: data.total });
        },
    }
);

watch([pagination.page, () => pagination.pagination.limit ],()=>{
    refetch();
},{deep:true})

</script>
<template>
    <div
        class="flex-1 min-w-[200px] flex flex-col gap-4 bg-white col-span-3 p-4 rounded-md"
    >
        <div class="flex justify-between">
            <div class="">
                <p class="font-semibold capitalize text-2xl">Productos</p>
                <p class="text-secondary-dark text-sm">31 productos</p>
            </div>
            <div class="p-2 rounded-full bg-primary bg-opacity-20">
                <UsersIcon class="w-8 h-8 text-primary" />
            </div>
        </div>
        <div class="">
            <p class="text-2xl font-bold"></p>
        </div>

        <div class="relative overflow-x-auto sm:rounded-lg">
            <div
                class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900"
            >
                <select class="px-4 py-1 rounded-md border border-gray-300">
                    <option>Option</option>
                    <option>Option</option>
                    <option>Option</option>
                </select>
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div
                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                        <MagnifyingGlassIcon class="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users"
                    />
                </div>
            </div>
            <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
                <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3"
                            v-for="{ value,key } in table.Thead()"
                        >
                            <template v-if="typeof value === 'string'">{{ value }}</template>
                            <component  v-else :is="value"/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="{ ...data } in table.TBody.Row()"
                        :key="data.index"
                    >
                        <td
                            class="px-6 py-4"
                            v-for="{ key, value } in table.TBody.Cell(data)"
                            :key="key"
                        >
                            <template v-if="typeof value === 'string'">{{ value }}</template>
                            <component  v-else :is="value"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
   
</template>
