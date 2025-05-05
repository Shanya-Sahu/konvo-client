import ChatWindow from "./_components/chat-window";
import Chats from "./_components/chats";
import Sidebar from "./_components/sidebar";

export default function Inbox() {
    return (
        <div>
            <Sidebar />
            <Chats />
            <ChatWindow />
        </div>
    )
}
