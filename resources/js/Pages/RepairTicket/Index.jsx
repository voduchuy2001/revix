import { useEffect, useState, useCallback } from "react";
import { usePage, Head, router, Link } from "@inertiajs/react";
import { pickBy, debounce } from "lodash";
import { usePrevious } from "react-use";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { formatDate, formatMoney } from "@/utils/format";
import { Pencil, Plus, Printer, Trash } from "lucide-react";
import { DateRange } from "@/Components/DateRange";
import { endOfMonth, startOfMonth } from "date-fns";

export default function Index() {
    const { tickets, filters } = usePage().props;
    const now = new Date();
    const [values, setValues] = useState({
        search: filters?.search,
        from: filters?.from || startOfMonth(now),
        to: filters?.to || endOfMonth(now),
    });

    const prevValues = usePrevious(values);

    const updateQuery = useCallback(
        debounce((query) => {
            router.get(route("repair_ticket.index"), query, {
                replace: true,
                preserveState: true,
            });
        }, 500),
        []
    );

    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : { remember: "forget" };
            updateQuery(query);
        }
    }, [values, updateQuery]);

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

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
                                <CardTitle className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-4 text-xl font-semibold">
                                    <span>
                                        Danh sách phiếu tiếp nhận sửa chữa
                                    </span>
                                    <DateRange
                                        defaultValue={{
                                            from: values?.from,
                                            to: values?.to,
                                        }}
                                        onChange={(range) => {
                                            setValues((prev) => ({
                                                ...prev,
                                                from: range?.from || "",
                                                to: range?.to || "",
                                            }));
                                        }}
                                        className="min-w-[200px]"
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-4 text-xl font-semibold">
                                    <Input
                                        placeholder="Tên khách hàng, số điện thoại"
                                        value={values?.search}
                                        onChange={handleChange}
                                        className="max-w-sm"
                                        name="search"
                                        type="search"
                                    />

                                    <Link className="text-sm flex items-center py-1 px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                                        <Plus className="mr-2 w-4 h4" />
                                        Thêm mới
                                    </Link>
                                </div>

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
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">
                                                            {ticket.device.name}
                                                        </span>
                                                        <span className="text-mute-foreground">
                                                            {ticket.device.code}
                                                        </span>
                                                    </div>
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
