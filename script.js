console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Pasoori Nu", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Kya Mujhe Pyaar Hai", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Khuda Jaane", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Loriyan", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Kina Chir", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Aap par Arz Hai", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Excuses", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Zara Zara ", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Barsaat", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Sahara tu mera", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ ////audioElement.addEventListener('timeupdate', () => { ... }): This adds a timeupdate event listener to the audio element. The timeupdate event is triggered when the current playback position of the audio changes. In this case, it's used to update the seek bar.
   // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); //progress = parseInt((audioElement.currentTime / audioElement.duration) * 100): This calculates the current progress of the audio playback as a percentage. It divides the current playback time (audioElement.currentTime) by the total duration of the audio (audioElement.duration), multiplies it by 100, and converts it to an integer using parseInt().
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{//small play buttons work
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{//retrives all the elements from the document that have the same class name as the songItemPlay
    element.addEventListener('click', (e)=>{                                    //then arrays.from this converts the collection of elements into an array we convert it into a class because
        makeAllPlays();                                               //getElementByClass returns HTML Collection and converting it into an array allows us to use methods like for each
        songIndex = parseInt(e.target.id);                          //foreach then iterates over the array and execute the provided function
        e.target.classList.remove('fa-play-circle');       //element.addEventListener('click', (e) => { ... }) adds a click event (when clicked the function will be called)
        e.target.classList.add('fa-pause-circle');//songIndex = parseInt(e.target.id): This line extracts the ID of the clicked element and converts it to an integer using parseInt(). It assumes that the ID represents the index of the song in the songs array.
        audioElement.src = `songs/${songIndex+1}.mp3`;//audioElement.currentTime = 0: This sets the playback time of the audio to the beginning (0 seconds) to start the song from the beginning.
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;//change bottom song index
    masterSongName.innerText = songs[songIndex].songName;//change bottom song name
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})