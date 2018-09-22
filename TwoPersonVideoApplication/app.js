navigator.getWebCam = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
);
window.URL = window.URL || window.mozURL || window.msURL || window.webkitURL;
var peer = new Peer({
  // key: '8zlrr93glgix80k9',
  debug: 3,
  config: {
    'iceServers': [
      { url: 'stun:stun.l.google.com:19302' },
      { url: 'stun:stun1.l.google.com:19302' },
      { url: 'turn:numb.viagenie.ca', username: 'talhanousher@gmail.com', credential: 'hello123' }
    ]
  }
});
console.log(peer);

peer.on('open', function () {
  $('#my-id').text(peer.id);
})

peer.on('call', function (call) {
  call.answer(window.localStream);
  step3(call);
})

$(function () {
  $('#make-call').click(function () {
    var call = peer.call($('#callto-id').val(), window.localStream);
    console.log(call);
    step3(call);
  });
  $('#end-call').click(function () {
    window.existingCall.close();
    step2();
  });
  $('#step1-retry').click(function () {
    $('step1-error').hide();
    step1();
  });

  step1();
})

function step1() {
  // navigator.mediaDevices.getUserMedia({ audio: false, video: true })
  //   .then((stream) => {
  //     console.log(URL.createObjectURL(stream));
  //     if ($('#my-video')[0].srcObject == undefined) {
  //       $('#my-video')[0].srcObject = stream;
  //     }
  //     else{
  //       $('#my-video')[0].prop('src', URL.createObjectURL(stream));
  //       window.localStream = stream;

  //     }
  //     console.log($('#my-video')[0]);
  //     // $('#my-video')[0].play();
  //     step2();
  //   })
  //   .catch(() => {
  //     $('#step1-error').show();
  //   })
  navigator.getWebCam({ audio: false, video: true }, function (stream) {
    // console.log(URL.createObjectURL(stream));
    if ($('#my-video')[0].srcObject == null) {
      $('#my-video')[0].srcObject = stream;
    } else {
      $('#my-video')[0].prop('src', URL.createObjectURL(stream));
    }
    window.localStream = stream;
    console.log($('#my-video')[0]);
    // $('#my-video')[0][0].play();
    step2();
  }, function () {
    $('#step1-error').show();
  });
};

function step2() {
  $('#step1', '#step3').hide();
  $('#step2').show();
}

function step3(call) {
  if (window.existingCall) {
    window.existingCall.close();
  }
  call.on('stream', function (stream) {
    if ($('#their-video')[0].srcObject == null) {
      $('#their-video')[0].srcObject = stream;
    } else {
      $('#their-video')[0].prop('src', URL.createObjectURL(stream));
    }
  });

  $('#step1', '#step2').hide();
  $('#step3').show();
}