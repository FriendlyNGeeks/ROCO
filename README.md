<h1 align="center">
 <img
  width="180"
  alt="json API"
  src="https://github.com/FriendlyNGeeks/PiVAC/raw/main/public/pivac_logo.png">
    <br/>
    [ROCO]
</h1>

<h4 align="center">
 An attempt to make a <strong>REACT-ive Octoprint Camera Overlay</strong>.
</h4>

<p align="center">
 <strong>
  <a href="#getting-started">Getting started</a>
 </strong>
</p>
<p align="center">
 <a href="https://opensource.org/licenses/Apache-2.0" target="_blank"><img
  alt="License: Apache 2"
  src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"></a>
  <a href="https://discord.gg/eNKquhG" target="_blank"><img
  alt="Discord chat"
  src="https://img.shields.io/discord/324774009847808000?color=%235865f2&label=Discord&style=flat"></a>
  <a href="https://github.com/FriendlyNGeeks/ROCO/releases/download/roco/ROCO.zip" target="_blank"><img
  alt="Download ROCO"
  src="https://img.shields.io/badge/Download-pivac.zip-orange"></a>
 <a href="https://github.com/awesome-selfhosted/awesome-selfhosted" target="_blank"><img
  alt="Awesome"
  src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg"></a>
</p>

<p align="center">
 <img src="https://raw.githubusercontent.com//friendlyngeeks/pivac/main/public/dashjson_screenshot.png" width="100%"  alt="json API">
</p>
<p align="center">
 <img src="https://github.com/FriendlyNGeeks/PiVAC/raw/main/public/deploy_screenshot.jpg" width="100%"  alt="json API">
</p>
<p align="center">
 <img src="https://github.com/FriendlyNGeeks/PiVAC/raw/main/public/display_screenshot.jpg" width="100%"  alt="json API">
</p>
<p align="center">
 <img src="https://github.com/FriendlyNGeeks/PiVAC/raw/main/public/assemble_screenshot.jpg" width="100%"  alt="json API">
</p>

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Trouble Shoot](#trouble-shoot)
- [Caveats](#caveats)

## Getting Started
React Octoprint Camera Overlay

Inspired from the [octoprint-stream-overlay](https://github.com/daschu117/octoprint-stream-overlay) created by [Davi - daschu117](https://twitter.com/daschu117). Was looking to stream octoprint camera from raspberry pi zero to a restreamer docker container on (rPi4) when I came across this nifty overlay. The only things it was missing were toggles for information/stats or fullscreen camera. A little elbow grease and I think we got something stable enough to share. If anyone is interested in throwing together a multicam react page shoot me a message and I can invite you to source project.

## Installation

1. SSH into octoprint host
2. cd /oprint/lib/pythonX.X/site-packages/octoprint/static
3. wget https://github.com/FriendlyNGeeks/ROCO/releases/download/roco/ROCO.zip
4. unpack zip
5. Web-browser to https://$OCTOPRINT/static/index.html?baseurl=https://$OCTOPRINT/&apikey=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx to verify that it works.
3. Add the above URL to a Browser source in OBS Studio. Make sure to set the browser size to 1920x1080.
4. If you're not using a valid certificate with HTTPS, you might need to change the URL scheme to HTTP.

## Configuration

This html can be deployed directly from octoprint or local computer. Thumbnail mapping was changed to find thumbnails for the [Cura thumbnails plugin](https://plugins.octoprint.org/plugins/UltimakerFormatPackage/). Filename defaults to [true] if not defined in urlParam. Fullscreen camera toggles on stats= [false]

- urlParams
```default_config.json
# Stored in uri parameters

  http://127.0.0.1:5500/?baseurl=http://192.168.X.XXX/&apikey=4200C94E947843XXXXXXXXXXXXXXXXXXX&stats=true&filename=true&thumb=true

  baseurl=http://192.168.X.XXX | http://octoprint.local
  apikey=4200C94E947843XXXXXXXXXXXXXXXXXXX
  stats=true
  filename=true
  thumb=true
```
## Trouble Shoot

- Missing/Malform urlParams { baseurl= }
```automount.sh
  http://192.168.2.XXX
  http://192.168.2.XXX/
  http://10.10.0.XXX:9000
  http://10.10.0.XXX:9000/
  http://octoprint.local
  http://octoprint.local:9000/
```
- Malform urlParams 
```automount.sh
  Please double check for and remove any camelCase in your url. All parameters should be lowercase
```

## Caveats
This overlay was written to be exactly 1920x1080 canvas size in OBS Studio. 

The camera feed is explicitly 4:3 for the taller FOV mode of the Raspberry Pi Cam V2.
I'm running my raspi cam fV2 at 720x480 30FPS, which has the full FOV of the sensor.
The camera image is scaled to 1440px wide, which results in some of the vertical image being scaled past the viewport.
https://picamera.readthedocs.io/en/release-1.12/fov.html

The information sidebar is 480px wide. The thumbnail image is 4:3 at 480x360.
