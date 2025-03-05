import dayjs from "dayjs";

export const formatCurrency = (value: string) => {
    const digit = `${parseFloat(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

    return `£ ${digit}`;
};

export function formatTimeFn(date: string | number, format?: string) {
    const dayjsDate = dayjs(date);
    return dayjsDate.format(format || "MMM DD, hh:mm a");
}
