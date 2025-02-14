export function formatDate(date, format = "DD/MM/YYYY") {
    if (!date) return null;
    return new Date(date).toLocaleDateString("vi-VN");
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
