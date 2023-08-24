import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

function parseHijriDate(hijriDateString) {
  const monthNames = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];

  const dateParts = hijriDateString.match(/(\d+)\s+(.+)\s+(\d+)/);

  if (!dateParts || dateParts.length !== 4) {
    throw new Error('Invalid Hijri date format');
  }

  const day = parseInt(dateParts[1]);
  const monthName = dateParts[2];
  const year = parseInt(dateParts[3]);

  const monthIndex = monthNames.indexOf(monthName);

  if (isNaN(day) || isNaN(monthIndex) || isNaN(year)) {
    throw new Error('Invalid Hijri date components');
  }

  return {
    day: day,
    month: monthName,
    year: year
  };
}


const index = {
  "محرم": 3,
  "صفر": 35,
  "ربيع الأول": 66,
  "ربيع الآخر": 98,
  "جمادى الأولى": 130,
  "جمادى الآخرة": 161,
  "رجب": 193,
  "شعبان": 224,
  "رمضان": 256,
  "شوال": 287,
  "ذو القعدة": 318,
  "ذو الحجة": 350
};

function getHijriDay(hijriDate) {
  const parts = hijriDate.split(" ");
  return parseInt(parts[0]);
}

function getDayName(gregorianDate) {
  const date = moment(gregorianDate, "DD/MM/YYYY");
  return date.format("dddd");
}

const months = {
  "January": "يناير",
  "February": "فبراير",
  "March": "مارس",
  "April": "أبريل",
  "May": "مايو",
  "June": "يونيو",
  "July": "يوليو",
  "August": "أغسطس",
  "September": "سبتمبر",
  "October": "أكتوبر",
  "November": "نوفمبر",
  "December": "ديسمبر"
}


export async function GET(request) {
  const month = request.nextUrl.searchParams.get("month");
  const dates = await prisma.date.findMany({
    where: {
      hijri: {
        contains: month
      }
    }
  });


  const monthNamesSet = new Set();
  const yearsSet = new Set();
  const sortedDate = Object.values(dates).map(entry => {
    const dayName = getDayName(entry.gregorian);
    const date = moment(entry.gregorian, "DD/MM/YYYY");
    const monthName = date.format("MMMM");
    const year = date.format("YYYY");
    monthNamesSet.add(months[monthName]);
    yearsSet.add(year);
    const gday = moment(date, "DD/MM/YYYY").format("DD");
    return { ...entry, dayName, gday, ...parseHijriDate(entry.hijri) };
  }).sort((a, b) => {
    const hijriA = getHijriDay(a.hijri);
    const hijriB = getHijriDay(b.hijri);
    return hijriA - hijriB;
  });
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const firstEntryDayName = sortedDate[0].dayName;

  // Find the index of the day name in the dayNames array
  const firstDayIndex = dayNames.indexOf(firstEntryDayName);
  const shiftedSortedDate = Array(firstDayIndex).fill(null).concat(sortedDate);

  return NextResponse.json({
    monthNames: Array.from(monthNamesSet),
    years: Array.from(yearsSet)
    , shiftedSortedDate
  }
  )
}
