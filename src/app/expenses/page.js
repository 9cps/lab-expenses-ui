"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams , useRouter } from 'next/navigation'
import DataTable from '@/components/DataTable';

function ExpensesDetail() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [dataListDetail, setDataListDetail] = useState()
    const GetDatalist = () => {
        axios.post('http://localhost:8080/GetListMoneyCardDetail', {id: parseInt(id)})
            .then(res => {
                const dataList = res.data;
                setDataListDetail(dataList);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        GetDatalist()
        console.log(dataListDetail);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
                <div className="flex items-center h-full">
                    <img className='w-11 h-11 mr-2' src="https://daisyui.com/images/emoji/yawning-face@80.webp" /> <h1 className='text-2xl font-bold'>View Statement {id}</h1>
                </div>

                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <button className="btn w-64 rounded-full" onClick={() => {router.push('/')}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7" /></svg>
                        Back
                    </button>
                </div>
            </div>

            <div className="relative flex place-items-center">
                <DataTable dataList = {dataListDetail} />
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left space-x-2">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#63e6be" height="1em" viewBox="0 0 512 512" className="inline-block w-8 h-8 stroke-current"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                        </div>
                        <div className="stat-title">Total balance</div>
                        <div className="stat-value">42,009</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#63e6be" height="1em" viewBox="0 0 576 512" className="inline-block w-8 h-8 stroke-current"><path d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM128 416H64V352c35.3 0 64 28.7 64 64zM64 224V160h64c0 35.3-28.7 64-64 64zM448 352c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM384 256c0 61.9-43 112-96 112s-96-50.1-96-112s43-112 96-112s96 50.1 96 112zM252 208c0 9.7 6.9 17.7 16 19.6V276h-4c-11 0-20 9-20 20s9 20 20 20h24 24c11 0 20-9 20-20s-9-20-20-20h-4V208c0-11-9-20-20-20H272c-11 0-20 9-20 20z" /></svg>
                        </div>
                        <div className="stat-title">Total spending this month</div>
                        <div className="stat-value">11,279</div>
                        <div className="stat-desc">5% more than last month</div>
                    </div>

                </div>

                <a
                    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Export{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Survey your statement
                    </p>
                </a>
            </div>
        </main>
    )
}

export default ExpensesDetail