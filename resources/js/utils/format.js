import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function formatDate(date, formatStr = "dd/MM/yyyy", hasTime = true) {
    if (!date) {
        return null;
    }

    const dateFormat = hasTime ? `${formatStr} HH:mm` : formatStr;
    return format(new Date(date), dateFormat, { locale: vi });
}

export function formatMoney(amount, currencySymbol = "₫", decimals = 0) {
    return (
        new Intl.NumberFormat("vi-VN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(amount) +
        " " +
        currencySymbol
    );
}
