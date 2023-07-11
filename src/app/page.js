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
        <div className='min-h-screen flex flex-col container mx-auto'>
            <Calendar visible={visible} setVisible={setVisible} setCurrentPage={setCurrentPage}/>
            <Image src="/hijri/header.png" width={1536} height={997} />
            <div className='relative overflow-hidden'>
                <div className='absolute top-0 right-0 h-full w-full'>
                    <div className='flex flex-col items-center  h-full w-full justify-center'>
                        <img className='border shadow flex h-32 w-32 items-center justify-center' title="page" src={`hijri/pages/${currentPage.toString().padStart(3, 0)}`} />
                    </div>
                </div>
                <Image src="/hijri/body.png" width={1536} height={721} />
            </div>
            <div className='flex justify-between gap-2'>
                            <div>
                                {currentPage > 1 && <button className='flex items-center py-2 justify-center rounded w-16 gap-2  w-100 bg-red-100' style={{fontSize: "12px"}} onClick={previousPage}
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
            <Image src="/hijri/footer.png" width={1536} height={165} />
            
        </div>
    );
}