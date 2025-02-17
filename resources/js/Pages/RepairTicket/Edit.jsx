import InputError from "@/Components/InputError";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { File, Plus } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { formatMoney } from "@/utils/format";
import { UpdateUserDialog } from "@/Pages/User/Partials/UpdateUserDialog.jsx";
import toast from "react-hot-toast";

const Edit = () => {
    const { ticket, technicians } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        device_name: ticket.device.name,
        imei: ticket.device.code,
        amount: ticket.amount,
        condition: ticket.condition,
        note: ticket.note,
        technician: ticket.technician.id.toString(),
        action: false,
        customer: ticket.customer.id.toString(),
    });

    const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        put(
            route("repair_ticket.update", { id: ticket.id }),
            toast.success("Cập nhật thành công")
        );
    };

    const handleAmountChange = (value) => {
        const numericValue = Number(value.replace(/,/g, "").replace(/\D/g, ""));
        setData({ ...data, amount: numericValue });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Thêm phiếu tiếp nhận sửa chữa
                </h2>
            }
        >
            <Head title="Thêm phiếu tiếp nhận sửa chữa" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex flex-col gap-3 text-xl font-semibold">
                                    Thông tin tiếp nhận
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit}>
                                    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 w-full">
                                        <div className="order-2 md:order-1 col-span-1 md:col-span-7">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="device_name"
                                                        required={true}
                                                    >
                                                        Tên máy
                                                    </Label>
                                                    <Input
                                                        id="device_name"
                                                        type="text"
                                                        name="device_name"
                                                        value={data.device_name}
                                                        className="mt-1 block w-full"
                                                        onChange={(e) =>
                                                            setData(
                                                                "device_name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.device_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="imei"
                                                        required={true}
                                                    >
                                                        IMEI máy
                                                    </Label>
                                                    <Input
                                                        id="imei"
                                                        type="text"
                                                        name="imei"
                                                        value={data.imei}
                                                        className="mt-1 block w-full"
                                                        onChange={(e) =>
                                                            setData(
                                                                "imei",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <InputError
                                                        message={errors.imei}
                                                        className="mt-2"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="amount"
                                                        required={true}
                                                    >
                                                        Chi phí sửa chữa
                                                    </Label>
                                                    <Input
                                                        id="amount"
                                                        type="text"
                                                        name="amount"
                                                        value={formatMoney(
                                                            data.amount
                                                        )}
                                                        className="mt-1 block w-full"
                                                        onChange={(e) =>
                                                            handleAmountChange(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <InputError
                                                        message={errors.amount}
                                                        className="mt-2"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="technician"
                                                        required={true}
                                                    >
                                                        Thợ phụ trách
                                                    </Label>
                                                    <Select
                                                        value={data.technician}
                                                        name="technician"
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            setData(
                                                                "technician",
                                                                value
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {technicians.map(
                                                                (
                                                                    technician
                                                                ) => (
                                                                    <SelectItem
                                                                        key={`technician-${technician.id}`}
                                                                        value={technician.id.toString()}
                                                                    >
                                                                        {
                                                                            technician.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError
                                                        message={
                                                            errors.technician
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>

                                                <div className="col-span-1 md:col-span-2 w-full space-y-4">
                                                    <div className="space-y-1">
                                                        <Label
                                                            htmlFor="condition"
                                                            required={true}
                                                        >
                                                            Tình trạng máy
                                                        </Label>
                                                        <Textarea
                                                            value={
                                                                data.condition
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "condition",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            id="condition"
                                                            className="w-full"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.condition
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="space-y-1">
                                                        <Label htmlFor="note">
                                                            Ghi chú
                                                        </Label>
                                                        <Textarea
                                                            value={data.note}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "note",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            id="note"
                                                            className="w-full"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.note
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="order-1 md:order-2 col-span-1 md:col-span-3 w-full">
                                            <div className="space-y-1">
                                                <Label
                                                    htmlFor="customer"
                                                    required={true}
                                                >
                                                    Khách hàng
                                                </Label>

                                                <div className="grid flex-1 text-left text-sm leading-tight">
                                                    <span className="truncate font-semibold">
                                                        {ticket.customer.name}
                                                    </span>

                                                    <span className="truncate">
                                                        {
                                                            ticket.customer
                                                                .phone_number
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            ticket.customer
                                                                .address
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div
                                                className="my-3 flex cursor-pointer items-center text-sm text-primary hover:text-secondary-foreground hover:underline"
                                                onClick={() =>
                                                    setShowUpdateUserDialog(
                                                        true
                                                    )
                                                }
                                            >
                                                <div className="mr-2 h-4 w-4">
                                                    <Plus className="h-4 w-4" />
                                                </div>
                                                Cập nhật thông tin khách hàng
                                            </div>

                                            <div className="flex flex-wrap md:flex-nowrap items-center bottom-0 gap-2 my-2 w-full">
                                                <Button
                                                    disabled={processing}
                                                    className="flex-1"
                                                    type="submit"
                                                >
                                                    <File className="w-4 h-4 mr-1" />
                                                    Lưu
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {showUpdateUserDialog && (
                <UpdateUserDialog
                    user={ticket.customer}
                    open={showUpdateUserDialog}
                    onOpenChange={setShowUpdateUserDialog}
                    showTrigger={false}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Edit;
