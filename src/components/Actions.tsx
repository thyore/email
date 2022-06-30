import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../store";
import { FiChevronLeft, FiChevronRight, FiFilter, FiTrash } from "react-icons/fi";
import { IoMdSave, IoMdTrash } from "react-icons/io";

const Actions = (props: any) => {
    const dispatch = useDispatch<Dispatch>();

    const handleChange = (event:any) => {
        if (event.target.checked) {
            dispatch.Mail.selectAllIds();
        } else {
            dispatch.Mail.unselectAllIds();
        }
    }

    const handleSave = () => {
        dispatch.Mail.addToSavedMails();
        dispatch.Mail.resetSelectedIds();
    }

    const handleDelete = () => {
        dispatch.Mail.deleteMail();
        dispatch.Mail.resetSelectedIds();
    }

    return (
        <div className="flex justify-between items-center mx-5 py-3 border-b border-gray-200">
            <div className="flex justify-center items-center">
                <input id="default-checkbox" type="checkbox" onChange={(event)=> handleChange(event)} className="mr-3 w-3 h-3 text-blue-600 bg-gray-100 rounded border border-gray-100"/>
                <button onClick={()=> handleSave()} type="button" className="mr-3 text-green-500 bg-green-100 border border-green-500 focus:outline-none font-medium rounded text-xs px-3 hover:bg-green-500 hover:text-white flex items-center">SAVE <IoMdSave className="ml-2"/></button>
                <button type="button" className="mr-2 text-gray-500 bg-gray-100 border border-gray-300 focus:outline-none font-medium rounded text-xs px-3 hover:bg-gray-500 hover:text-white flex items-center">MANAGE FILTERS <FiFilter className="ml-2" color="#2c2c2c"/></button>
                <span className="mr-2 text-gray-200 text-xl">|</span>
                <button onClick={()=> handleDelete()} type="button" className="mr-3 text-red-500 bg-red-100 border border-red-500 focus:outline-none font-medium rounded text-xs px-3 hover:bg-red-500 hover:text-white flex items-center">DELETE
                    <div className="bg-red-600 ml-2 rounded-full h-3 w-3 flex justify-center items-center">
                        <IoMdTrash size={10} color="white"/>
                    </div>
                </button>
            </div>
            <div className="flex">
                <FiChevronLeft className="cursor-pointer" color="#6B7280"/>
                <p className="text-xs text-gray-500 mx-3">50 of 150</p>
                <FiChevronRight className="cursor-pointer" color="#6B7280"/>
            </div>
        </div>
    )
}

export default Actions;