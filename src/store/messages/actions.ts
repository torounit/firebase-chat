import actionCreatorFactory from "typescript-fsa"
import { Message } from "./state"

const actionCreator = actionCreatorFactory()

export const add = actionCreator<Message>("ADD_MESSAGE")
export const remove = actionCreator<string>("REMOVE_MESSAGE")
export const receive = actionCreator<Message[]>("RECEIVE_MESSAGES")
export const subscribe = actionCreator<void>("SUBSCRIBE_MESSAGES")
