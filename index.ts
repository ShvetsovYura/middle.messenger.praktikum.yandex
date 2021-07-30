import ChatMessage from "./src/components/chat-message/chat-message";
import MessagesPanel from "./src/components/messages-container/messages-container";
import ChatPage from "./src/pages/chat-page/chat-page";
import render from "./src/utils/render";
import messages from "./src/mocks/messages";
// const page = new MessagesPanel();

const page = new ChatPage({ messages: messages });
render("#app", page);
