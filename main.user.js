// ==UserScript==
// @name Spotify to Apple Music
// @namespace https://github.com/edeeeen
// @version 0.1
// @description  Converts spotify links to apple music links
// @match https://open.spotify.com/album/*
// @match https://open.spotify.com/track/*
// @grant GM_xmlhttpRequest
// ==/UserScript==

(async function() {
    var urlName = (window.location.href).split(".")
    var x = urlName[2].split("?")[0].split("/")
    if (x[1].localeCompare("track") != -1) {
        //use track api
        urlName = urlName[0].slice(0, 8) + "api" + "." + urlName[1] + "." + x[0] + "/v1/tracks/" + x[2]
    } else {
        //use album api
        urlName = urlName[0].slice(0, 8) + "api" + "." + urlName[1] + "." + x[0] + "/v1/album/" + x[2]
    }
    console.log(urlName)
    //call the api on the track (albums dont work)
    const response = await GM_xmlhttpRequest({
        method: 'GET',
        url: urlName,
        headers: {
            /////////////////////////////////////////////////////PUT YOURE TOKEN HERE/////////////////////////////////////////////////////
            "Authorization": "Bearer REPLACEMEWITHYOURTOKEN",
            'Content-Type':'application/json',
        },
        onload: function(response) {
            //copied from the greasemonkey wiki basically
            var responseXML = null;
            if (!response.responseXML) {
              responseXML = new DOMParser()
                .parseFromString(response.responseText, "text/xml");
            }
            var XMLResp = JSON.parse(response.responseText)
            console.log([
                response.status,
                response.statusText,
                response.readyState,
                response.responseHeaders,
                //response.responseText,
                response.finalUrl,
                responseXML
            ].join("\n"));
            //did this here because it doesnt wanna run anything outside this function and idk why and 
            //didnt figure it out because this project is dead now
            var songName = XMLResp["artists"][0]["name"]
            var albumName = XMLResp["album"]["name"]
            var artistName = XMLResp["name"]
            console.log(songName)
            console.log(albumName)
            console.log(artistName)

        }
    });
})();
