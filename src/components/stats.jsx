// import React, { Component, useState, useEffect } from "react";
import { useState } from "react";
import { PlotGraph } from './index';

// WDS uses sockjs for hot-reloading, so OctoPrint's socket does not
export default function Stats(props) {

    const [ state, setPrintState ] = useState("");
    const [ progress, setProgress ] = useState("");
    const [ elapsed, setElapsed ] = useState("");
    const [ remaining, setRemaining ] = useState("");
    const [ estimated, setEstimated ] = useState("");
    const [ thumbNailDir, setThumbDir ] = useState("");

    const statsStyle = {
        width: "25%"
    }
    const statsProgressStyle = {
        height: "20px"
    }
    const statsProgressBarStyle = {
        width: progress+"%"
    }
    const statsThumbNailStyle = {
        position: "fixed",
        left: "0px",
        bottom: "0px"
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.round(seconds % 60);
        return [
            h,
            m > 9 ? m : (h ? '0' + m : m || '0'),
            s > 9 ? s : '0' + s
        ].filter(Boolean).join(':');
    };

    props.data[0].subscribe(
        (msg) => {
            if(msg.current){
                setPrintState(msg.current.state.text);
                setProgress(Math.floor(msg.current.progress.completion));
                setElapsed(formatTime(msg.current.progress.printTime));
                setRemaining(formatTime(msg.current.progress.printTimeLeft));
                setEstimated(formatTime(msg.current.job.estimatedPrintTime));
                if (msg.current.job.file.path) {
                    setThumbDir(msg.current.job.file.path.replace(/\.[^/.]+$/, ".png"));   
                }
            }
            // console.log("stats payload: ", msg)
        },
        (err) => console.error(err),
        () => console.log("complete")
    );

    return (
      <>
        <div style={statsStyle} className="text-wrap text-break text-center">
            <div className="px-4 py-2">
                <div className="row">
                    <div className="col border py-3">
                        <b>State:</b>&nbsp;<br />
                        <span id="state">{ state }</span><br />
                    </div>
                    <div className="col border py-3">
                        <b>Progress:</b>&nbsp;
                        <span id="completion">{progress && progress + "%" }</span><br />
                        <div className="progress" style={statsProgressStyle}>
                            <div id="progress-bar" className="progress-bar text-black" role="progressbar" style={statsProgressBarStyle}></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col border py-3">
                        <b>Elapsed:</b>&nbsp;<br />
                        <span id="printTime">{ elapsed }</span><br />
                    </div>
                    <div className="col border py-3">
                        <b>Remaining:</b>&nbsp;<br />
                        <span id="printTimeLeft">{ remaining }</span><br />
                    </div>
                    <div className="col border py-3">
                        <b>Estimated:</b>&nbsp;<br />
                        <span id="estimatedPrintTime">{ estimated }</span><br />
                    </div>
                </div>
            </div>
            <PlotGraph data={ props.data } ></PlotGraph>
            {props.data[1].thumbNail.display && <img alt="no thumb" id="thumbnail" style={ statsThumbNailStyle } className="mx-auto" src={ props.data[1].thumbNail.path + thumbNailDir } />}
        </div>
      </>
    );
}
