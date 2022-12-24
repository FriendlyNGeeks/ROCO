import React, { useState } from "react";

export default function Header(props) {

  const [ fileName, setFileName ] = useState("Let's Print Some Stuff!");
  let responsiveWidth = 75;

  if (props.data[1].stats.display === false || props.data[1].stats.display === "" || props.data[1].stats.display === null || props.data[1].stats.display === undefined) {
    responsiveWidth = 100
  }else {
    responsiveWidth = 75
  }

  const headerStyle = {
    position: "absolute",
    top: "0px",
    right: "0px",
    width: responsiveWidth + "%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"
  }

  props.data[0].subscribe(
    (msg) => {
        if(msg.current){
        setFileName(msg.current.job.file.name);
        }
        // console.log("message received: ", msg)
        // console.log("payload updated: ", msg)
    },
    (err) => console.error(err),
    () => console.log("complete")
  );
    return (
      <>
        <div id="header" style={ headerStyle }>
          {props.data[1].fileName.display && <div id="filename" className="h3 d-inline-block px-3 py-2 m-0 rounded bg-dark text-monospace">{ fileName }</div>}
        </div>
      </>
    );
}
