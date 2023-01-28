import { Dispatch } from "redux";
import chatAPI, { MessageType, StatusType } from "../API/chat-api";
import { AppThunkType, InferActionTypes } from "./store";

const initialState = {
	messages: [] as Array<MessageType>,
	status: 'pending' as StatusType,
}

type StateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionTypes): StateType => {
	switch (action.type) {
		case 'best/charReducer/MESSAGE_RECEIVED':
			return {
				...state,
				messages: [...state.messages, ...action.messages],
			}
		case 'best/charReducer/STATUS_CHANGED':
			return {
				...state,
				status: action.status,
			}
		case 'best/charReducer/CLEAR_MESSAGES':
			return {
				...state,
				messages: []
			}
		default:
			return state
	}
}

export default chatReducer

const actions = {
	messageReceived(messages: MessageType[]) {
		return {
			type: 'best/charReducer/MESSAGE_RECEIVED',
			messages,
		} as const
	},
	statusChanged(status: StatusType) {
		return {
			type: 'best/charReducer/STATUS_CHANGED',
			status
		} as const
	},
	clearMessages() {
		return {
			type: 'best/charReducer/CLEAR_MESSAGES'
		} as const
	}
}

let _statusChangeHandler: ((status: StatusType) => void) | null = null;

const statusChangeHandlerCreator = (dispatch: Dispatch) => {
	if (!_statusChangeHandler) {
		_statusChangeHandler = (status: StatusType) => {
			dispatch(actions.statusChanged(status))
		}
	}
	return _statusChangeHandler;
}

let _messageReceivedHandler: ((messages: MessageType[]) => void) | null = null;
const messageReceivedHandlerCreator = (dispatch: Dispatch) => {
	if (!_messageReceivedHandler) {
		_messageReceivedHandler = (messages: MessageType[]) => {
			dispatch(actions.messageReceived(messages))
		}
	}
	return _messageReceivedHandler;
}

export const start = (): AppThunkType<ActionTypes, void> => (dispatch) => {
	chatAPI.start()
	chatAPI.subscribe('message-received', messageReceivedHandlerCreator(dispatch))
	chatAPI.subscribe('status-changed', statusChangeHandlerCreator(dispatch))
}

export const stop = (): AppThunkType<ActionTypes, void> => (dispatch) => {
	chatAPI.stop()
	dispatch(actions.clearMessages())
}

export const sendMessage = (message: string): AppThunkType<ActionTypes, void> => (dispatch) => {
	chatAPI.send(message)
}

