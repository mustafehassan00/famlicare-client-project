import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:5173");

function Messages() {
    return(
        <div></div>
    )
}

export default Messages;
