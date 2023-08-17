import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function parseHijriDate(hijriDateString) {
  const monthNames = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية',
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
  "جمادي الآخرة": 161,
  "رجب": 193,
  "شعبان": 224,
  "رمضان": 256,
  "شوال": 287,
  "ذو القعدة": 318,
  "ذو الحجة": 350
};

export async function GET(request) {
  const gregorian = request.nextUrl.searchParams.get("date");
  const date = await prisma.date.findUnique({
    where: {
      gregorian,
    },
  });
  const { day, month } = parseHijriDate(date.hijri);
  console.log(parseHijriDate(date.hijri))
  const number = index[month] + day
  const url = `https://sia.gov.ae/hijri/pages/${number.toString().padStart(3, 0)}`
  return NextResponse.json({
    ...date,
    month,
    page: {
      number,
      url
    }
  })
}
