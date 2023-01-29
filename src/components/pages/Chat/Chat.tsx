import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk";
import { MessageType } from "../../../API/chat-api"
import avatar from '../../../assets/img/avatar.jpg'
import { start, stop, sendMessage } from "../../../redux/chatReducer"
import { appStateType } from "../../../redux/store"
import uuid from 'react-uuid'

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

	const scrollElement = useRef<HTMLDivElement>(null)

	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		dispatch(start())

		return () => {
			dispatch(stop())
		}
	}, [])

	const messages = useSelector((state: appStateType) => state.chat.messages)

	const [isAutoScroll, setIsAutoScroll] = useState(true)

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const element = e.currentTarget;
		if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
			setIsAutoScroll(true)
		} else {
			setIsAutoScroll(false)
		}
	}

	useEffect(() => {
		isAutoScroll && scrollElement.current?.scrollIntoView();
	}, [messages])

	return (
		<div>
			<div onScroll={scrollHandler} className='flex flex-col gap-2 mb-3 h-[350px] pr-2 overflow-auto'>
				{
					messages?.map((message: MessageType, index: number) => {
						return (
							<Message key={uuid()} message={message} index={index} />
						)
					})
				}
				<div ref={scrollElement}></div>
			</div>

			<ChatMessageForm />
		</div >
	)
}

const Message: React.FC<{ message: MessageType, index: number }> = React.memo(({ message, index }) => {
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

const ChatMessageForm: React.FC = ({ }) => {
	const [message, setMessage] = useState<string>('')

	const statusWS = useSelector((state: appStateType) => state.chat.status)

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
			<button disabled={statusWS !== 'ready'} onClick={() => sendMessageHandler(message)} className="border-2 py-1 px-5 rounded-[10px]">Send</button>
		</div>
	)
}