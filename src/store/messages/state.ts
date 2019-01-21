import { reducerWithInitialState } from "typescript-fsa-reducers"
import { add, receive, remove } from "./actions"

export interface Message {
  content: string
  authorUid?: string
  id: string
  replyTo?: number
  createdAt?: number
}

const initialState: Message[] = []

export const reducer = reducerWithInitialState(initialState)
  .case(
    add,
    (state: Message[], payload: { thread: string; message: Message }): Message[] => {
      return [...state, payload.message]
    }
  )
  .case(remove, (state: Message[], payload: { thread: string; id: string }) => state.filter(o => o.id !== payload.id))
  .case(
    receive,
    (state: Message[], payload: Message[]): Message[] => {
      return payload
    }
  )
