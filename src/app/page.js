"use client";
import CardList from '../../public/component/CardList';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (modalRef.current) {
      if (isModalOpen) {
        modalRef.current.close(); // Close the modal
      } else {
        modalRef.current.showModal(); // Show the modal
      }
    }
  }

  const [dataSave, setDataSave] = useState({
    ExpensesMonth: undefined,
    ExpensesYear: undefined,
    ExpensesMoney: undefined,
  })

  const handleSaveExpenses = () => {
    console.log(dataSave);

    axios.put('http://localhost:8080/CreateExpenses', dataSave)
      .then(res => {
        setShowAlert(true);
        setTimeout(() => {
          modalRef.current.close();
          setShowAlert(false);
          // Reset the input values
          setDataSave({
            ExpensesMonth: undefined,
            ExpensesYear: undefined,
            ExpensesMoney: undefined,
          });
        }, 5000);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
          <div className="flex items-center h-full">
            <img className='w-11 h-11 mr-2' src="https://daisyui.com/images/emoji/yawning-face@80.webp" /> <h1 className='text-2xl font-bold'>Expenses App</h1>
          </div>

          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <button className="btn w-64 rounded-full"
              onClick={handleModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Add new
            </button>
          </div>
        </div>

        <div className="relative flex place-items-center">
          <CardList />
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left space-x-2">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#63e6be" height="1em" viewBox="0 0 512 512" class="inline-block w-8 h-8 stroke-current"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
              </div>
              <div className="stat-title">Total balance</div>
              <div className="stat-value">42,009</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#63e6be" height="1em" viewBox="0 0 576 512" class="inline-block w-8 h-8 stroke-current"><path d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM128 416H64V352c35.3 0 64 28.7 64 64zM64 224V160h64c0 35.3-28.7 64-64 64zM448 352c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM384 256c0 61.9-43 112-96 112s-96-50.1-96-112s43-112 96-112s96 50.1 96 112zM252 208c0 9.7 6.9 17.7 16 19.6V276h-4c-11 0-20 9-20 20s9 20 20 20h24 24c11 0 20-9 20-20s-9-20-20-20h-4V208c0-11-9-20-20-20H272c-11 0-20 9-20 20z" /></svg>
              </div>
              <div className="stat-title">Total spending this month</div>
              <div className="stat-value">11,279</div>
              <div className="stat-desc">5% more than last month</div>
            </div>

          </div>

          <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            onClick={() => {
              router.push('/expenses', {id: 3} )
            }}
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

        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            {showAlert && (
              <div className="alert alert-success mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Your purchase has been confirmed!</span>
              </div>
            )}
            <h3 className="font-bold text-lg">Expenses</h3>
            <div className="w-full flex justify-between py-4 space-x-4">
              <input type="number" 
              placeholder="Month" 
              value={dataSave.ExpensesMonth}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                if (!isNaN(newValue) && newValue >= 1 && newValue <= 12) {
                  setDataSave({ ...dataSave, ExpensesMonth: newValue });
                }
              }}
              className="input input-bordered w-full max-w-xs" />
              <input type="number" placeholder="Year"
              value={dataSave.ExpensesYear}
              onChange={(e) =>
                setDataSave({ ...dataSave, ExpensesYear: parseInt(e.target.value) })
              } 
              className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="w-full">
              <input type="number" 
              value={dataSave.ExpensesMoney}
              onChange={(e) =>
                setDataSave({ ...dataSave, ExpensesMoney: parseFloat(e.target.value) })
              } 
              placeholder="Income" 
              className="input input-bordered w-full" />
            </div>
            <div className="modal-action">
              <div className="w-full flex justify-between">
                <button className="btn btn-success" onClick={handleSaveExpenses}>Save</button>
                <button className="btn" onClick={handleModal}>Close</button>
              </div>
            </div>
          </div>
        </dialog>
      </main>
    </>

  )
}
