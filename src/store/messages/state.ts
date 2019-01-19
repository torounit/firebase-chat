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
  .case(add, (state: Message[], payload: Message): Message[] => [...state, payload])
  .case(remove, (state: Message[], id: string) => state.filter(o => o.id !== id))
  .case(receive, (state: Message[], payload: Message[]): Message[] => {
    console.log(payload);
    return payload;
  })
