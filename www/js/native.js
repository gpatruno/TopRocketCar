function onBatteryStatus(status) {
    console.log("Battery Level Low " + status.level + "%");
  }
  
  const openInAppBrowserOptions = "location=yes,zoom=false";
  
  const openInAppBrowser = (link) => {
    cordova.InAppBrowser.open(link, "_blank", openInAppBrowserOptions);
  };
  
  const deviceReady = () => {
    window.addEventListener("batterystatus", onBatteryStatus, false);
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
  
  
    console.log('Current device is ' + device.platform);
    // access current orientation
    console.log('Orientation is ' + screen.orientation.type);
    if ("browser" == device.platform) {
    } else {
      // set to either landscape
      screen.orientation.lock('portrait-primary');
    }
  };
  
  function onOnline() {
    console.log("La connexion internet est revenu.");
  }
  
  function onOffline() {
    console.log("Vous n'êtes plus connecté a internet.");
  }