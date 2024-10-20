import { FaArrowRight } from "react-icons/fa";
import red from "../assets/red.png";
import white from "../assets/white.png";
import sign from "../assets/sign.png";

const Bannar = () => {
    return (
        <div className="max-w-[1920px] mx-auto ">
            <div className="bg-black flex lg:flex-row flex-col  items-center justify-between gap-5 lg:gap-10 px-5 lg:px-24 py-10 lg:h-[852px]">
                <div className="space-y-3">
                    <h3 className="text-white text-[24px] lg:text-[49px] font-medium uppercase font-montserrat">Patrick Bet-David's  </h3>
                    <h1 className="text-[34px] lg:text-[70px] text-red-500 font-bold uppercase font-montserrat">Signed <br /> Collection</h1>
                    <button className="bg-white  font-medium lg:px-8 py-2 px-5 rounded flex items-center gap-3 justify-center">READ NOW <span className=""><FaArrowRight />
                    </span></button>
                    <img src={sign} alt="" className="w-72 lg:w-full"  />
                </div>
                <div className="flex flex-col sm:flex-row">
                    <img src={red} alt="" className="lg:w-96 w-36" />
                    <img src={white} alt="" className="lg:w-96 w-36" />
                </div>
            </div>
        </div>
    );
};

export default Bannar;