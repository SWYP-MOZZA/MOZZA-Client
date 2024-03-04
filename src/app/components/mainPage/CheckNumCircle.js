import { FiCheck } from "react-icons/fi";

export default function CheckNumCircle({isCheck,num}){
    return (
        <div>
            {isCheck[num-1] ? (
                <div className='numbering w-10 h-10 relative'>
                    <FiCheck className='w-10 h-10 absolute left-0 top-0 bg-green-600 rounded-full stroke-white p-2'/>
                </div>
            
            ) : (
                <div className='numbering w-10 h-10 relative'>
                    <div className='w-10 h-10 absolute left-0 top-0 bg-white rounded-full stroke-black p-2 text-body1 font-medium font-main text-center leading-6'>{num}</div>
                </div>
            )}

        </div>
    )
}