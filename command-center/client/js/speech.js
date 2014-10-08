var socket = io.connect();

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

document.getElementById('openBlinds').addEventListener('click', function () {
  sendMsg('open:blinds');
});
document.getElementById('closeBlinds').addEventListener('click', function () {
  sendMsg('close:blinds');
});

var PHRASES = {
  'open the blinds': 'open:blinds',
  'close the blinds': 'close:blinds',
  'turn on the light': 'light:on',
  'turn off the light': 'light:off'
};

var final_transcript;

function startListening() {
  final_transcript = '';
  recognition.start();
}

function recognize() {
  console.log(final_transcript);

  for (var key in PHRASES) {
    if (final_transcript.indexOf(key) > -1) {
      sendMsg(PHRASES[key]);
      break;
    }
  }

  final_transcript = '';
}

function sendMsg(msg) {
  socket.emit('speech:msg', msg);
}

recognition.onstart = function() {
  console.log('onstart');
};

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    }
  }
  recognize();
};

recognition.onerror = function(event) {
  console.log('onerror');
  console.log(event);
};

recognition.onend = function() {
  console.log('onend');
};

startListening();
