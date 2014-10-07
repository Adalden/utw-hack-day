document.getElementById('onBtn').addEventListener('click', function () {
  axios.post('/on');
});

document.getElementById('offBtn').addEventListener('click', function () {
  axios.post('/off');
});

function setColor(obj) {
  axios.post('/color', obj);
};
var dSetColor = debounce(setColor, 300);

document.getElementById('color').addEventListener('change', function () {
  var color = getColor(this.value);
  dSetColor(color);
});


function debounce(fn, time) {
  var id;
  return function (arg1) {
    clearTimeout(id);
    id = setTimeout(function () {
      fn(arg1);
    }, time);
  }
}

function getColor(hex) {
  return {
    r: hexToR(hex),
    g: hexToG(hex),
    b: hexToB(hex)
  }
}

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
