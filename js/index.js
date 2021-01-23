const nav = document.getElementById('nav');
const header = document.querySelector('header')
document.querySelectorAll('.fader').forEach(element=>{
    fade(element);
    const duration = element.getAttribute('data-duration');
    element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
})
function appear(target){
    target.style.opacity = 1;
    target.style.transform = 'translate(0)';
}
function fade(target){
    const translation = target.getAttribute('data-translation');
    target.style.opacity = 0;
    target.style.transform = (translation) ? `translate(${translation})` : 'translateX(-100%)';
}

const headerObs = new IntersectionObserver(entries=>{entries.forEach(entry=>{
    if(entry.isIntersecting) fade(nav); else appear(nav);
})}, {rootMargin: '-30px 0px 0px 0px'});

window.addEventListener('resize', e=>{
    if(window.innerWidth > 900) {nav.classList.add('fader'); headerObs.observe(header);}
    else {nav.classList.remove('fader'); headerObs.unobserve(header);}
})

document.querySelectorAll('nav a[href^="#"]').forEach(element=>{
    const target = document.getElementById(element.getAttribute('href').slice(1));
    element.addEventListener('click', e=>{e.preventDefault(); smoothScrollTo(target, 30, 600); target.blur();});
})

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

const navToggler = document.getElementById('nav-toggler');
const contents = document.querySelectorAll('header, section, footer');
let navOpen = false;
navToggler.addEventListener('click', e=>{
    function close() {
        nav.classList.remove('show');
        contents.forEach(el=>{el.removeEventListener('touchend', close);});
        navOpen=false;
    }
    if(navOpen) {close();}
    else {
        nav.classList.add('show');
        contents.forEach(el=>{el.addEventListener('touchend', close)});
        navOpen=true;
    }
});