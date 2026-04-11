"use client";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation'
import DataTable from '@/components/DataTable';
import GetApiEndPoint from '../../helper/ApiEndPoint'

function ExpensesDetail() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [dataListDetail, setDataListDetail] = useState()

    const editModalRef = useRef(null);
    const deleteModalRef = useRef(null);
    const [editData, setEditData] = useState({
        ID: undefined,
        ExpensesId: undefined,
        ExpensesType: 'FIXCOST',
        ExpensesDesc: '',
        ExpensesAmount: 0,
    });
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [alertMsg, setAlertMsg] = useState('');

    const GetDatalist = async () => {
        const endpoint = GetApiEndPoint();
        await axios.post(endpoint + '/Expenses/GetListMoneyCardDetail', { id: parseInt(id) })
            .then(res => {
                setDataListDetail(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handleEdit = (item) => {
        setEditData({
            ID: item.ID,
            ExpensesId: parseInt(id),
            ExpensesType: item.ExpensesType,
            ExpensesDesc: item.ExpensesDesc,
            ExpensesAmount: item.ExpensesAmount,
        });
        editModalRef.current?.showModal();
    }

    const handleSaveEdit = async () => {
        const endpoint = GetApiEndPoint();
        await axios.put(endpoint + '/Expenses/UpdateExpensesDetail', editData)
            .then(() => {
                setAlertMsg('Updated successfully');
                editModalRef.current?.close();
                GetDatalist();
                setTimeout(() => setAlertMsg(''), 2500);
            })
            .catch(error => console.error('Error updating:', error));
    }

    const handleDelete = (item) => {
        setDeleteTarget(item);
        deleteModalRef.current?.showModal();
    }

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        const endpoint = GetApiEndPoint();
        await axios.delete(endpoint + '/Expenses/DeleteExpensesDetail', {
            data: { ID: deleteTarget.ID, ExpensesId: parseInt(id) }
        })
            .then(() => {
                setAlertMsg('Deleted successfully');
                deleteModalRef.current?.close();
                setDeleteTarget(null);
                GetDatalist();
                setTimeout(() => setAlertMsg(''), 2500);
            })
            .catch(error => console.error('Error deleting:', error));
    }

    useEffect(() => {
        GetDatalist()
    }, []);

    const descPresets = ['ค่าน้ำ', 'ค่าไฟ', 'ค่าเน็ต', 'ค่าโทรศัพท์', 'ค่าเช่าบ้าน', 'ค่าผ่อนรถ', 'ค่าอาหาร', 'ค่าเดินทาง', 'ค่าบัตรเครดิต', 'ค่าประกัน'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
                <div className="flex items-center h-full">
                    <img className='w-11 h-11 mr-2' src="https://img.daisyui.com/images/emoji/smiling-face-with-sunglasses@80.webp" />
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                        View Statement {id}
                    </h1>
                </div>

                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <button className="btn transition-colors duration-500 transform w-64 rounded-full" onClick={() => { router.push('/') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7" /></svg>
                        Back
                    </button>
                </div>
            </div>

            <div className="w-full max-w-5xl">
                {alertMsg && (
                    <div className="alert alert-success mb-4">
                        <span>{alertMsg}</span>
                    </div>
                )}
                <DataTable dataList={dataListDetail} onEdit={handleEdit} onDelete={handleDelete} />
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left space-x-2">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#63e6be" height="1em" viewBox="0 0 512 512" className="inline-block w-8 h-8 stroke-current"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                        </div>
                        <div className="stat-title">Total balance</div>
                        <div className="stat-value">42,009</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#63e6be" height="1em" viewBox="0 0 576 512" className="inline-block w-8 h-8 stroke-current"><path d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM128 416H64V352c35.3 0 64 28.7 64 64zM64 224V160h64c0 35.3-28.7 64-64 64zM448 352c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM384 256c0 61.9-43 112-96 112s-96-50.1-96-112s43-112 96-112s96 50.1 96 112zM252 208c0 9.7 6.9 17.7 16 19.6V276h-4c-11 0-20 9-20 20s9 20 20 20h24 24c11 0 20-9 20-20s-9-20-20-20h-4V208c0-11-9-20-20-20H272c-11 0-20 9-20 20z" /></svg>
                        </div>
                        <div className="stat-title">Total spending this month</div>
                        <div className="stat-value">11,279</div>
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

            <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Expense</h3>
                    <div className="w-full flex justify-between py-4 space-x-4">
                        <select
                            className="select select-bordered w-full max-w-xs"
                            value={editData.ExpensesType}
                            onChange={(e) => setEditData({ ...editData, ExpensesType: e.target.value })}
                        >
                            <option value='FIXCOST'>Fix cost</option>
                            <option value='CREDIT'>Credit</option>
                            <option value='OTHER'>Other</option>
                        </select>
                        <input type="text" placeholder="Description" className="input input-bordered w-full max-w-xs"
                            value={editData.ExpensesDesc || ''}
                            onChange={(e) => setEditData({ ...editData, ExpensesDesc: e.target.value })}
                        />
                    </div>
                    <div className="w-full flex flex-wrap gap-2 pb-3">
                        {descPresets.map((item) => (
                            <button
                                key={item}
                                type="button"
                                className="btn btn-xs btn-outline rounded-full"
                                onClick={() => setEditData({ ...editData, ExpensesDesc: item })}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <div className="w-full">
                        <input type="number"
                            value={editData.ExpensesAmount}
                            onChange={(e) => setEditData({ ...editData, ExpensesAmount: parseFloat(e.target.value) })}
                            placeholder="Amount"
                            className="input input-bordered w-full" />
                    </div>
                    <div className="modal-action">
                        <div className="w-full flex justify-between">
                            <button className="btn btn-success" onClick={handleSaveEdit}>Save</button>
                            <button className="btn" onClick={() => editModalRef.current?.close()}>Close</button>
                        </div>
                    </div>
                </div>
            </dialog>

            <dialog ref={deleteModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">Confirm Delete</h3>
                    <p className="py-4">
                        Are you sure you want to delete
                        {deleteTarget && <span className="font-semibold"> "{deleteTarget.ExpensesDesc}" </span>}
                        ?
                    </p>
                    <div className="modal-action">
                        <div className="w-full flex justify-between">
                            <button className="btn btn-error" onClick={handleConfirmDelete}>Delete</button>
                            <button className="btn" onClick={() => { deleteModalRef.current?.close(); setDeleteTarget(null); }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </dialog>
        </main>
    )
}

export default ExpensesDetail
