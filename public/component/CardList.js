"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

//import './globals.css';

// import required modules
import { EffectCards } from 'swiper/modules';
import { useState, useRef } from 'react';

function CardList() {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const modalDetailRef = useRef(null);
    const handleModalDetail = () => {
        setIsModalDetailOpen(!isModalDetailOpen);
        if (modalDetailRef.current) {
          if (isModalDetailOpen) {
            modalDetailRef.current.close(); // Close the modal
          } else {
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
                <SwiperSlide onClick={handleModalDetail}>
                    <div className="w-full flex justify-between">
                        <div>
                            <p>09</p>
                            <p className='text-sm font-light'>September</p>
                        </div>
                        <div>2023</div>
                    </div>
                    <br />
                    <h2 className='text-center'>31,029.29 $</h2>
                    <p className='text-sm text-center font-light'>Balance</p>
                    <br />
                    <hr />
                    <br />
                    <h2 className='text-center'>34,000 $</h2>
                    <p className='text-sm text-center font-light'>Income</p>
                    <br />
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>

            <dialog ref={modalDetailRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Detail Expenses</h3>
                    <p className="py-4">Add your detail</p>
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