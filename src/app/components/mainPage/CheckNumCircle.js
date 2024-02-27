import { FiCheck } from "react-icons/fi";

export default function CheckNumCircle({isCheck,num}){
    return (
        <div>
            {isCheck[num-1] ? (
                <div className='numbering w-10 h-10 relative'>
                    <div className="circle w-10 h-10 left-0 top-0 absolute bg-green-600 rounded-full" />
                    <FiCheck className="check w-[40px] h-[40px] flex items-center justify-center absolute stroke-white" />
                </div>
            ) : (
                <div className='numbering w-10 h-10 relative'>
                    <div className="circle w-10 h-10 left-0 top-0 absolute bg-white rounded-full" />
                    <div className='w-full h-full flex items-center justify-center absolute text-center text-body1 font-medium font-main leading-[30px] text-black'>{num}</div>
                </div>
            )}

        </div>
    )
}