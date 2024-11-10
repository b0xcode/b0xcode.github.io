window.ondragstart = function () { return false };
window.addEventListener("load", function () {
    var initialised;

    var leftEyeBox, rightEyeBox;
    var leftEye = document.getElementById("left-eye");
    var rightEye = document.getElementById("right-eye");
    var leftEyeY, rightEyeY, leftEyeX, rightEyeX;

    if(typeof initialised == 'undefined') initialise();
    this.window.onresize = initialise;


    document.onmousemove = mouse;

    function mouse(e){
        moveEye(leftEyeX, leftEyeY, leftEye, e);
        moveEye(rightEyeX, rightEyeY, rightEye, e);
    }

    function initialise(){
        initialised = true;
        leftEyeBox = leftEye.getBoundingClientRect();
        rightEyeBox = rightEye.getBoundingClientRect();
        leftEyeY = leftEyeBox.y + 0.5*leftEyeBox.height;
        rightEyeY = rightEyeBox.y + 0.5*rightEyeBox.height;
        leftEyeX = leftEyeBox.x + 0.5*leftEyeBox.width;
        rightEyeX = rightEyeBox.x + 0.5*rightEyeBox.width;
    }

    function moveEye(eyeX, eyeY, eye, e){
        var x, y, xdiff, ydiff, distn, xOffset, yOffset;
        var eyeWidth = leftEyeBox.width;
        y = e.pageY;
        x = e.pageX;
        xdiff = x - eyeX;
        ydiff = y - eyeY;
        distn = Math.pow(xdiff * xdiff + ydiff * ydiff, 0.5);
        var theta = Math.atan2(ydiff, xdiff);
        if (ydiff <= 0) {
            theta = -theta;
        } else {
            theta = 2 * Math.PI - theta;
        }
        xOffset = eyeWidth / 2 * Math.cos(theta);
        yOffset = eyeWidth / 2 * Math.sin(theta);
        
        if(distn <= eyeWidth*0.6){
            eye.style.translate = -(eyeX-x) +"px "+ -(eyeY-y) + "px";
        }else{
            eye.style.translate = (xOffset) +"px "+ (-yOffset) + "px";   
        }
    }

});