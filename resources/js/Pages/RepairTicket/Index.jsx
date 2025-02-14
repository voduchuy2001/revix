import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { formatDate, formatMoney } from "@/utils/format";
import { useDebounce } from "@/hooks/useDebounce";
import { Pencil, Printer, Trash } from "lucide-react";
import { DateRange } from "@/Components/DateRange";

export default function Index() {
    const { tickets, fromDate, toDate } = usePage().props;
    const { get } = useForm();
    const [keyword, setKeyword] = useState("");
    const debouncedSearch = useDebounce(keyword, 500);

    useEffect(() => {
        if (debouncedSearch !== "") {
            get(
                route("repair_ticket.index"),
                { search: debouncedSearch, fromDate, toDate },
                { preserveState: true, replace: true }
            );
        }
    }, [debouncedSearch, fromDate, toDate, get]);

    const [selectedFromDate, setSelectedFromDate] = useState("");
    const [selectedToDate, setSelectedToDate] = useState("");
    const handleDateChange = (data) => {
        setSelectedFromDate(data?.from);
        setSelectedToDate(data?.to);
    };

    useEffect(() => {
        if (selectedFromDate && selectedToDate) {
            console.log("from date after update: ", selectedFromDate);
            console.log("to date after update: ", selectedToDate);
        }
    }, [selectedFromDate, selectedToDate]);

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
                                <CardTitle className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 p-4 text-xl font-semibold">
                                    <span className="text-center md:text-left">
                                        Danh sách phiếu tiếp nhận sửa chữa
                                    </span>
                                    <DateRange
                                        onChange={handleDateChange}
                                        className="min-w-[200px]"
                                    />
                                </CardTitle>

                                <CardDescription>
                                    Phiếu tiếp nhận sửa chữa từ ngày - ngày
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="Tên khách hàng, số điện thoại"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="max-w-sm"
                                    name="keyword"
                                />

                                <Table className="my-4">
                                    <TableHeader className="bg-secondary">
                                        <TableRow>
                                            <TableHead>Số phiếu</TableHead>
                                            <TableHead>
                                                Tên khách hàng
                                            </TableHead>
                                            <TableHead>Số điện thoại</TableHead>
                                            <TableHead>Thiết bị</TableHead>
                                            <TableHead>Giá</TableHead>
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
                                                    {formatMoney(ticket.amount)}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(
                                                        ticket.created_at
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(
                                                        ticket.updated_at
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-4">
                                                        <Printer className="h-4 w-4 cursor-pointer text-primary hover:text-blue-600 transition-colors" />
                                                        <Pencil className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors" />
                                                        <Trash className="h-4 w-4 cursor-pointer text-destructive hover:text-red-600 transition-colors" />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
