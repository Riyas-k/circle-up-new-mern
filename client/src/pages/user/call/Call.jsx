import React from "react";
import Header from "../../../components/user/Header/Header";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result = result + chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const Call = () => {
  const { roomId } = useParams();
  const userId = randomID(5);
  const userName = randomID(5);
  const Meeting = async (element) => {
    const appId = parseInt("668946755");
    const serverSecret = "c874683048fe0a62555c4a3984e1b7db";
    const kit = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      userId,
      userName
    );
    const zc = ZegoUIKitPrebuilt.create(kit.toString());
    zc.joinRoom({
      container:element,
      sharedLinks:[
        {
          name:'Copy Link',
          url:`https://circle-up.online/room/${roomId}`,

        }
      ],
      scenario:{
        mode:ZegoUIKitPrebuilt.OneONoneCall
      },
      showScreenSharingButton:true
    })
  };
  return (
    <>
      <Header />
       <div style={{padding:'5rem'}} ref={Meeting}/>
    </>
  );
}; 

export default Call;
