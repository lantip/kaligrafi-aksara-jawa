var position = { x: 0, y: window.innerHeight / 2 };
var counter = 0;
var minFontSize = 18;
var angleDistortion = 0;


var letters = ["\u{A9CB}", "\u{A9B1}\u{A9B8}", "\u{A9AB}", "\u{A9A2}\u{A9B6}", "\u{A9AB}", "\u{A997}", "\u{A9AA}", "\u{A9A4}\u{A9B6}\u{A981}", "\u{A9AB}", "\u{A9A0}\u{A9C0}\u{A9AD}\u{A9BC}", "\u{A9A7}\u{A9B8}\u{A982}", "\u{A9A2}\u{A9BA}", "\u{A9A4}\u{A9B6}\u{A981}", "\u{A9A5}", "\u{A994}\u{A9BA}", "\u{A9B1}\u{A9C0}\u{A9A0}\u{A9B8}", "\u{A9A0}\u{A9B6}", "\u{A9C9}"];

// Silakan ubah font di sini sesuai daftar font di asset/fonts. Pilihan saat ini: Istaka, Ngayogyan, NgayogyanJejeg, NewKramawirya.
// Anda bisa tambahkan font lain juga, dengan terlebih dahulu mengubah file styles.css untuk memanggil font-facenya.

var fontFamily = "Ngayogyan";

// Drawing variables
var canvas;
var context;
var mouse = { x: 0, y: 0, down: false }


function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.font = minFontSize + "px " + fontFamily;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mouseout', mouseUp, false);
    canvas.addEventListener('dblclick', doubleClick, false);

    window.onresize = function(event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

function mouseMove(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    draw();
}

function draw() {
    if (mouse.down) {
        var d = distance(position, mouse);
        var fontSize = minFontSize + d / 2;
        var letter = letters[counter];
        var stepSize = textWidth(letter[0], fontSize);

        if (d > stepSize) {
            var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

            context.font = fontSize + "px " + fontFamily;

            context.save();
            context.translate(position.x, position.y);
            context.rotate(angle);
            context.fillText(letter, 0, 0);
            context.restore();

            counter++;
            if (counter > letters.length - 1) {
                counter = 0;
            }

            //console.log (position.x + Math.cos( angle ) * stepSize)
            position.x = position.x + Math.cos(angle) * stepSize;
            position.y = position.y + Math.sin(angle) * stepSize;

        }
    }
}

function distance(pt, pt2) {

    var xs = 0;
    var ys = 0;

    xs = pt2.x - pt.x;
    xs = xs * xs;

    ys = pt2.y - pt.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

function mouseDown(event) {
    mouse.down = true;
    position.x = event.pageX;
    position.y = event.pageY;

    document.getElementById('info').style.display = 'none';
}

function mouseUp(event) {
    mouse.down = false;
}

function doubleClick(event) {
    canvas.width = canvas.width;
}

function textWidth(string, size) {
    context.font = size + "px " + fontFamily;

    if (context.fillText) {
        return context.measureText(string).width;
    } else if (context.mozDrawText) {
        return context.mozMeasureText(string);
    }

};

init();