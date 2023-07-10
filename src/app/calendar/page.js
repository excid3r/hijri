'use client'
import { useEffect, useState } from 'react';

import React from 'react';
import moment from 'moment-hijri';




const months = [
    "محرم",
    "صفر",
    "ربيع الأول",
    "ربيع الثاني",
    "جمادى الأولى",
    "جمادى الآخرة",
    "رجب",
    "شعبان",
    "رمضان",
    "شوال",
    "ذو القعدة",
    "ذو الحجة"
]
const weekdays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];



// const moment1 = moment('1410/8/28', 'iYYYY/iM/iD');
var calendar = [];
const startDate = moment('1444/1/1', 'iYYYY/iM/iD')
    .clone()
    .startOf("iMonth")
    .subtract(6, "day")
    console.log(startDate);
const endDate = startDate
    .clone()
    .endOf("iMonth")
const day = startDate.clone().subtract(1, "day");
while (day.isBefore(endDate, "day")) {
    console.log("zg")
    // const date = day.add(1, "day").clone();
    // const dow = date.day();
    // const array = [];
    // array[dow] = date.format.format("DD")
    // const date  = day.add(1, "day").clone();
    //     const dow = date.day();
    // const arr = Array(7)
    // .fill(0);
    // arr[dow] = date.format("iDD")
    // console.log(arr)
    calendar.push(
        Array(7)
            .fill(0)
            .map((index) => {
                const date = day.add(1, "day").clone();
                const dow = date.day();
                console.log(dow)
                return date.format("iDD")
            }
            )
    );
    // Array(7)
    //     .fill(0).map
    // for (let i = 0; i < 7; i++) {
    //     console.log(i)
    //   } 

}
console.log(calendar)


const getHijriMonth = (date) => {
    const hijriDate = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
        month: 'long',
    }).format(date);

    return hijriDate;
};

const getHijriDay = (data) => {
    const hijriDay = data.toLocaleString('en-US-u-ca-islamic', {
        day: 'numeric',
    });

    return parseInt(hijriDay);
};
const index = {
    "محرم": 4,
    "صفر": 35,
    "ربيع الأول": 67,
    "ربيع الآخر": 99,
    "جمادي الأولى": 130,
    "جمادي الآخرة": 162,
    "رجب": 193,
    "شعبان": 224,
    "رمضان": 256,
    "شوال": 288,
    "ذو القعدة": 320,
    "ذو الحجة": 350
};

export default function Home() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const lastPage = 380;
    const hijirMonth = getHijriMonth(currentDate);
    const hijriDay = getHijriDay(currentDate)
    const [currentPage, setCurrentPage] = useState(index[hijirMonth] + hijriDay);

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };



    return (
        <div>
            <img src={`http://localhost:3000/api/calendar/${currentPage.toString().padStart(3, 0)}`} />
            {currentPage < lastPage && <button onClick={nextPage}>Next</button>}
            {currentPage > 1 && <button onClick={previousPage}>Previous</button>}
            {/* <HijriCalendar year={1444} /> */}
        </div>
    );
}