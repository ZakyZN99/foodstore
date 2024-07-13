import React from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios';


const PaymentPage = () => {
    let navigate = useNavigate();

    const backToCheckout = () => {
        navigate('/checkout')
    }



    return (
        <>
            <Navbar/>

            <div class="bg-[#F8F8F8] px-[100px] py-[32px] flex gap-[50px]">

                <div class="w-[70%] h-full border-[2px] bg-[#FFFFFF] border-[#CCC4B4] px-[32px] py-[32px]">
                        <div className='py-[20px]'>
                            <button className="bg-[#FA4A0C] flex items-center justify-center gap-[10px] border-[2px] border-[#FA4A0C] font-semibold text-[#fff] h-[35px] rounded-xl w-[120px] hover:bg-[#FFF] hover:text-[#FA4A0C]" onClick={backToCheckout}><FaArrowLeft />Back</button>
                        </div>
                        {/* E-Wallet */}
                        <div class="flex gap-[400px]">
                            <div>
                                <h1 class="open-sans font-semibold text-[20px]">E-Wallet</h1>
                                <div class="flex items-center pt-[20px]">
                                <input type="radio" id="Dana" name="payment-method" value="dana" class="mr-[10px]" />
                                    <label for="dana" class="flex items-center">
                                        <img src="../../assets/img/payment/Dana.png" alt="Dana" class="w-[58px] mr-[10px]" />
                                        <span class="text-[16px] text-[#642C0C] open-sans font-semibold">Dana</span>
                                    </label>
                                </div>
                                <div class="flex items-center pt-[20px]">
                                    <input type="radio" id="OVO" name="payment-method" value="OVO" class="mr-[10px]" />
                                        <label for="OVO" class="flex items-center">
                                            <img src="../../assets/img/payment/Ovo.png" alt="OVO" class="w-[58px] mr-[10px]" />
                                            <span class="text-[16px] text-[#642C0C] open-sans font-semibold">OVO</span>
                                        </label>
                                </div>
                                <div class="flex items-center pt-[20px]">
                                    <input type="radio" id="Gopay" name="payment-method" value="Gopay" class="mr-[10px]" />
                                        <label for="Gopay" class="flex items-center">
                                            <img src="../../assets/img/payment/GoPay.png" alt="Gopay" class="w-[58px] mr-[10px]" />
                                            <span class="text-[16px] text-[#642C0C] open-sans font-semibold">GoPay</span>
                                        </label>
                                </div>
                                <div class="flex items-center pt-[20px]">
                                    <input type="radio" id="shopeepay" name="payment-method" value="shopeepay" class="mr-[10px]" />
                                        <label for="shopeepay" class="flex items-center">
                                            <img src="../../assets/img/payment/ShopeePay.png" alt="shopeepay" class="w-[58px] mr-[10px]" />
                                            <span class="text-[16px] text-[#642C0C] open-sans font-semibold">ShopeePay</span>
                                        </label>
                                </div>
                                <div class="flex items-center pt-[20px]">
                                    <input type="radio" id="linkaja" name="payment-method" value="linkaja" class="mr-[10px]" />
                                        <label for="linkaja" class="flex items-center">
                                            <img src="../../assets/img/payment/LinkAja.png" alt="linkaja" class="w-[58px] mr-[10px]" />
                                            <span class="text-[16px] text-[#642C0C] open-sans font-semibold">LinkAja</span>
                                        </label>
                                </div>
                            </div>
                            {/* <!-- ATM/Transfer BANK --> */}
                            <div>
                                <h1 class="open-sans font-semibold text-[20px]">ATM/Bank Transfer</h1>
                                <div class="flex items-center pt-[20px]">
                                <input type="radio" id="BNI" name="payment-method" value="BNI" class="mr-[10px]" />
                                    <label for="BNI" class="flex items-center">
                                        <img src="../../assets/img/payment/Bank_Central_Asia.png" alt="BNI" class="w-[58px] mr-[10px]" />
                                        <span class="text-[16px] text-[#642C0C] open-sans font-semibold">Bank Central Asia (BNI)</span>
                                    </label>
                                </div>
                                <div class="flex items-center pt-[20px]">
                                    <input type="radio" id="BNI" name="payment-method" value="BNI" class="mr-[10px]" />
                                        <label for="BNI" class="flex items-center">
                                            <img src="../../assets/img/payment/BNI.png" alt="BNI" class="w-[58px] mr-[10px]" />
                                            <span class="text-[16px] text-[#642C0C] open-sans font-semibold">Bank Negara Indonesia (BNI)</span>
                                        </label>
                                </div>
                                <div class="flex items-center pt-[20px]">
                                    <input type="radio" id="BRI" name="payment-method" value="BRI" class="mr-[10px]" />
                                        <label for="BRI" class="flex items-center">
                                            <img src="../../assets/img/payment/BRI.png" alt="BRI" class="w-[58px] mr-[10px]" />
                                            <span class="text-[16px] text-[#642C0C] open-sans font-semibold">Bank Rakyat Indonesia (BRI)</span>
                                        </label>
                                </div>
                                <div class="flex items-center pt-[20px]">
                                    <input type="radio" id="mandiri" name="payment-method" value="mandiri" class="mr-[10px]" />
                                        <label for="mandiri" class="flex items-center">
                                            <img src="../../assets/img/payment/Mandiri.png" alt="mandiri" class="w-[58px] mr-[10px]" />
                                            <span class="text-[16px] text-[#642C0C] open-sans font-semibold">Mandiri</span>
                                        </label>
                                </div>
                                <div class="flex items-center pt-[20px]">
                                    <input type="radio" id="permatabank" name="payment-method" value="permatabank" class="mr-[10px]" />
                                        <label for="permatabank" class="flex items-center">
                                            <img src="../../assets/img/payment/PermataBank.png" alt="permatabank" class="w-[58px] mr-[10px]" />
                                            <span class="text-[16px] text-[#642C0C] open-sans font-semibold">Permata Bank</span>
                                        </label>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="w-[30%] h-[350px] border-[2px] bg-[#FFFFFF] border-[#CCC4B4] px-[32px] py-[32px]">
                    <div class="flex gap-[16px]">
                        <input type="text" placeholder="Insert Voucher Code" class="w-[80%] h-[50px] text-[16px] border-[#CCC4B4] px-[10px] border-[2px] open-sans text-[#642C0C]"/>
                        <button class="border-[#642C0C] border-[2px] text-[#642C0C] text-[20px] font-extrabold w-[76px] h-[50px]">Use</button>
                    </div>
                    <a href="#"> <p class="open-sans text-[#000000]">View available vouchers</p></a>
                    <hr class="bg-[#D9D9D9] justify-center my-[24px] h-[2px]"/>
                    <div class="flex justify-between">
                        <h2 class="open-sans font-normal text-[16px] text-[#642C0C]">Total</h2>
                        <h2 class="text-[#000] open-sans font-normal text-[16px]">Rp. sadasd</h2>
                    </div>
                    <hr class="bg-[#D9D9D9] justify-center my-[24px] h-[2px]"/>
                    <div class="">
                        <button class=" h-[51px] bg-[#C0772C] w-full text-[#FFFFFF] font-extrabold text-[20px]">Pay Now</button>
                    </div>
                </div>
        </div>
        </>
    )
}

export default PaymentPage