'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'

import React from 'react';
import moment from 'moment';
import { FaWhatsapp, FaTwitter, FaTimes, FaInstagram, FaPhone, FaEnvelope, FaArrowLeft, FaArrowRight, FaFilePdf, FaCalendarAlt } from 'react-icons/fa';
import useSWR from 'swr'


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

function formatDate(date) {
    return moment(date).format('M/D/YYYY')
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

const dayNames = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

function Month({ name, setDate, selectedDate }) {
    const { data, error, isLoading } = useSWR(`hijri/calendar?month=${name}`, fetcher)
    if (isLoading) {
        return "الرجاء الإنتظار"
    }
    console.log(data.monthNames)
    return (
        <div className='inline-flex flex-col gap-4 mt-6'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>{name}</h1>
                <div className='flex gap-2 text-sm'>
                    <p>
                        {data.monthNames.join(" - ")}
                    </p>
                    <ul>{data.years.map((month, i) => {
                        return <li key={i}>{month}</li>
                    })}</ul>
                </div>

            </div>
            <div>
                <div className='grid grid-cols-7 gap-2'>
                    {dayNames.map((day, i) => {
                        return <h2 key={i}>{day}</h2>
                    })}
                </div>
                <div className='grid grid-cols-7 gap-2'>
                    {data.shiftedSortedDate.map((date, i) => {
                        if (!date) {
                            return <div key={i}></div>
                        }
                        return <button key={i} onClick={()=>{
                            const dateString = date.gregorian
                            const format = 'M/D/YYYY';

                            const momentObject = moment(dateString, format);

                            setDate(momentObject)
                        }}><div className={`flex flex-col border mb-1 items-center ${date.gregorian === selectedDate ? "border-2 border-black" : ''}`}><span className='font-bold'>{date.day}</span><span className='text-sm'>{date.gday}</span></div></button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const [date, setDate] = useState(moment('2024-07-07'));
    const lastPage = 379;
    const { data, error, isLoading } = useSWR(`hijri/dates?date=${formatDate(date)}`, fetcher)
console.log(date)
    const previousPage = () => {
        setDate(date.clone().subtract(1, 'days'))
    };

    const currentDatePage = () => {
        setDate(moment())
    }

    const nextPage = () => {
        
        setDate(date.clone().add(1, 'days'))
    };

    const monthStartDates = {
        'محرم': '7/07/2024', 'صفر': '6/08/2024', 'ربيع الأول': '4/09/2024', 'ربيع الآخر': '4/10/2024', 'جمادى الأولى': '3/11/2024', 'جمادى الآخرة': '2/12/2024',
        'رجب': '1/01/2025', 'شعبان': '31/01/2025', 'رمضان': '1/03/2025', 'شوال': "31/03/2025", "ذو القعدة": "29/04/2025", "ذو الحجة": '28/05/2025'
    }

    if (isLoading) {
        return <>الرجاء الإنتظار</>
    }
    return (
        <div className='min-h-screen flex flex-col gap-8 container mx-auto background'>
            <header className='px-4 py-8'>
                <div className='flex flex-col items-center gap-4'>
                    <div>
                        <Image width="80" alt="دائرة الشؤون الإسلامية" height="541" src="/hijri/logo1.png" />
                    </div>
                    <div>
                        <Image src="/hijri/app-logo.png?id=1" key={1} alt="التقويم الهجري ١٥٥٥" width="150" height="300" />
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
                            "جمادى الآخرة"].map((month, index) => {
                                return <button key={index} onClick={() => {
                                    const dateString = monthStartDates[month]
                                    const format = 'DD/MM/YYYY';

                                    const momentObject = moment(dateString, format);

                                    setDate(momentObject)
                                }} className='relative'>
                                    <Image src={`/hijri/border${data.month === month ? "_active" : ''}.png`} alt={month} width="229" height="140" />
                                    <p className={`text-sm text-center absloute right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${month === data.month ? "text-red-500" : ''}`}>{month}</p>
                                </button>
                            })}

                    </div>
                    <div className='flex flex-col justify-center'>
                        <img width="667px" height="785px" className='border w-full shadow flex items-center justify-center' alt="page" src={isLoading ? "" : data.page.url} />
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
                                        const dateString = monthStartDates[month]
                                        const format = 'DD/MM/YYYY';

                                        const momentObject = moment(dateString, format);

                                        setDate(momentObject)
                                    }} className='relative' >
                                        <Image src={`/hijri/border${month === data.month ? "_active" : ''}.png`} alt={month} width="229" height="140" />
                                        <p className={`text-sm text-center absloute right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${month === data.month ? "text-red-500" : ''}`}>{month}</p>
                                    </button>
                                })}

                        </div>

                    </div>
                </div>
                <div className='flex justify-between gap-2'>
                    <div>
                        {data.page.number > 1 && <button className='flex items-center py-2 rounded justify-center bg-yellow-600 w-16 gap-2 text-white' onClick={previousPage}
                        >
                            <FaArrowRight />
                            السابق</button>}
                    </div>
                    <div>
                        {/* {data.page.number > 1 && <button className='flex items-center py-2 px-4  rounded justify-center bg-yellow-600  gap-2 text-white' onClick={currentDatePage}
                        >

                            التاريخ الحالي</button>} */}
                    </div>
                    <div>
                        {data.page.number < lastPage && <button className='flex items-center py-2 rounded justify-center bg-yellow-600 w-16 gap-2 text-white' onClick={nextPage}
                        >
                            التالي
                            <FaArrowLeft />
                        </button>}
                    </div>

                </div>
                {/* <Month name={data.month} selectedDate={data.gregorian} setDate={setDate} /> */}
            </main>
            <footer className='px-4'>
                <Image src="/hijri/last.png" alt='معلومات الدائرة وأرقام التواصل' width="1885" height="150" />
            </footer>
        </div>
    );
} 
