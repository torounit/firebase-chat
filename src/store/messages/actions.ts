import actionCreatorFactory from "typescript-fsa"
import { Message } from "./state"

const actionCreator = actionCreatorFactory()

export const add = actionCreator<Message>("ADD_MESSAGE")
export const remove = actionCreator<string>("REMOVE_MESSAGE")
export const fetch = actionCreator<void>("FETCH_MESSAGES")
export const receive = actionCreator<Message[]>("RECEIVE_MESSAGES")
