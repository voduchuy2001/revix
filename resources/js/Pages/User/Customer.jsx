import EmptyState from "@/Components/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Pencil, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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
import { UpdateUserDialog } from "./Partials/UpdateUserDialog";
import { usePrevious } from "react-use";
import { debounce, pickBy } from "lodash";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Customer() {
    const { customers, filters } = usePage().props;

    const { processing, delete: destroy } = useForm();
    const [values, setValues] = useState({
        search: filters?.search || "",
    });

    const handleDeleteCustomer = (id) => {
        destroy(route("user.destroy", id), {
            onSuccess: () => toast.success("Xóa thành công"),
        });
    };

    const [showUpdateCustomerDialog, setShowUpdateCustomerDialog] =
        useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const handleEditCustomer = (customer) => {
        setShowUpdateCustomerDialog(true);
        setEditingCustomer(customer);
    };

    const prevValues = usePrevious(values);

    const updateQuery = useCallback(
        debounce((query) => {
            router.get(route("customer.index"), query, {
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Danh sách khách hàng
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
                                    <span>Danh sách khách hàng</span>

                                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-between">
                                        <Input
                                            placeholder="Tên khách hàng, số điện thoại"
                                            value={values?.search}
                                            onChange={(e) =>
                                                setValues((prev) => ({
                                                    ...prev,
                                                    search: e.target.value,
                                                }))
                                            }
                                            className="w-full md:max-w-sm"
                                            name="search"
                                            type="search"
                                        />

                                        <Button>
                                            <PlusIcon className="w-4 h-4 mr-2" />
                                            Thêm mới
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader className="bg-secondary rounded-md">
                                        <TableRow>
                                            <TableHead>STT</TableHead>
                                            <TableHead>
                                                Tên khách hàng
                                            </TableHead>
                                            <TableHead>Số điện thoại</TableHead>
                                            <TableHead>Địa chỉ</TableHead>
                                            <TableHead>Hành động</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {customers.length ? (
                                            customers.map((customer, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {customer.name}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {customer.phone_number ||
                                                            "Không có"}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {customer.address ||
                                                            "Không có"}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex space-x-4">
                                                            <Pencil
                                                                className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors"
                                                                onClick={() =>
                                                                    handleEditCustomer(
                                                                        customer
                                                                    )
                                                                }
                                                            />

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
                                                                                handleDeleteCustomer(
                                                                                    customer.id
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
                                                    colSpan={5}
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

            {showUpdateCustomerDialog && (
                <UpdateUserDialog
                    user={editingCustomer}
                    open={showUpdateCustomerDialog}
                    onOpenChange={setShowUpdateCustomerDialog}
                    showTrigger={false}
                />
            )}
        </AuthenticatedLayout>
    );
}
