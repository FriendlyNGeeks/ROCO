import React from "react";

export default function TroubleShoot() {
  
  const ulBlockStyle = {
    paddingInlineStart:"0px"
  }

    return (
      <>
        <div>
          <h1>
            Troubleshoot
          </h1>
          <span>
            Missing/Malform urlParams {"{ baseurl= }"} for socket/webcam call
          </span>
          <div>
            <ul style={ ulBlockStyle }>
              <li>http://192.168.2.XXX</li>
              <li>http://192.168.2.XXX/</li>
              <li>http://10.10.0.XXX:9000</li>
              <li>http://10.10.0.XXX:9000/</li>
              <li>http://octoprint.local</li>
              <li>http://octoprint.local:9000/</li>
            </ul>
          </div>
        </div>
      </>
    );
}
