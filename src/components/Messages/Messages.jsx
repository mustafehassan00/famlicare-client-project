import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";


function Messages() {
    const dispatch = useDispatch(); 
    const history = useHistory();

    useEffect(() => {
        dispatch({ 
            type: 'FETCH_MESSAGES' 
        });
    },[])

    const messages = useSelector((store) => store.messages)
    // console.log('Message Data is:', messages.message_text)

    return (
        <div>
            <h1>Messages</h1>
            {messages.map (messages => {
                return(
                    <div>
                    <h2>{messages?.user_id}</h2>
                    <p>
                        {messages?.message_text}
                    </p>   
                    </div>
                )
            })}
        </div>
    )
}

export default Messages;
