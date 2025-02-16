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
import { CreateUserDialog } from "../User/Partials/CreateUserDialog";
import { formatMoney } from "@/utils/format";

const Create = () => {
    const { customers, technicians } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        device_name: "",
        imei: "",
        amount: "",
        condition: "",
        note: "",
        technician: "",
        customer: "",
        action: false,
    });

    const [openComboboxCustomer, setOpenComboboxCustomer] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route("repair_ticket.store"));
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
                                                <Popover
                                                    open={openComboboxCustomer}
                                                    onOpenChange={
                                                        setOpenComboboxCustomer
                                                    }
                                                >
                                                    <PopoverTrigger asChild>
                                                        <div className="space-y-1">
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={
                                                                    openComboboxCustomer
                                                                }
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
                                                                                    setData(
                                                                                        "customer",
                                                                                        currentValue
                                                                                    );
                                                                                    setOpenComboboxCustomer(
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
                                                <InputError
                                                    message={errors.customer}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div
                                                className="my-3 flex cursor-pointer items-center text-sm text-primary hover:text-secondary-foreground hover:underline"
                                                onClick={() =>
                                                    setShowCreateUserDialog(
                                                        true
                                                    )
                                                }
                                            >
                                                <div className="mr-2 h-4 w-4">
                                                    <Plus className="h-4 w-4" />
                                                </div>
                                                Thêm khách hàng mới
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

                                                <Button
                                                    disabled={processing}
                                                    className="flex-1"
                                                    type="submit"
                                                    onClick={() =>
                                                        setData("action", true)
                                                    }
                                                >
                                                    <Printer className="w-4 h-4 mr-1" />
                                                    Lưu và in
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

            {showCreateUserDialog && (
                <CreateUserDialog
                    open={showCreateUserDialog}
                    onOpenChange={setShowCreateUserDialog}
                    showTrigger={false}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Create;
