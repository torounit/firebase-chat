import { reducerWithInitialState } from "typescript-fsa-reducers"
import { add, remove } from "./actions"

export interface Message {
  content: string
  authorUid?: string
  id?: string,
  replyTo?: number,
  createdAt?: number,
}


const initialState: Message[] = []

export const reducer =  reducerWithInitialState(initialState)
  .case(
    add,
    (state: Message[], payload: Message): Message[] => {
      return [...state, payload]
    }
  )
  .case(remove, (state: Message[], message: Message) => {
    return state.filter(o => o.id !== message.id)
  })
