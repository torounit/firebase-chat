import actionCreatorFactory from "typescript-fsa"
import { Message } from "./state"

const actionCreator = actionCreatorFactory()

export const add = actionCreator<{ thread: string; message: Message }>("ADD_MESSAGE")
export const remove = actionCreator<{ thread: string; id: string }>("REMOVE_MESSAGE")
export const receive = actionCreator<Message[]>("RECEIVE_MESSAGES")
export const subscribe = actionCreator<string>("SUBSCRIBE_MESSAGES")
