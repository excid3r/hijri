'use client'
import { useEffect, useState } from 'react';

import React from 'react';
import moment from 'moment-hijri';
import { FaWhatsapp, FaTwitter, FaTimes, FaInstagram, FaPhone, FaEnvelope, FaArrowLeft, FaArrowRight, FaFilePdf, FaCalendarAlt } from 'react-icons/fa';




const months = [
    "محرم",
    "صفر",
    "ربيع الأول",
    "ربيع الآخر",
    "جمادى الأولى",
    "جمادي الآخرة",
    "رجب",
    "شعبان",
    "رمضان",
    "شوال",
    "ذو القعدة",
    "ذو الحجة"
]

const weekdays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];






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
const pageIndex = {
    "محرم": 4,
    "صفر": 36,
    "ربيع الأول": 67,
    "ربيع الآخر": 99,
    "جمادى الأولى": 131,
    "جمادي الآخرة": 162,
    "رجب": 194,
    "شعبان": 225,
    "رمضان": 257,
    "شوال": 288,
    "ذو القعدة": 319,
    "ذو الحجة": 351
};


function Calendar({visible, setVisible, setCurrentPage}) {
    return <>
        <div className={`${visible ? "block" : "hidden"} fixed w-full backdrop-blur-sm bg-white/30 h-full z-50 flex items-center justify-center`}>
            
            <div className='bg-white p-4 shadow flex flex-col gap-2'>
                <div className='flex'>
                <p>الرجاء إختيار الشهر</p>
                <div className='text-2xl mr-auto'>
                    <button onClick={()=>{
                        setVisible(!visible)
                    }}><FaTimes/></button>
                    </div>
                </div>
                <ul className='grid grid-cols-4 gap-3'>
                    {months.map((month, index) => {
                        return <li key={index}>
                            <button onClick={()=>{
                                setCurrentPage(pageIndex[month])
                                setVisible(!visible);
                            }} className='bg-blue-200 p-2 rounded-full h-20 w-20'>
                                {index + 1} - {month}
                                </button>
                            </li>
                    })}
                </ul>
            </div>
        </div>
    </>
}
export default function Home() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const lastPage = 379;
    const hijirMonth = getHijriMonth(currentDate);
    const hijriDay = getHijriDay(currentDate)
    // const [currentPage, setCurrentPage] = useState(pageIndex[hijirMonth] + hijriDay);
        const [currentPage, setCurrentPage] = useState(1);
    const [visible, setVisible] = useState(false); 
    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };



    return (
        <div className='root-bg min-h-screen flex flex-col gap-5'>
            <Calendar visible={visible} setCurrentPage={setCurrentPage} setVisible={setVisible} />
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
                        <img title="page" src={`hijri/pages/${currentPage.toString().padStart(3, 0)}`} />
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
                                <button onClick={()=>{
                                    setVisible(!visible);
                                }} className='flex items-center py-2 justify-center rounded w-28 gap-2 overflow-hidden bg-red-100'>
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
                    <h2 className='text-xl'>العطلات الرسمية والمناسبات الدينية الوطنية</h2>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                </div>

                <div>
                    <h1 className='text-xl'>تغير الصفحة بالضغط على التاريخ</h1>
                    <div className='flex flex-col gap-4'>
                    {months.map((month, index) => {
                        const calendar = [];
                        const startDate = moment(`1445/${index + 1}/1`, 'iYYYY/iM/iD')
                            .clone()
                            .startOf("iMonth");
                        const endDate = startDate
                            .clone()
                            .endOf("iMonth");
                        const day = startDate.clone().subtract(1, "day");
                        while (day.isBefore(endDate, "day")) {
                            const date = day.add(1, "day").clone();
                            const dow = date.day();
                            const formatedDate = date.format('iYYYY/iM/iD - YYYY/M/D')
                            calendar.push((<div key={formatedDate}>
                                <button onClick={() => {
                                    const hijirMonth = month;
                                    const hijriDay = date.iDate() - 1;
                                    setCurrentPage(pageIndex[hijirMonth] + hijriDay);
                                    window.scrollTo(0, 0)
                                }}>
                                    {formatedDate}
                                </button></div>))
                        }

                        return <div key={index + 1}>
                            <h2 className='text-lg mb-2'>{index + 1} - {month} </h2>


                            <div className='flex flex-col gap-2'>{calendar}</div>
                        </div>
                    })}
                    </div>
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