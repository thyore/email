import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMail } from "../models/mail";
import { RootState, Dispatch } from "../store";
import { MdOutlineDragIndicator } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";

interface State {
    mail: IMail,
    isSaved?: boolean,
    props?: any
}

const Mail = ({mail, isSaved = false, ...props}: State) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const dispatch = useDispatch<Dispatch>();
    const { selectedIds } = useSelector((state: RootState) => state.Mail);

    const formatDate = moment(mail.date).format('MMMM DD, YYYY [at] h:mmA');
    const sentDate = moment(mail.date).format('DD MMM YYYY hh:mm A');
    const fwdDate = moment(mail.date).format('ddd, MMM D, YYYY [at] hh:mm A');
    const getDay = moment(mail.date).format('DD');
    const getMonth = moment(mail.date).format('MMM');

    const handleChange = (event: boolean) => {
        dispatch.Mail.getSelectedIds(event, mail.id);
    }

    const renderUncollapsedLayout = () => {
        return (
            <div className={`flex items-center justify-between cursor-pointer ${isCollapsed ? 'pt-1 pb-2' : ''} `} onClick={()=> setIsCollapsed(prev=> !prev)}>
                <div className={`flex items-center ${isSaved ? 'opacity-60': ''}`}>
                    <MdOutlineDragIndicator className="mr-2" color="#374151" size={20}/>
                    <input 
                        id="default-checkbox"  
                        type="checkbox" 
                        checked={selectedIds && selectedIds.includes(mail.id)} 
                        onClick={(event)=> event?.stopPropagation()} 
                        onChange={(e)=> handleChange(e.target.checked)} 
                        value={mail.id} 
                        className="mr-3 w-3 h-3 text-blue-600 bg-gray-100 rounded border border-gray-100"
                    />
                    <button className={`flex-shrink-0 rounded-full w-3 h-3 ${isSaved ? 'bg-red-600' :'bg-green-600'} mr-3`}></button>
                    <div className="text-center bg-gray-50 py-1 px-2 border rounded mr-3">
                        <p className="text-sm font-semibold text-gray-700 ">{getDay}</p>
                        <p className="text-xs -mt-1 text-gray-700 ">{getMonth}</p>
                    </div>
                    <div className="text-center bg-gray-500 text-white flex items-center justify-center w-8 h-8 py-1 px-2 border rounded-full mr-3">
                    <p className="text-sm">TA</p>
                    </div>
                    <div>
                        <div className="flex items-center flex-wrap">
                            <p className="text-md font-semibold text-gray-700 mr-1">Fwd: {mail.subject.name}</p>
                            <p className="text-sm font-semibold text-gray-700">{`{${mail.subject.code}}`}</p>
                        </div>
                        <div className="flex items-center flex-wrap">
                            <p className="text-sm mr-1 text-gray-500">{mail.sender.name}</p>
                            <p className="text-sm mr-1 text-gray-500">{`<${mail.sender.email}>`}</p>
                            <p className="text-sm mr-1 text-gray-500">{`| ${formatDate}`}</p>
                            {mail.attachments &&
                            <div className="flex items-center">
                                <span className="text-sm text-gray-400 mr-1">| </span>
                                <IoMdAttach className="text-cyan-400"/>
                                <p className="text-sm text-cyan-400">{`${mail.attachments}`}</p>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className={`flex items-center ${isSaved ? 'opacity-60': ''}`}>
                    {!isCollapsed && <div className="flex flex-col items-end mr-3">
                        <button className="px-2 text-cyan-500 py-0.5 my-0.5 bg-cyan-50 border border-cyan-500 focus:outline-none font-medium rounded-md text-xs">{mail.tags[0]}</button>
                        <div>
                            <button className="mr-1 py-0.5 my-0.5 px-2 text-cyan-500 bg-cyan-50 border border-cyan-500 focus:outline-none font-medium rounded-md text-xs">{mail.tags[1]}</button>
                            <button className="font-semibold px-1.5 py-0.5 my-0.5 text-cyan-500 bg-cyan-50 border border-cyan-500 focus:outline-none font-medium rounded-md text-xs">{mail.tags.length - 2}+</button>
                        </div>
                    </div>}
                    <div className="flex text-center items-center bg-yellow-50 py-1 px-2 rounded-md mr-3">
                        <AiOutlineClockCircle className="mr-1" color="#FACC15"/>
                        <p className="text-xs text-yellow-400">{Math.floor(Math.random() * 21) + 1} hrs</p>
                    </div>
                    {isCollapsed ? <FiChevronDown color="#9CA3AF" size={25}/> : <FiChevronRight color="#9CA3AF" size={25}/>}
                </div>
            </div>
        )
    };

    const renderCollapsedLayout = () => {
        return (
            <div className="border-t border-dotted mx-2 mt-2 pt-3">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-md text-gray-800">{mail.sender.name}</p>
                        <p className="text-md text-gray-400">{sentDate}</p>
                    </div>
                    <div className="flex">
                        {mail.tags.map((tag, key) => <button key={key} className="mr-1 px-2 text-cyan-500 py-0.5 my-0.5 bg-cyan-50 border border-cyan-500 focus:outline-none font-medium rounded-md text-xs">{tag}</button>)}
                    </div>
                </div>
                <div className="flex flex-col mt-5">
                    <p className="text-sm text-gray-600">------Forwarded Message------</p>
                    <div className="text-sm text-gray-600">
                        From: 
                        <b className="mx-1">{mail.sender.name}</b>
                        <a className="cursor-pointer text-blue-700">{`<${mail.sender.email}>`}</a>
                    </div>
                    <p className="text-sm text-gray-600">Date: {fwdDate}</p>
                    <p className="text-sm text-gray-600">Subject: {mail.subject.name} {`{${mail.subject.code}}`}</p>
                    <div className="text-sm flex text-gray-600">
                        To: 
                        <p className="mx-1">{mail.receiver.name}</p>
                        <a className="text-blue-700">{`<${mail.receiver.email}>`}</a>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className={`my-3 px-2 py-3 rounded-lg bg-white ${isSaved ? '': 'border border-gray-100'}`}>
            {renderUncollapsedLayout()}
            {isCollapsed && renderCollapsedLayout()}
        </div>
    )

}

export default Mail;