import styles from "./rightBox.module.css";
import Presentation from "../presentation/presentation.module";
import Chat from "../chat/chat.module";

export default function RightBox({
                                sentFriendRequests, 
                                handleSendingFriendRequest,
                                numberOfUnSeenMessages, 
                                setUnSeenMessagesTrigger, 
                                unSeenMessagesTrigger, 
                                onStopTyping, 
                                onStartTyping, 
                                scroll, 
                                sendMessage, 
                                currentUser, 
                                receiverUser, 
                                globalChat, 
                                setChatTrigger, 
                                chatTrigger}) {

    return(<>
        <div className={styles.parent}>
            {receiverUser == null ? <Presentation /> :
            <Chat 
                sentFriendRequests={sentFriendRequests}
                handleSendingFriendRequest={handleSendingFriendRequest}
                numberOfUnSeenMessages={numberOfUnSeenMessages} 
                setUnSeenMessagesTrigger={setUnSeenMessagesTrigger} 
                unSeenMessagesTrigger={unSeenMessagesTrigger} 
                onStopTyping={onStopTyping} 
                onStartTyping={onStartTyping} 
                setChatTrigger={setChatTrigger} 
                chatTrigger={chatTrigger} 
                scroll={scroll} 
                globalChat={globalChat} 
                receiverUser={receiverUser} 
                sendMessage={sendMessage} 
                currentUser={currentUser}
            />}
        </div>
    </>);
}