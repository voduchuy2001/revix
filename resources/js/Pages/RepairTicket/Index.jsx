import { useEffect, useState, useCallback } from "react";
import { usePage, Head, router, Link, useForm } from "@inertiajs/react";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import toast from "react-hot-toast";
import EmptyState from "@/Components/EmptyState";

export default function Index() {
    const { tickets, filters } = usePage().props;
    const now = new Date();
    const [values, setValues] = useState({
        search: filters?.search || "",
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

    const { processing, delete: destroy } = useForm();
    const handleDeleteRepairTicket = (id) => {
        destroy(route("repair_ticket.destroy", id), {
            onSuccess: () => toast.success("Xóa thành công"),
        });
    };

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
                                <CardTitle className="flex flex-col gap-3 text-xl font-semibold">
                                    <span>
                                        Danh sách phiếu tiếp nhận sửa chữa
                                    </span>

                                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-between">
                                        <Input
                                            placeholder="Tên khách hàng, số điện thoại"
                                            value={values?.search}
                                            onChange={handleChange}
                                            className="w-full md:max-w-sm"
                                            name="search"
                                            type="search"
                                        />

                                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
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
                                                className="md:min-w-[200px]"
                                            />

                                            <Link
                                                href={route(
                                                    "repair_ticket.create"
                                                )}
                                                className="text-sm bg-primary text-secondary flex items-center py-2 px-4 rounded-md border border-input shadow-sm hover:bg-accent hover:text-accent-foreground w-full md:w-auto justify-center"
                                            >
                                                <Plus className="mr-2 w-4 h-4" />
                                                Thêm mới
                                            </Link>
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader className="bg-secondary rounded-md">
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
                                        {tickets?.length ? (
                                            tickets.map((ticket) => (
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
                                                                {
                                                                    ticket
                                                                        .device
                                                                        .name
                                                                }
                                                            </span>
                                                            <span className="text-mute-foreground">
                                                                {
                                                                    ticket
                                                                        .device
                                                                        .code
                                                                }
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatMoney(
                                                            ticket.amount
                                                        )}
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
                                                            <AlertDialog>
                                                                <AlertDialogTrigger
                                                                    asChild
                                                                >
                                                                    <Trash className="h-4 w-4 cursor-pointer text-destructive hover:text-red-600 transition-colors" />
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Bạn
                                                                            có
                                                                            chắc
                                                                            chắn?
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Hành
                                                                            động
                                                                            này
                                                                            không
                                                                            thể
                                                                            hoàn
                                                                            tác.
                                                                            Phiếu
                                                                            sẽ
                                                                            bị
                                                                            xóa
                                                                            vĩnh
                                                                            viễn.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Hủy
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            disabled={
                                                                                processing
                                                                            }
                                                                            onClick={() =>
                                                                                handleDeleteRepairTicket(
                                                                                    ticket.id
                                                                                )
                                                                            }
                                                                        >
                                                                            Xóa
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={8}
                                                    className="text-center py-6 text-gray-500"
                                                >
                                                    <EmptyState />
                                                </TableCell>
                                            </TableRow>
                                        )}
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
