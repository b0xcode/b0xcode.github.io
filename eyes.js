window.addEventListener("load", function () {
    var intialised;

    var leftEyeBox, rightEyeBox;
    var leftEyeY, rightEyeY, leftEyeX, rightEyeX;
    var leftEye = document.getElementsByClassName("lefteye")[0];
    var rightEye = document.getElementsByClassName("righteye")[0];

    if(typeof initialised == 'undefined') {
        initialised = true;
        leftEyeBox = document.getElementById("left").getBoundingClientRect();
        rightEyeBox = document.getElementById("right").getBoundingClientRect();
        leftEyeY = rightEyeBox.y + 0.5 * rightEyeBox.height;
        rightEyeY = leftEyeY;
        leftEyeX = leftEyeBox.x + (0.5 * leftEyeBox.width);
        rightEyeX = rightEyeBox.x + (0.5 * rightEyeBox.width);

    }

    window.onresize = reinit;
    function reinit(){
        initialised = true;
        leftEyeBox = document.getElementById("left").getBoundingClientRect();
        rightEyeBox = document.getElementById("right").getBoundingClientRect();
        leftEyeY = rightEyeBox.y + 0.5 * rightEyeBox.height;
        rightEyeY = leftEyeY;
        leftEyeX = leftEyeBox.x + (0.5 * leftEyeBox.width);
        rightEyeX = rightEyeBox.x + (0.5 * rightEyeBox.width);
        leftEye.style.left = "14%";
        leftEye.style.top = "28%"; 
        rightEye.style.left = "59%"
        rightEye.style.top = "28%"
    }
    document.onmousemove = mouse;
    function mouse(e) {
        var x, y, xdiff, ydiff, distn, eyeWidth;
        var xOffset, yOffset;
        eyeWidth = leftEyeBox.width;
        y = e.pageY;
        x = e.pageX;

        xdiff = x - leftEyeX;
        ydiff = y - leftEyeY;
        distn = Math.pow(xdiff * xdiff + ydiff * ydiff, 0.5);
        var theta = Math.atan2(ydiff, xdiff);
        if (ydiff <= 0) {
            theta = -theta;
        } else {
            theta = 2 * Math.PI - theta;
        }
        //console.log(theta + " cos(theta): " + Math.cos(theta) + " ydiff: " + ydiff);
        xOffset = eyeWidth / 2 * Math.cos(theta);
        yOffset = eyeWidth / 1.5 * Math.sin(theta);
        if(distn <= eyeWidth*0.6){
            leftEye.style.left = x-leftEyeX+eyeWidth*1.15 + "px";
            leftEye.style.top = y-leftEyeY+eyeWidth*1.4 + "px";
        }else{
            leftEye.style.left = (xOffset + eyeWidth*1.15) + "px";
            leftEye.style.top = (-yOffset + eyeWidth*1.4) + "px";    
        }

        //right
        xdiff = x - rightEyeX;
        ydiff = y - rightEyeY;

        distn = Math.pow(xdiff * xdiff + ydiff * ydiff, 0.5);
        var theta = Math.atan2(ydiff, xdiff);
        if (ydiff <= 0) {
            theta = -theta;
        } else {
            theta = 2 * Math.PI - theta;
        }
        //console.log(theta + " cos(theta): " + Math.cos(theta) + " ydiff: " + ydiff);
        xOffset = (eyeWidth / 1.75 * Math.cos(theta));
        yOffset = eyeWidth / 1.6 * Math.sin(theta);
        if(distn <= eyeWidth*0.6){
            rightEye.style.left = x-rightEyeX+eyeWidth*3.95 + "px";
            rightEye.style.top = y-rightEyeY+eyeWidth*1.4 + "px";
        }else{
            rightEye.style.left = (xOffset + eyeWidth*3.95) + "px";
            rightEye.style.top = (-yOffset + eyeWidth*1.4) + "px";    
        }
        console.log(xOffset);
    }
});
