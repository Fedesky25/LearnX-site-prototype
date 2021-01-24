const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player1;
function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('podcast1', {});
}

document.querySelectorAll('.podcast__timestamps button[data-time]').forEach(el=>{
    el.addEventListener('click', e=>{
        player1.seekTo(parseInt(el.getAttribute('data-time')));
        player1.playVideo();
    })
})

// water mark handler
const water = document.querySelector('.water');
let ticking = false;
document.addEventListener('scroll', ()=>{
    if(!ticking){
        requestAnimationFrame(()=>{
            water.style.bottom = `${window.scrollY/120}rem`
            ticking = false;
        })
        ticking = true;
    }
})