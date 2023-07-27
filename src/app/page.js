'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'

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
        day: 'numeric', month: 'long', weekday: 'long', year: 'numeric'
    });
    return parseInt(hijriDay);
};
const pageIndex = {
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


function Calendar({ visible, setVisible, setCurrentPage }) {
    return <>
        <div className={`${visible ? "block" : "hidden"} fixed w-full backdrop-blur-sm bg-white/30 h-full z-50 flex items-center justify-center`}>

            <div className='bg-white p-4 shadow flex flex-col gap-2'>
                <div className='flex'>
                    <p>الرجاء إختيار الشهر</p>
                    <div className='text-2xl mr-auto'>
                        <button onClick={() => {
                            setVisible(!visible)
                        }}><FaTimes /></button>
                    </div>
                </div>
                <ul className='grid grid-cols-4 gap-3'>
                    {months.map((month, index) => {
                        return <li key={index}>
                            <button onClick={() => {
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
    const [initlize, setInitlize] = useState(true)
    const lastPage = 379;
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [hijirMonth, setHijirMonth] = useState(getHijriMonth(currentDate))
    useEffect(() => {
        if (initlize) {
            const currentHijriMonth = getHijriMonth(currentDate);
            setHijirMonth(currentHijriMonth);
            const hijriDay = moment().iDate()
            setCurrentPage(pageIndex[hijirMonth] + hijriDay)
            setInitlize(false)
        }

    })

    function getMonthName(numberPage) {
        for (const month in pageIndex) {
            const pageStart = pageIndex[month];
            const nextPageStart = pageIndex[Object.keys(pageIndex)[Object.keys(pageIndex).indexOf(month) + 1]];
    
            if (numberPage >= pageStart && numberPage < nextPageStart) {
                return month;
            }
        }
        
        return "Unknown"; // If numberPage is not within any known month range
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
        setHijirMonth(getMonthName(currentPage-1))
    };
    const currentDatePage = () => {
        const currentHijriMonth = getHijriMonth(new Date());
        setHijirMonth(currentHijriMonth);
        const hijriDay = moment().iDate()
        setCurrentPage(pageIndex[currentHijriMonth] + hijriDay)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        setHijirMonth(getMonthName(currentPage+1))
    };



    return (
        <div className='min-h-screen flex flex-col gap-8 container mx-auto background'>
            <header className='px-4 py-8'>
                <div className='flex flex-col items-center gap-4'>
                    <div>
                        <Image width="80" alt="دائرة الشؤون الإسلامية" height="541" src="/hijri/logo1.png" />
                    </div>
                    <div>
                        <Image src="/hijri/app-logo.png" alt="التقويم الهجري ١٥٥٥" width="150" height="300" />
                    </div>
                </div>
            </header>
            <main className='px-2 grow flex flex-col  gap-4'>
                <div className='flex gap-2'>
                    <div className=' flex flex-col gap-2 justify-center'>
                        {[
                            "محرم",
                            "صفر",
                            "ربيع الأول",
                            "ربيع الآخر",
                            "جمادى الأولى",
                            "جمادي الآخرة"].map((month, index) => {
                                return <button key={index} onClick={() => {
                                    setCurrentPage(pageIndex[month]+1)
                                    setHijirMonth(getMonthName(pageIndex[month]+1))
                                }} className='relative'>
                                    <Image src={`/hijri/border${month === hijirMonth ? "_active":''}.png`} alt={month} width="229" height="140" />
                                    <p className={`text-sm text-center absloute right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${month === hijirMonth ? "text-red-500" : ''}`}>{month}</p>
                                </button>
                            })}

                    </div>
                    <div className='flex flex-col justify-center'>
                        <img width="667px" height="785px" className='border w-full shadow flex items-center justify-center' alt="page" src={`hijri/pages/${currentPage.toString().padStart(3, 0)}`} />
                    </div>
                    <div className=''>
                        <div className=' flex flex-col gap-2 justify-center'>
                            {[
                                "رجب",
                                "شعبان",
                                "رمضان",
                                "شوال",
                                "ذو القعدة",
                                "ذو الحجة"].map((month, index) => {
                                    return <button key={index} onClick={() => {
                                        setCurrentPage(pageIndex[month] + 1)
                                        setHijirMonth(getMonthName(pageIndex[month]+1))
                                    }} className='relative' >
                                    <Image src={`/hijri/border${month === hijirMonth ? "_active":''}.png`} alt={month} width="229" height="140" />
                                    <p className={`text-sm text-center absloute right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${month === hijirMonth ? "text-red-500" : ''}`}>{month}</p>
                                    </button>
                                })}

                        </div>

                    </div>
                </div>
                <div className='flex justify-between gap-2'>
                    <div>
                        {currentPage > 1 && <button className='flex items-center py-2 rounded justify-center bg-yellow-600 w-16 gap-2 text-white' onClick={previousPage}
                        >
                            <FaArrowRight />
                            السابق</button>}
                    </div>
                    <div>
                        {currentPage > 1 && <button className='flex items-center py-2 px-4  rounded justify-center bg-yellow-600  gap-2 text-white' onClick={currentDatePage}
                        >
                           
                            التاريخ الحالي</button>}
                    </div>
                    <div>
                        {currentPage < lastPage && <button className='flex items-center py-2 rounded justify-center bg-yellow-600 w-16 gap-2 text-white' onClick={nextPage}
                        >
                            التالي
                            <FaArrowLeft />
                        </button>}
                    </div>

                </div>

            </main>
            <footer className='px-4'>
                <Image src="/hijri/last.png" alt='معلومات الدائرة وأرقام التواصل' width="1885" height="150" />
            </footer>
        </div>
    );
} 
