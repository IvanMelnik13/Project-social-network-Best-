import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { MessageType } from "../../../API/chat-api";
import avatar from '../../../assets/img/avatar.jpg';
import { start, stop, sendMessage } from "../../../redux/chatReducer";
import { appStateType } from "../../../redux/store";

type AppDispatch = ThunkDispatch<appStateType, any, AnyAction>;

const ChatPage: React.FC = () => {

	return (
		<div className="p-4">
			<Chat />
		</div>
	)
}

export default React.memo(ChatPage);

const Chat: React.FC = () => {

	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		dispatch(start())

		return () => {
			dispatch(stop())
		}
	}, [])

	const messages = useSelector((state: appStateType) => state.chat.messages)

	return (

		<div>
			<div className='flex flex-col gap-2 mb-3'>
				{
					messages?.map((message: MessageType, index: number) => {
						return (
							<div key={index} className='text-start p-1 border-2 rounded-[7px]'>
								<div className='flex mb-1 gap-2'>
									<NavLink className='w-[50px] h-[50px] rounded-[50%] overflow-hidden border-2 border-red-700' to={`/profile/${message.userId}`}>
										<img src={message.photo || avatar} />
									</NavLink>
									<div>
										{message.userName}
									</div>
								</div>
								<div>
									{message.message}
								</div>
							</div>
						)
					})
				}
			</div>

			<ChatMessageForm />
		</div >
	)
}

const ChatMessageForm: React.FC = ({ }) => {
	const [message, setMessage] = useState<string>('')

	const dispatch: AppDispatch = useDispatch()

	const onChange = (message: string) => {
		setMessage(message)
	}

	const sendMessageHandler = (message: string) => {
		if (message) {
			dispatch(sendMessage(message))
		}
		setMessage('')
	}

	return (
		<div className="text-start">
			<textarea value={message} onChange={(e) => onChange(e.currentTarget.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 mb-2 resize-none focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" name=""></textarea>
			<button onClick={() => sendMessageHandler(message)} className="border-2 py-1 px-5 rounded-[10px]">Send</button>
		</div>
	)
}