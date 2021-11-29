let position = { x: 0, y: window.innerHeight / 2 };
let counter = 0;
let minFontSize = 18;
let angleDistortion = 0;


let letters = ["\u{A9CB}", "\u{A9B1}\u{A9B8}", "\u{A9AB}", "\u{A9A2}\u{A9B6}", "\u{A9AB}", "\u{A997}", "\u{A9AA}", "\u{A9A4}\u{A9B6}\u{A981}", "\u{A9AB}", "\u{A9A0}\u{A9C0}\u{A9AD}\u{A9BC}", "\u{A9A7}\u{A9B8}\u{A982}", "\u{A9A2}\u{A9BA}", "\u{A9A4}\u{A9B6}\u{A981}", "\u{A9A5}", "\u{A994}\u{A9BA}", "\u{A9B1}\u{A9C0}\u{A9A0}\u{A9B8}", "\u{A9A0}\u{A9B6}", "\u{A9C9}"];

// Silakan ubah font di sini sesuai daftar font di asset/fonts. Pilihan saat ini: Istaka, Ngayogyan, NgayogyanJejeg, NewKramawirya.
// Anda bisa tambahkan font lain juga, dengan terlebih dahulu mengubah file styles.css untuk memanggil font-facenya.

let fontFamily = "Ngayogyan";

// Drawing variables
let canvas;
let context;
let mouse = { x: 0, y: 0, down: false };
let touch = { x: 0, y: 0, start: false };


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

    // mobile
    canvas.addEventListener('touchmove', mouseMove, false);
    canvas.addEventListener('touchstart', mouseDown, false);
    canvas.addEventListener('touchend', mouseUp, false);

    window.onresize = function(event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

function mouseMove(event) {
    if (event.type == "touchmove") {
        mouse.x = event.changedTouches[0].pageX;
        mouse.y = event.changedTouches[0].pageY;
    } else {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    }
    draw(event);
}

function draw(e) {
    if (e.type == "touchmove") {
        if (touch.start) {
            let d = distance(position, mouse, e);
            let fontSize = minFontSize + d / 2;
            let letter = letters[counter];
            let stepSize = textWidth(letter[0], fontSize);

            if (d > stepSize) {
                let angle = Math.atan2(e.touches[0].clientY - position.y, e.touches[0].clientX - position.x);

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

    } else {
        if (mouse.down) {
            let d = distance(position, mouse, e);
            let fontSize = minFontSize + d / 2;
            let letter = letters[counter];
            let stepSize = textWidth(letter[0], fontSize);

            if (d > stepSize) {
                let angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

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
}

function distance(pt, pt2, event) {

    var xs = 0;
    var ys = 0;

    if (event.type == "touchmove") {
        xs = event.changedTouches[0].clientX - pt.x;
        xs = xs * xs;
        ys = event.changedTouches[0].clientY - pt.y;
        ys = ys * ys;

    } else {
        xs = pt2.x - pt.x;
        xs = xs * xs;

        ys = pt2.y - pt.y;
        ys = ys * ys;

    }

    return Math.sqrt(xs + ys);
}

function mouseDown(event) {
    mouse.down = true;
    touch.start = true;
    if (event.type == "touchstart") {
        position.x = event.changedTouches[0].pageX;
        position.y = event.changedTouches[0].pageY;
        console.log(position.x);
    } else {
        position.x = event.pageX;
        position.y = event.pageY;

    }
    document.getElementById('info').style.display = 'none';
}

function mouseUp(event) {
    mouse.down = false;
    touch.start = false;
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