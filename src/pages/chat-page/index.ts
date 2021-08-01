// import messages from "../../mocks/messages";
// import dialogs from "../../mocks/dialogs";
import ChatPage from "./chat-page";
import render from "../../utils/render";

const page = new ChatPage({ messages: [], dialogs: [] });

render("#app", page);
