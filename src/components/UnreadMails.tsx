import { FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IMail } from "../models/mail";
import { RootState } from "../store";
import Mail from "./Mail";


const UnreadMails = (props: any) => {
    const { unreadMails } = useSelector((state: RootState) => state.Mail);

    return (
        <div className="flex flex-col mx-5 py-3">
            <div className="flex justify-between items-center">
                <p className="text-xs text-gray-300 py-2">Unread</p>
                {unreadMails.length ? <button className="w-7 h-7 text-white rounded-full text-sm bg-gray-300 flex justify-center items-center">{unreadMails.length} <FiChevronDown className="-mr-1" size={10}/></button>: ''}
            </div>
            <div>
                {unreadMails.length ? unreadMails.map((mail: IMail, key)=> <Mail key={key} mail={mail}/>) : ''}
            </div>
        </div>
    )

}

export default UnreadMails;