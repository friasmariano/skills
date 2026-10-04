import { format, parseISO } from 'date-fns';

export const useFormattedDate = (isoDate: string | Date, pattern = 'dd/MM/yyyy') => {
    const date = typeof isoDate === 'string' ? parseISO(isoDate) : isoDate;

    return format(date, pattern);
}