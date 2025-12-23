import messages from "../messages/en.json";

type Messages = typeof messages;

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof Messages;
    }
  }
}
