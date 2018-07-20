// var localVideo = document.getElementById('localVideo');
// console.log(localVideo)
navigator.getWebCam = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
navigator.getWebCam(
    { video: true, audio: true },
    function (stream) {
        // console.log(window.URL.createObjectURL(stream));
        console.log(localVideo)

        localVideo.src = window.URL.createObjectURL(stream);
        localVideo.play();

        console.log(stream.getVideoTracks());
        var track = stream.getVideoTracks()[0];
        var details = document.getElementById('details');
        details.innerHTML = 'Stream Id : ' + stream.id + "<br>";
        details.innerHTML += 'Ready State : ' + track.readyState + "<br>";
        details.innerHTML += 'Track Id : ' + track.id + "<br>";
        details.innerHTML += "Kind : " + track.kind;
    },
    function (err) {
        console.log(err);
    }
)