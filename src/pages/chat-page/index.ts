import ChatPage from './chat-page';
import render from '../../utils/render';
import dialogs from '../../mocks/dialogs';
import messages from '../../mocks/messages';

const page = new ChatPage({ messages, dialogs });

render('#app', page);
