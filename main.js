img = "";
objects = [];
statuss = "";

function preload(){
    song = loadSound("alarm.mp3");
}
function setup(){
    canvas = createCanvas(450, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Website Detecting";
    document.getElementById("found").innerHTML = "loading"; 
    song.pause();
}
   
function modelLoaded(){
    console.log("modelLoaded!");
    statuss = true;
}
function gotResult(error, results)
{
    if(error) {
        console.log(error);
    } 
     console.log(results);
     objects = results;
}
function draw(){
    image(video, 0, 0, 450, 400);
    
    if(statuss != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status - Baby Dectected";
            document.getElementById("found").innerHTML = "Baby can be seen"; 

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 25);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x + 15, objects[i].y + 15, objects[i].width, objects[i].height);
            song.setVolume(0);
        }
    } else {
        document.getElementById("status").innerHTML = "Status - Baby NOT Dectected";
        document.getElementById("found").innerHTML = "Baby CANNOT be seen"; 

        song.play();
        song.setVolume(1);
        song.rate(1);
    }
     if (objects.length < 0)
     {
        document.getElementById("status").innerHTML = "Status - Baby NOT Dectected";
        document.getElementById("found").innerHTML = "Baby CANNOT be seen"; 

        song.play();
        song.setVolume(1);
        song.rate(1); 
      
    }
}