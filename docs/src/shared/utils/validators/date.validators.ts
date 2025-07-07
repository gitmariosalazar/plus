import { RpcException } from '@nestjs/microservices';

export function validateAndConvertDate(dateInputString: string): string | null {
  const regexDayMonthYear = /^(\d{2})-(\d{2})-(\d{4})$/;
  const regexYearMonthDay = /^(\d{4})-(\d{2})-(\d{2})$/;

  let year: number, month: number, day: number;

  if (regexDayMonthYear.test(dateInputString)) {
    const match = dateInputString.match(regexDayMonthYear)!;
    day = parseInt(match[1], 10);
    month = parseInt(match[2], 10);
    year = parseInt(match[3], 10);
  } else if (regexYearMonthDay.test(dateInputString)) {
    const match = dateInputString.match(regexYearMonthDay)!;
    year = parseInt(match[1], 10);
    month = parseInt(match[2], 10);
    day = parseInt(match[3], 10);
  } else {
    throw new RpcException({
      status: 400, // BAD_REQUEST
      message: 'Invalid date format. Please use DD-MM-YYYY or YYYY-MM-DD.',
    });
  }

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    year < 1000 ||
    year > 9999
  ) {
    throw new RpcException({
      status: 400, // BAD_REQUEST
      message: 'Invalid date format. Please use DD-MM-YYYY or YYYY-MM-DD.',
    });
  }

  const daysInMonth = [
    31, // January
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
  ];

  if (day > daysInMonth[month - 1]) {
    throw new RpcException({
      status: 400, // BAD_REQUEST
      message: `Invalid date: ${dateInputString}. The month ${month} does not have ${day} days.`,
    });
  }

  const date = new Date(year, month - 1, day);

  if (
    isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date.toISOString();
}
/*
if (require.main === module) {
  const testDates = [
    '31-03-2023',
    '31-04-2023',
    '29-02-2024',
    '29-02-2023',
    '30-11-2023',
    '02/02/2024',
  ];

  testDates.forEach((date) => {
    try {
      const result = validateAndConvertDate(date);
      console.log(`Fecha ${date} -> ${result}`);
    } catch (error) {
      console.error(`Error en ${date}: ${error.message}`);
    }
  });
}

console.log(`**********************************`);

if (require.main === module) {
  const testDates = [
    '2023-03-31', // Válido: 31 días en marzo
    '2023-04-31', // Inválido: abril tiene 30 días
    '2024-02-29', // Válido: 2024 es bisiesto
    '2023-02-29', // Inválido: 2023 no es bisiesto
    '2023-11-30', // Válido: 30 días en noviembre
    '2024-02-28', // Válido: 28 días en febrero (no bisiesto)
  ];

  testDates.forEach((date) => {
    try {
      const result = validateAndConvertDate(date);
      console.log(`Fecha ${date} -> ${result}`);
    } catch (error) {
      console.error(`Error en ${date}: ${error.message}`);
    }
  });
}
const birthDate = new Date();

if (typeof birthDate === 'string') {
  const date = new Date(birthDate);
  if (isNaN(date.getTime())) {
    console.error('Invalid date format');
  } else {
    console.log(`Valid date: ${date.toISOString()}`);
}
} else {
  console.error('Input is not a string');
}
*/
