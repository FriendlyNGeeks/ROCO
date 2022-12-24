import React, { useState } from "react";
import moment from 'moment';


export default function Footer(props) {

  const [ currentTime, setCurrentTime ] = useState("");
  let responsiveWidth = 75;

  if (props.data.stats.display === false || props.data.stats.display === "" || props.data.stats.display === null || props.data.stats.display === undefined) {
    responsiveWidth = 100
  }else {
    responsiveWidth = 75
  }
  
  const footerStyle = {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    width: responsiveWidth + "%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"
  }
  


	setInterval(function() {
		setCurrentTime(moment().format('LLLL'))
	}, 1000);

  return (
    <>
      <div id="footer" style={ footerStyle }>
        <div id="clock" className="h3 d-inline-block px-3 py-2 m-0 rounded bg-dark text-monospace">{ currentTime }</div>
      </div>
    </>
  );
}
