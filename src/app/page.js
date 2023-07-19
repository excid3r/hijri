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
        day: 'numeric', month: 'long',weekday: 'long',year : 'numeric'
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

    const [currentDate, setCurrentDate] = useState(new Date("2023-07-20"));
    const lastPage = 379;
    const hijirMonth = getHijriMonth(currentDate);
    const hijriDay = moment().iDate()
    const [currentPage, setCurrentPage] = useState(pageIndex[hijirMonth] + hijriDay);
    const [visible, setVisible] = useState(false);
    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
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
                                    setCurrentPage(pageIndex[month])
                                }} className='relative'>
                                    <Image src="/hijri/border.png" alt={month} width="229" height="140" />
                                    <p className='text-sm text-center absloute right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{month}</p>
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
                                        setCurrentPage(pageIndex[month])
                                    }} className='relative' >
                                        <Image src="/hijri/border.png" alt={month} width="229" height="140" />
                                        <p className='text-sm text-center absloute right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>{month}</p>
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
                    {/* <div>
                    <button onClick={() => {
                        setVisible(!visible);
                    }} className='flex items-center py-2 justify-center rounded w-28 gap-2 overflow-hidden bg-red-100'>
                        <FaCalendarAlt />
                        الإنتقال السريع

                    </button>
                </div> */}
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
            {/* <Calendar visible={visible} setVisible={setVisible} setCurrentPage={setCurrentPage} /> */}
            {/* <div className='relative overflow-hidden'>
                <div className='absolute top-0 right-0 h-full w-full'>
                    <div className='flex flex-col items-center  h-full w-full justify-center'>
                        <img className='border shadow flex h-32 w-32 items-center justify-center' title="page" src={`hijri/pages/${currentPage.toString().padStart(3, 0)}`} />
                    </div>
                </div>
                <Image src="/hijri/body.png" width={1536} height={721} />
            </div> */}

            {/* <Image src="/hijri/footer.png" width={1536} height={165} /> */}

        </div>
    );
}