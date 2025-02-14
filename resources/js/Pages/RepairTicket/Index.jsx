import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function Index() {
    const { tickets } = usePage().props;
    const { get } = useForm();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedSearch.trim() !== "") {
            get(
                route("repair_ticket.index"),
                { search: debouncedSearch },
                { preserveState: true }
            );
        }
    }, [debouncedSearch]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tiếp nhận sửa chữa
                </h2>
            }
        >
            <Head title="Tiếp nhận sửa chữa" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Danh sách phiếu tiếp nhận sửa chữa
                                </CardTitle>
                                <CardDescription>
                                    Phiếu tiếp nhận sửa chữa từ ngày - ngày
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Tên khách hàng, số điện thoại"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    className="max-w-sm"
                                />

                                <Table className="my-4">
                                    <TableCaption>
                                        Danh sách các phiếu tiếp nhận sửa chữa
                                    </TableCaption>
                                    <TableHeader className="bg-secondary">
                                        <TableRow>
                                            <TableHead>Số phiếu</TableHead>
                                            <TableHead>
                                                Tên khách hàng
                                            </TableHead>
                                            <TableHead>Số điện thoại</TableHead>
                                            <TableHead>Thiết bị</TableHead>
                                            <TableHead>Ngày lập</TableHead>
                                            <TableHead>Cập nhật</TableHead>
                                            <TableHead>Hành động</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tickets?.map((ticket) => (
                                            <TableRow key={ticket.code}>
                                                <TableCell className="font-medium">
                                                    {ticket.code}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {ticket.customer.name}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.customer
                                                        .phone_number ||
                                                        "Không có"}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.device.name}
                                                    {ticket.device.code}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.created_at}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.updated_at}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter></TableFooter>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
