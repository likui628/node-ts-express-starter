import MessageResponse from './message-response'

export default interface ErrorResponse extends MessageResponse {
  stack?: string
}
