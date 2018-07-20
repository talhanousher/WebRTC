var myPeerConnection;
var remotePeerConnection;

var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;

navigator.getWebCam = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

navigator.getWebCam(
    { video: true, audio: false },
    function (stream) {
        localVideo.src = window.URL.createObjectURL(stream);
        localVideo.play();
        var track = stream.getVideoTracks()[0];
        var details = document.getElementById('details');
        details.innerHTML = 'Stream Id : ' + stream.id + "<br>";
        details.innerHTML += 'Ready State : ' + track.readyState + "<br>";
        details.innerHTML += 'Track Id : ' + track.id + "<br>";
        details.innerHTML += "Kind : " + track.kind;
        createPeerConnection(stream);
    },
    function (err) {
        console.log(err);
    }
)


function createPeerConnection(stream) {
    myPeerConnection = new PeerConnection(null);
    console.log('Created local peer connection object myPeerConnection');

    remotePeerConnection = new PeerConnection(null);
    console.log('Created remote peer connection object remotePeerConnection');

    myPeerConnection.onicecandidate = gotMyIceCandidate;
    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;

    myPeerConnection.addStream(stream);
    console.log('Added Local stream to myPeerConnection');
    remotePeerConnection.onaddstream = gotRemoteStream;

    myPeerConnection.createOffer(gotlocalDescription, createOfferError);
    console.log('Created SDP offer on myPeerConnection');
}


function gotMyIceCandidate(event) {
    console.log('EVENT : ', event);
    if (event.candidate) {
        remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        console.log('Sent My Ice Candidates to remotepeerConnections');
    }
}


function gotRemoteIceCandidate(event) {
    console.log('EVENT : ', event);
    if (event.candidate) {
        myPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        console.log('Sent Remote Ice Candidates to myPeerConnections');
    }
}

function gotlocalDescription(description) {
    myPeerConnection.setLocalDescription(description);
    console.log('created offer from myPeerConnection');
    remotePeerConnection.setRemoteDescription(description);
    remotePeerConnection.createAnswer(gotremoteDescription,createAnswerError);
}

function createAnswerError() {
    console.log('createAnswerError')
}
function gotremoteDescription(description) {
    remotePeerConnection.setLocalDescription(description);
    console.log('Got answer from remotePeerConnection');
    myPeerConnection.setRemoteDescription(description);
}
function gotRemoteStream(event) {
    console.log(event);
    theirVideo.src = URL.createObjectURL(event.stream);
    theirVideo.play();
    console.log('Got Remote Stream');
}
function createOfferError() {
    console.log("createOfferError");
}