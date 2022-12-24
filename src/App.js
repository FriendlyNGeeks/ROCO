import React from 'react';
import axios from "axios";
import { Header, Footer, CamEmbed, Stats, TroubleShoot } from './components/index';
import { webSocket } from "rxjs/webSocket";
import './App.css';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let baseurl = "";
let socket = "";
const isValidUrl = (urlString) => {
  let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}
if (isValidUrl(urlParams.get('baseurl'))) {
  console.log(isValidUrl(urlParams.get('baseurl')))
  baseurl = urlParams.get('baseurl').replace(/\/$/, '');
  socket = webSocket("ws://" + baseurl.replace(/^https?:\/\//, '') + "/sockjs/websocket");
}else {
  console.log(isValidUrl(urlParams.get('baseurl')))
  baseurl = null;
  socket = null;
}

const apikey = urlParams.get('apikey');
const fileName = urlParams.get('filename');
const stats = urlParams.get('stats');
const thumbNail = urlParams.get('thumb');
// const socket = webSocket("ws://" + baseurl.replace(/^https?:\/\//, '') + "/sockjs/websocket");

// ASYNC TOP LEVEL WEBPACK OCTOPRINT RXJS SOCKET INIT TO PASS PROPS TO COMPONENTS TO LISTEN
const passiveLogin = async () => {
  const res = await axios.post(
    baseurl + "/api/login?passive=true&apikey=" + apikey
  );
  const auth = res.data.name + ":" + res.data.session;
  console.log(auth);
  socket.next({ auth: auth });
}

const config = {
  urlCheck: {
    display: false,
    path: ""
  },
  fileName: {
    display: false,
  },
  stats: {
    display: false,
  },
  thumbNail: {
    display: false,
    path: "/plugin/UltimakerFormatPackage/thumbnail/",
  }
}

if (baseurl === null || baseurl === "" || baseurl === undefined) {
  config.urlCheck.display = false;
}else {
  config.urlCheck.display = true;
  config.urlCheck.path = baseurl;
  // CALL ASYNC TOP LVL
  passiveLogin()
}

if (fileName === "false") {
  config.fileName.display = false;
}else {
  config.fileName.display = true;
}

if (stats === "false" || stats === "" || stats === null || stats === undefined) {
  config.stats.display = false;
}else {
  config.stats.display = true;
}

if (thumbNail === "false" || thumbNail === "" || thumbNail === null || thumbNail === undefined) {
  config.thumbNail.display = false;
}else {
  config.thumbNail.display = true;
}


function App() {
  return (
    <div className="App">
      {!config.urlCheck.display && <TroubleShoot />}
      {config.urlCheck.display && config.stats.display && <Stats  data={ [socket, config] }/>}
      {config.urlCheck.display && <CamEmbed data={ config }/>}
      {config.urlCheck.display && <Header data={ [socket, config] }/>}
      {config.urlCheck.display && <Footer data={ config }/>}
    </div>
  );
}

export default App;
