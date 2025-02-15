import InputError from "@/Components/InputError";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Check, File, Plus, Printer } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { CreateCustomerDialog } from "../Customer/Partials/CreateCustomerDialog";

const Create = () => {
    const { customers, technicians } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        device_name: "",
        imei: "",
        repair_cost: "",
        device_status: "",
        note: "",
    });

    const [open, setOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [showCreateCustomerDialog, setShowCreateCustomerDialog] =
        useState(false);

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
                                <div className="grid grid-cols-1 md:grid-cols-10 gap-4 w-full">
                                    {/* Phần chính (4 cột trên desktop, 1 cột trên mobile) */}
                                    <div className="order-2 md:order-1 col-span-1 md:col-span-7">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                            {/* Tên máy */}
                                            <div className="space-y-1">
                                                <Label htmlFor="device_name">
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
                                                    message={errors.device_name}
                                                    className="mt-2"
                                                />
                                            </div>

                                            {/* IMEI */}
                                            <div className="space-y-1">
                                                <Label htmlFor="imei">
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

                                            {/* Chi phí sửa chữa */}
                                            <div className="space-y-1">
                                                <Label htmlFor="repair_cost">
                                                    Chi phí sửa chữa
                                                </Label>
                                                <Input
                                                    id="repair_cost"
                                                    type="text"
                                                    name="repair_cost"
                                                    value={data.repair_cost}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "repair_cost",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={errors.repair_cost}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <Label>Thợ phụ trách</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {technicians.map(
                                                            (technician) => (
                                                                <SelectItem
                                                                    key={`technician-${technician.id}`}
                                                                    value={
                                                                        technician.id
                                                                    }
                                                                >
                                                                    {
                                                                        technician.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Tình trạng máy & Ghi chú (Full width) */}
                                            <div className="col-span-1 md:col-span-2 w-full space-y-4">
                                                <div className="space-y-1">
                                                    <Label htmlFor="status">
                                                        Tình trạng máy
                                                    </Label>
                                                    <Textarea
                                                        id="status"
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="note">
                                                        Ghi chú
                                                    </Label>
                                                    <Textarea
                                                        id="note"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phần "2" (Hiển thị bên phải trên desktop, dưới cùng trên mobile) */}
                                    <div className="order-1 md:order-2 col-span-1 md:col-span-3 w-full">
                                        <div className="space-y-1">
                                            <Label>Khách hàng</Label>
                                            <Popover
                                                open={open}
                                                onOpenChange={setOpen}
                                            >
                                                <PopoverTrigger asChild>
                                                    <div className="space-y-1">
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={open}
                                                            className="w-full"
                                                        >
                                                            {(() => {
                                                                const customer =
                                                                    customers.find(
                                                                        (
                                                                            customer
                                                                        ) =>
                                                                            customer.id.toString() ===
                                                                            selectedCustomer
                                                                    );
                                                                return selectedCustomer
                                                                    ? `${
                                                                          customer.name
                                                                      } - ${
                                                                          customer.phone_number ||
                                                                          "Không có"
                                                                      }`
                                                                    : "";
                                                            })()}
                                                        </Button>
                                                    </div>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                                    <Command>
                                                        <CommandInput />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                Không có
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {customers.map(
                                                                    (
                                                                        customer
                                                                    ) => (
                                                                        <CommandItem
                                                                            key={`customer-${customer.id}`}
                                                                            value={customer.id.toString()}
                                                                            onSelect={(
                                                                                currentValue
                                                                            ) => {
                                                                                setSelectedCustomer(
                                                                                    currentValue ===
                                                                                        selectedCustomer
                                                                                        ? ""
                                                                                        : currentValue
                                                                                );
                                                                                setOpen(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    selectedCustomer ===
                                                                                        customer.id
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {`${
                                                                                customer.name
                                                                            } - ${
                                                                                customer.phone_number ||
                                                                                "Không có"
                                                                            }`}
                                                                        </CommandItem>
                                                                    )
                                                                )}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div
                                            className="my-3 flex cursor-pointer items-center text-sm text-primary hover:text-secondary-foreground hover:underline"
                                            onClick={() =>
                                                setShowCreateCustomerDialog(
                                                    true
                                                )
                                            }
                                        >
                                            <div className="mr-2 h-4 w-4">
                                                <Plus className="h-4 w-4" />
                                            </div>
                                            Thêm khách hàng mới
                                        </div>

                                        <div className="flex items-center justify-end bottom-0 gap-2 my-2">
                                            <Button variant="outline">
                                                <File className="w-4 h-4 mr-1" />
                                                Lưu và thoát
                                            </Button>
                                            <Button>
                                                <Printer className="w-4 h-4 mr-1" />
                                                Lưu và in
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {showCreateCustomerDialog && (
                <CreateCustomerDialog
                    open={showCreateCustomerDialog}
                    onOpenChange={setShowCreateCustomerDialog}
                    showTrigger={false}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Create;
