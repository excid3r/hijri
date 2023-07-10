'use client'
import { useEffect, useState } from 'react';

import React from 'react';
import moment from 'moment-hijri';
import { FaWhatsapp, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaArrowLeft, FaArrowRight, FaFilePdf, FaCalendarAlt } from 'react-icons/fa';




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
        <div className='root-bg min-h-screen flex flex-col gap-5'>
            <header className='mb-4 container mx-auto px-4 py-2 '>
                <div className='flex items-center gap-4'>
                    <img height="200" src="http://localhost:3000/hijri/logo.svg" title="حكومة الشارقة" />
                    <div>
                        <h1 className='text-xl font-bold'>التقويم الهجري ١٤٤٥</h1>
                        <p className='text-lg'>دائرة الشؤون الإسلامية بالشارقة</p>
                    </div>
                </div>
            </header>
            <main className='grow container mx-auto px-4 flex flex-col gap-5'>
                <div className='flex flex-col gap-2.5 items-center justify-center'>
                    <div className='border drop-shadow'>
                        <img src={`hijri/pages/${currentPage.toString().padStart(3, 0)}`} />
                    </div>
                    <div className=' flex  flex-col w-full gap-3'>


                        <div className='flex justify-between gap-4'>
                            <div>
                                {currentPage > 1 && <button className='flex items-center py-2 justify-center rounded w-16 gap-2  w-100 bg-red-100' onClick={previousPage}
                                >
                                    <FaArrowRight />
                                    السابق</button>}
                            </div>
                            <div>
                                <button className='flex items-center py-2 justify-center rounded w-28 gap-2 overflow-hidden bg-red-100'>
                                    <FaCalendarAlt />
                                    الإنتقال السريع

                                </button>
                            </div>
                            <div>
                                {currentPage < lastPage && <button className='flex items-center py-2 rounded justify-center bg-red-900 w-16 gap-2 text-white' onClick={nextPage}
                                >
                                    التالي
                                    <FaArrowLeft />
                                </button>}
                            </div>
                        </div>
                        <div>
                            <a className="flex gap-2 bg-blue-800 items-center justify-center text-white rounded shadow px-4 py-2 text-bold" href="#">
                                <FaFilePdf />
                                تحميل التقويم الهجري</a>
                        </div>
                    </div>
                </div>

                <div>
                    <h2>العطلات الرسمية والمناسبات الدينية الوطنية</h2>
                </div>
            </main>
            <footer className='container mx-auto px-4 w-full flex gap-4 flex-col'>
                <div className='flex flex-col gap-1.5 text-sm'>
                    <div className='flex items-center gap-1'>
                        <FaWhatsapp />
                        0561888292
                    </div>
                    <div className='flex items-center gap-1'>
                        <div className='flex items-center gap-1'>
                            <FaTwitter />
                            <FaInstagram />
                        </div>
                        islamic_affairs
                    </div>
                    <div className='flex items-center gap-1'>
                        <FaPhone />
                        06 505 5888
                    </div>
                    <div className='flex items-center gap-1'>
                        <FaEnvelope />
                        info@sia.gov.ae
                    </div>
                </div>

                <div className='flex gap-4 justify-center'>
                    <div>الرقم المجاني 80017</div>
                    <div>الفتاوي 8001441</div>
                </div>
            </footer>
        </div>
    );
}