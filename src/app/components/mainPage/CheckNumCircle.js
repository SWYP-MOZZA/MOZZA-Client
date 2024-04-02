import { FiCheck } from 'react-icons/fi';

export default function CheckNumCircle({ isCheck, num }) {
    return (
        <div>
            {isCheck[num - 1] ? (
                <div className="numbering md:w-10 md:h-10 relative sm:w-4 sm:h-4">
                    <FiCheck className="md:w-10 md:h-10 sm:w-4 sm:h-4 absolute left-0 top-0 bg-green-600 rounded-full stroke-white md:p-2 sm:p-0 sm:leading-[15px]" />
                </div>
            ) : (
                <div className="numbering md:w-10 md:h-10 sm:w-4 sm:h-4 relative">
                    <div className="md:w-10 md:h-10 sm:w-4 sm:h-4 absolute left-0 top-0 bg-white rounded-full stroke-black md:p-2 sm:p-0 md:text-body1 sm:text-sm_body1 font-medium font-main text-center md:leading-6 sm:leading-[15px]">
                        {num}
                    </div>
                </div>
            )}
        </div>
    );
}
