#!/bin/bash
# Anthony Lester
# https://github.com/FriendlyNGeeks

closingRemarks() {
    echo "Web-browser to https://$OCTOPRINT/static/index.html?baseurl=https://$OCTOPRINT/&apikey=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx to verify that it works."
    echo "Add the above URL to a Browser source in OBS Studio. Make sure to set the browser size to 1920x1080."
    echo "If you're not using a valid certificate with HTTPS, you might need to change the URL scheme to HTTP."
}

unpackDeploy() {
    # Check for existing zip and delete it
    FILE=$HOME/oprint/lib/$currentPythonVer/site-packages/octoprint/static/ROCO.zip
    if test -f "$FILE"; then
        echo "$FILE exists."
        sudo rm ROCO.zip && echo "Duplicate Zip has been removed" || error "Could not remove the Zip"
    else
        # Download new zip and unpack
        sudo wget https://github.com/FriendlyNGeeks/ROCO/releases/download/roco/ROCO.zip && echo "Source Code Zip has been downloaded" || error "Could not download Source Code zip"
        sudo unzip ROCO.zip && echo "Zip has been unpacked" || error "Could not unpack the Zip directory"
        sudo rm ROCO.zip && echo "Original Zip has been deleted" || error "Could not remove the Zip"
        closingRemarks
    fi
}

switch2OctoprintStatic() {
    # Fetch octoprint current python diretory
    cd $HOME/oprint/lib/
    currentPythonVer="$( bash <<EOF
    ls
EOF
    )"
    # Change to static directory
    cd $HOME/oprint/lib/$currentPythonVer/site-packages/octoprint/static
    unpackDeploy
}

checkInternet() {
    printf "Checking if you are online..."
    wget -q --spider http://github.com
    if [ $? -eq 0 ]; then
        echo "Online. Continuing."
        switch2OctoprintStatic
    else
        error "Offline. Go connect to the internet then run the script again."
    fi
}

main() {
    checkInternet
}
# START SCRIPT
main
