import React from 'react';
import dayjs from 'dayjs';

export const newlineToBr = (text?: string) => {
    if (!text) {
        return '';
    }

    return text.split('\n').map((line, i) => (
        <span key={i}>
            {line}
            <br />
        </span>
    ));
};

export const dateFilter = (date: number, option?: { format: string }) => {
    return dayjs(date).format(option?.format || 'YYYY.MM.DD');
};
