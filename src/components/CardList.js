"use client";
import React from 'react'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import { useState, useRef, useEffect } from 'react';

function CardList(onSlideChange) {
    const [showAlertDetail, setShowAlertDetail] = useState(false);
    const [dataListCard, setDataListCard] = useState()
    const [selectCard, setSelectCard] = useState()
    const [dataSaveDetail, setDataSaveDetail] = useState({
        ExpensesId: undefined,
        ExpensesType: undefined,
        ExpensesDesc: undefined,
        ExpensesAmount: undefined,
    })
    const callGetDataCardList = () => {
        axios.get('http://localhost:8080/GetListMoneyCard')
            .then(res => {
                const cardList = res.data;
                setSelectCard(cardList.data[0].ID); //defult first card
                setDataListCard(cardList); // Set the data in the state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const modalDetailRef = useRef(null);
    const handleModalDetail = (e) => {
        if ((e.target.id != NaN && e.target.id != null && e.target.id != '') || isModalDetailOpen) {
            setIsModalDetailOpen(!isModalDetailOpen);
            if (modalDetailRef.current) {
                if (isModalDetailOpen) {
                    setSelectCard();
                    setDataSaveDetail({
                        ExpensesId: '',
                        ExpensesType: '',
                        ExpensesDesc: '',
                        ExpensesAmount: 0,
                    });
                    modalDetailRef.current.close(); // Close the modal
                } else {
                    setSelectCard(e.target.id);
                    setDataSaveDetail({ ...dataSaveDetail, ExpensesId: parseInt(e.target.id) });
                    modalDetailRef.current.showModal(); // Show the modal
                }
            }
        }
    }

    const handleSaveExpensesDetail = () => {
        console.log(dataSaveDetail)

        axios.put('http://localhost:8080/CreateExpensesDetail', dataSaveDetail)
            .then(res => {
                setShowAlertDetail(true);
                setTimeout(() => {
                    modalRef.current.close();
                    setShowAlertDetail(false);
                    // Reset the input values
                    setDataSaveDetail({
                        ExpensesId: undefined,
                        ExpensesType: undefined,
                        ExpensesDesc: undefined,
                        ExpensesAmount: undefined,
                    });
                }, 5000);

                callGetDataCardList();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        callGetDataCardList()
    }, []);

    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
                onSlideChange={onSlideChange}
            >
                {dataListCard ? (
                    dataListCard.data.map((item, index) => (
                        <SwiperSlide onClick={handleModalDetail} id={item.ID} key={item.ID}>
                            <div className="w-full flex justify-between">
                                <div>
                                    <p>{item.ExpensesMonth}</p>
                                    <p className='text-sm font-light'>September</p>
                                </div>
                                <div>{item.ExpensesYear}</div>
                            </div>
                            <br />
                            <h2 className='text-center'>{item.ExpensesBalance.toLocaleString()}</h2>
                            <p className='text-sm text-center font-light'>Balance</p>
                            <br />
                            <hr />
                            <br />
                            <h2 className='text-center'>{item.ExpensesMoney.toLocaleString()}</h2>
                            <p className='text-sm text-center font-light'>Income</p>
                            <br />
                        </SwiperSlide>
                    ))
                ) : (
                    <p>Loading data...</p>
                )}
            </Swiper>

            <dialog ref={modalDetailRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {showAlertDetail && (
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
                            <span>Your transition completed!</span>
                        </div>
                    )}
                    <h3 className="font-bold text-lg">Detail Expenses {selectCard}</h3>
                    <div className="w-full flex justify-between py-4 space-x-4">
                        <select className="select select-bordered w-full max-w-xs"
                            onChange={(e) =>
                                setDataSaveDetail({ ...dataSaveDetail, ExpensesType: e.target.value })
                            }
                            value={dataSaveDetail.ExpensesType}
                        >
                            <option disabled selected>Please select type</option>
                            <option value='FIXCOST'>Fix cost</option>
                            <option value='CREDIT'>Credit</option>
                            <option value='OTHER'>Other</option>
                        </select>
                        <input type="text" placeholder="Description" className="input input-bordered w-full max-w-xs"
                            value={dataSaveDetail.ExpensesDesc}
                            onChange={(e) =>
                                setDataSaveDetail({ ...dataSaveDetail, ExpensesDesc: e.target.value })
                            }
                        />
                    </div>
                    <div className="w-full">
                        <input type="number"
                            value={dataSaveDetail.ExpensesAmount}
                            onChange={(e) =>
                                setDataSaveDetail({ ...dataSaveDetail, ExpensesAmount: parseFloat(e.target.value) })
                            }
                            placeholder="Expense"
                            className="input input-bordered w-full" />
                    </div>
                    <div className="modal-action">
                        <div className="w-full flex justify-between">
                            <button className="btn btn-success" onClick={handleSaveExpensesDetail}>Save</button>
                            <button className="btn" onClick={handleModalDetail}>Close</button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default CardList