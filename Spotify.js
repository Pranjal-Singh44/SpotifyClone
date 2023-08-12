let songIndex=0;
let audioElement=new Audio("songs/1.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:"They Mad", filePath:"songs/3.mp3", coverPath:"covers/3.jpg", duration:"04:33"},
    {songName:"Song Title", filePath:"songs/5.mp3", coverPath:"covers/5.jpg", duration:"03:28"},
    {songName:"The Safety Dance", filePath:"songs/6.mp3", coverPath:"covers/6.jpg", duration:"03:28"},
    {songName:"Back It Up", filePath:"songs/7.mp3", coverPath:"covers/7.jpg", duration:"04:33"},
    {songName:"True Love", filePath:"songs/10.mp3", coverPath:"covers/10.jpg", duration:"04:27"}
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerText=songs[i].duration;
})
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(songIndex.toString()).style.backgroundColor="aqua";
    }
    else{
        audioElement.pause();
        gif.style.opacity=0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})
document.addEventListener('keydown', function(event){
    if(event.key==" " && (audioElement.paused || audioElement.currentTime<=0))
    {
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        flag=true;
        document.getElementById(songIndex.toString()).style.backgroundColor="aqua";
    }
    else if(event.key==" " && audioElement.played)
    {
        audioElement.pause();
        gif.style.opacity=0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})
Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        songIndex=parseInt(e.target.id);
        console.log(songIndex);
        audioElement.src="songs/"+(songIndex+1)+".mp3";
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        document.getElementById("songPlaying").innerHTML=songs[songIndex].songName;
        Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
            element.style.backgroundColor="white";
        });
        e.target.style.backgroundColor="aqua";
    })
})
document.getElementById("next").addEventListener('click',()=>{
    document.getElementById(songIndex.toString()).style.backgroundColor="white";
    if(songIndex>=songs.length-1)
    {
        songIndex=0;
    }
    else
    {
        songIndex++;
    }
    audioElement.src="songs/"+(songIndex+1)+".mp3";
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById("songPlaying").innerHTML=songs[songIndex].songName;
    document.getElementById(songIndex.toString()).style.backgroundColor="aqua";
})
document.getElementById("previous").addEventListener('click',()=>{
    document.getElementById(songIndex.toString()).style.backgroundColor="white";
    if(songIndex<=0)
    {
        songIndex=songs.length-1;
    }
    else{
        songIndex--;
    }
    audioElement.src="songs/"+(songIndex+1)+".mp3";
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById("songPlaying").innerHTML=songs[songIndex].songName;
    document.getElementById(songIndex.toString()).style.backgroundColor="aqua";
})
audioElement.addEventListener('ended',()=>{
    document.getElementById(songIndex.toString()).style.backgroundColor="white";
    songIndex++;
    audioElement.src="songs/"+(songIndex+1)+".mp3";
    audioElement.currentTime=0;
    audioElement.play();
    document.getElementById("songPlaying").innerHTML=songs[songIndex].songName;
    document.getElementById(songIndex.toString()).style.backgroundColor="aqua";
})