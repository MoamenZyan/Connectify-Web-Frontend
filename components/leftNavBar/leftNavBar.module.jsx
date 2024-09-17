"use client;"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./leftNavBar.module.css";
import { debounce } from "lodash";

import SearchForUsersByName from "@/ApiHelpers/UserAPIs/searchForUsersByName";

import UsersLeft from "../usersLeft/usersLeft.module";
import NotificationModal from "../notificationModal/notificationModal.module";


export default function LeftNavBar({acceptFriendRequest, newNotification, setNewNotification, notifications, currentChat, user, users, getChatInfo}) {
    const [chatTab, setChatTab] = useState(false);
    const [chatUsers, setChatUsers] = useState(user.privateChats.flatMap(chat => chat.users[0]));
    const [searchedUsers, setSearchedUsers] = useState(users);
    const [searchTab, setSearchTab] = useState(false);
    const [notificationContainer, setNotificationContainer] = useState(false);
    const router = useRouter();
    const parentRef = useRef();

    const searchHandler = debounce(async (name) => {
        var result = await SearchForUsersByName(name);
        setSearchedUsers(result.users);
    }, 800);

    useEffect(() => {
        setSearchedUsers(users);
    }, []);



    return (<>
        <div ref={parentRef} className={styles.parent}>
            <div className={styles.logo}>
                <div className={styles.logo_wrapper}>
                    <img src="/icons/connectify-icon-white.svg" width={30} height={30}/>
                    <h1>Connectify</h1>
                </div>
            </div>
            <div className={`${styles.tabs} ${chatTab || searchTab ? styles.left : styles.normal}`}>
                <div onClick={() => {setSearchTab(true)}} className={styles.tab}>
                    <div>
                        <img src="/icons/search-icon-white.svg" width={25} height={25}/>
                        <h3>Search</h3>
                    </div>
                </div>
                <div onClick={() => {setChatTab(true)}} className={styles.tab}>
                    <div>
                    <img src="/icons/friends-icon-white.svg" width={25} height={25}/>
                        <h3>Friends</h3>
                    </div>
                    <div>
                        <span>{user.privateChats.length}</span>
                    </div>
                </div>
                <div className={styles.tab}>
                    <div>
                        <img src="/icons/groups-icon-white2.svg" width={25} height={25}/>
                        <h3>Groups</h3>
                    </div>
                    <div>
                        <span>{user.groupChats.length}</span>
                    </div>
                </div>
            </div>
            <div className={`${styles.hiddenTab} ${styles.searchTab} ${searchTab ? styles.normal : styles.left}`}>
                <img onClick={() => {setSearchTab(false)}} className={styles.arrow_left} src="./icons/left-arrow-white.svg" width={30} height={30}/>
                <h4 className={"sans-text"}>Search</h4>
                <div>
                    <input onChange={(e) => {e.target.value.length == 0 ? setSearchedUsers(users) : searchHandler(e.target.value)}} className={"mono-text"}  placeholder="Enter user name"/>
                </div>
                <UsersLeft currentChat={currentChat} getChatInfo={getChatInfo} users={searchedUsers}/>
            </div>
            <div className={`${styles.hiddenTab} ${chatTab ? styles.normal : styles.left}`}>
                <img onClick={() => {setChatTab(false)}} className={styles.arrow_left} src="./icons/left-arrow-white.svg" width={30} height={30}/>
                <h4 className={"sans-text"}>Users</h4>
                <UsersLeft currentChat={currentChat} getChatInfo={getChatInfo} users={chatUsers}/>
            </div>
            {notificationContainer && <div className={styles.notification_wrapper}>
                <NotificationModal acceptFriendRequest={acceptFriendRequest} notifications={notifications} />
            </div>}
            <div className={`${styles.user_card}`}>
                <div className={styles.user_card_wrapper}>
                    <div>
                        <img className={styles.user_photo} src={user.photo == "" ? "/icons/profile-icon-white.svg" : user.photo}/>
                        {newNotification && <span></span>}
                    </div>
                    <div className={styles.info}>
                        <div>
                            <h5>{user.fullName}</h5>
                            <p>Your status</p>
                        </div>
                        <div className={styles.icon_div}>
                            <div onClick={() => {router.push("/settings")}}>
                                <img src="/icons/settings-icon-white.svg" width={30} height={30}/>
                            </div>
                            <div onClick={() => {
                                setNotificationContainer(!notificationContainer);
                                setNewNotification(false);
                                }}>
                                <img src="/icons/inbox-icon-white.svg" width={30} height={30}/>
                                {newNotification && <span></span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}