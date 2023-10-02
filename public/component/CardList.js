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

function CardList() {
    const [dataListCard, setDataListCard] = useState()
    const [selectCard, setSelectCard] = useState()
    const callGetDataCardList = () => {
        axios.get('http://localhost:8080/GetListMoneyCard')
          .then(res => {
            const cardList = res.data;
            setDataListCard(cardList); // Set the data in the state
        })
          .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    useEffect(() => {
        callGetDataCardList()
    }, []);

    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const modalDetailRef = useRef(null);
    const handleModalDetail = (e) => {
        setIsModalDetailOpen(!isModalDetailOpen);
        if (modalDetailRef.current) {
            if (isModalDetailOpen) {
                setSelectCard();
                modalDetailRef.current.close(); // Close the modal
            } else {
                setSelectCard(e.target.id);
                modalDetailRef.current.showModal(); // Show the modal
            }
        }
    }

    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
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
                    <h3 className="font-bold text-lg">Detail Expenses</h3>
                    <p className="py-4">Add your detail {selectCard}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={handleModalDetail}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default CardList