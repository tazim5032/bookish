import { FaArrowRight } from "react-icons/fa";
import red from "../assets/red.png";
import sign from "../assets/sign.png";

const Bannar = () => {
    return (
        <div className="container mx-auto">
            <div className="bg-black flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10 px-5 lg:px-10 py-10 lg:h-[852px]">
                {/* Left Section */}
                <div className="space-y-3 text-center lg:text-left">
                    <h3 className="text-white text-[24px] lg:text-[49px] font-medium uppercase font-montserrat">
                        Patrick Bet-David's
                    </h3>
                    <h1 className="text-[34px] lg:text-[70px] text-red-500 font-bold uppercase font-montserrat">
                        Signed <br /> Collection
                    </h1>
                    <button className="bg-white font-medium lg:px-8 py-2 px-5 rounded flex items-center gap-3 justify-center mx-auto lg:mx-0">
                        READ NOW
                        <span>
                            <FaArrowRight />
                        </span>
                    </button>
                    <img src={sign} alt="Signature" className="w-40 sm:w-48 md:w-56 lg:w-auto mx-auto lg:mx-0" />
                </div>

                {/* Right Section */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <img src={red} alt="Red Image" className="w-36 sm:w-48 lg:w-96 mx-auto" />
                    
                </div>
            </div>
        </div>
    );
};

export default Bannar;
