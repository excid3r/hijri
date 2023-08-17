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
  return moment(date).format('DD/MM/YYYY')
}

const fetcher = (...args) => fetch(...args).then(res => res.json())
export default function Page() {
    const [date, setDate] = useState(moment());
    const lastPage = 379;
    const { data, error, isLoading } = useSWR(`dates?date=${formatDate(date)}`, fetcher)
    
    const previousPage = () => {
      setDate(date.subtract(1, 'days'))
    };

    const currentDatePage = () => {
      setDate(moment())
    }

    const nextPage = () => {
      setDate(date.add(1, 'days'))
    };

    const monthStartDates = {
      'محرم': '19/07/2023','صفر': '18/08/2023','ربيع الأول': '16/09/2023', 'ربيع الآخر': '16/10/2023', 'جمادى الأولى': '15/11/2023', 'جمادى الآخرة': '14/12/2023',
      'رجب': '13/01/2024', 'شعبان': '11/02/2024', 'رمضان': '12/03/2024', 'شوال': "10/04/2024", "ذو القعدة": "09/05/2024", "ذو الحجة": '08/06/2024'
    }

    if (isLoading){
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
                                    <Image src={`/hijri/border${data.month === month ? "_active":''}.png`} alt={month} width="229" height="140" />
                                    <p className={`text-sm text-center absloute right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${month === data.month ? "text-red-500" : ''}`}>{month}</p>
                                </button>
                            })}

                    </div>
                    <div className='flex flex-col justify-center'>
                        <img width="667px" height="785px" className='border w-full shadow flex items-center justify-center' alt="page" src={isLoading ? "" : data.page.url} />
                    </div>
                    <div className=''>
                        {/* <div className=' flex flex-col gap-2 justify-center'>
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

                        </div> */}

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
                        {data.page.number > 1 && <button className='flex items-center py-2 px-4  rounded justify-center bg-yellow-600  gap-2 text-white' onClick={currentDatePage}
                        >
                           
                            التاريخ الحالي</button>}
                    </div>
                    <div>
                        {data.page.number < lastPage && <button className='flex items-center py-2 rounded justify-center bg-yellow-600 w-16 gap-2 text-white' onClick={nextPage}
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
