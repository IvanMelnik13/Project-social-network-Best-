let wsChannel: WebSocket | null = null

//subscribers
const subscribers = {
	'message-received': [] as MessageReceivedSubscriberType[],
	'status-changed': [] as StatusChangesReceivedSubscriberType[],
}

//Handlers
const openHandler = () => {
	subscribers['status-changed'].forEach(subscriber => subscriber('ready'))
}
const closeHandler = () => {
	subscribers['status-changed'].forEach(subscriber => subscriber('pending'))
	clearHandlers()
	wsChannel?.close()
	setTimeout(createChannel, 3000)
}
const errorHandler = () => {
	subscribers['status-changed'].forEach(subscriber => subscriber('error'))
	console.error('Oops... Some mistake. Refresh the page.')
}
const messageHandler = (e: MessageEvent) => {
	const data = JSON.parse(e.data)
	subscribers['message-received'].forEach(subscriber => subscriber(data))
}

//clear handlers
const clearHandlers = () => {
	wsChannel?.removeEventListener('open', openHandler)
	wsChannel?.removeEventListener('close', closeHandler)
	wsChannel?.removeEventListener('error', errorHandler)
	wsChannel?.removeEventListener('message', messageHandler)
}

//create ws channel: 1) set status pending 2) close prev ws channel, clear handlers (events listeners) 3) create new ws channel, add events listeners
const createChannel = () => {
	subscribers['status-changed'].forEach(subscriber => subscriber('pending'))
	wsChannel?.close()
	clearHandlers()
	wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
	wsChannel.addEventListener('open', openHandler)
	wsChannel.addEventListener('close', closeHandler)
	wsChannel.addEventListener('error', errorHandler)
	wsChannel.addEventListener('message', messageHandler)
}

const chatAPI = {
	subscribe(event: EventNamesTypes, callback: MessageReceivedSubscriberType | StatusChangesReceivedSubscriberType) {
		//@ts-ignore
		subscribers[event].push(callback)
	},
	unsubscribe(event: EventNamesTypes, callback: MessageReceivedSubscriberType | StatusChangesReceivedSubscriberType) {
		//@ts-ignore
		subscribers[event] = subscribers[event].filter(subscriber => subscriber !== callback)
	},
	start() {
		createChannel()
	},
	stop() {
		Object.keys(subscribers).forEach(key => {
			subscribers[key as keyof typeof subscribers] = []
		})
		clearHandlers()
		wsChannel?.close()
	},
	send(message: string) {
		wsChannel?.send(message)
	}
}

export default chatAPI

type EventNamesTypes = keyof typeof subscribers

type MessageReceivedSubscriberType = (message: MessageType[]) => void
type StatusChangesReceivedSubscriberType = (status: StatusType) => void

export type MessageType = {
	userId: number
	photo: string | null
	userName: string | null
	message: string | null
}
export type StatusType = 'pending' | 'error' | 'ready'