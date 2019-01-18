import actionCreatorFactory from "typescript-fsa"
import { Message } from "./state"

const actionCreator = actionCreatorFactory()

export const add = actionCreator<Message>("ADD_MESSAGE")
export const remove = actionCreator<Message>("REMOVE_MESSAGE")
