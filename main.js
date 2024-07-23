/* Las animaciones que he creado para la práctica final son las siguientes:

1- Introducción: al cargar la página aparece un contador que se oculta al finalizar la animación - gsap
2- Menú hamburguesa: en responsive, al hacer clic en el menú hamburguesa aparece el menú oculto, y al hacer clic en la cruz se esconde - evento de click
3- El cursor va acompañado de tres círculos que persiguen al pájaro (cursor) - RAF, movimiento del mouse y función lerp
4- El texto del hero acompaña al usuario al hacer scroll, mientras que el título se escala y se va haciendo más grande - RAF, tl, función map y función clamp
5- Debajo del texto del hero hay un toggle button para cambiar del modo claro al oscuro y a la inversa (al usuario de entrada le aparecen los colores de la landing con el modo que tiene definido en su navegador) - evento de click y transform
6- En la sección "Pricing", he añadido una animación de fondo: diferentes puntos colocados de forma aleatoria que parpadean - función map y gsap 
7- En la sección "Testimonials", he añadido una animación con timeline: los svg flotan en círculo - tl

*/


gsap.config({
  trialWarn: false,
})

//Registro de GSAP
gsap.registerPlugin(CustomEase);

//Funciones

function map(x, a1, a2, b1, b2) {
  return ((x - a1) * (b2 - b1)) / (a2 - a1) + b1
}
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}
function lerp(v1, v2, alpha) {
  return v1 + (v2 - v1) * alpha
}

// Custom Ease
CustomEase.create("custom", "M0,0 C0.041,0.081 0.093,0.292 0.215,0.475 0.306,0.611 0.543,0.529 0.678,0.626 0.814,0.724 0.847,1 1,1 ");

//Intro
const percent = {
	value: 0
}

const span = document.querySelector('.intro span');
const intro = document.querySelector('.intro');

gsap.to(percent, {
	value: 100,
	duration: 3,
	ease: 'power4.out',
	onUpdate: () => {
		const v = percent.value.toFixed(0).padStart(3, '0');
		span.innerText = v;
	},
  onComplete: () => {
    intro.classList.add('hidden');
  }
})

//Hamburger Menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const responsiveNav = document.querySelector('.responsive-nav__bg');
const closeMenu = document.querySelector('.close-menu');

hamburgerMenu.addEventListener('click', function () {
  responsiveNav.classList.add('show');
});

closeMenu.addEventListener('click', function () {
  responsiveNav.classList.remove('show');
});

// Light-Dark Mode
const toggleSwitch = document.querySelector('.toggle-switch');
const switchButton = document.querySelector('.switch');

toggleSwitch.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('dark-mode')) {
        switchButton.style.transform = 'translateX(25px)';
    } else {
        switchButton.style.transform = 'translateX(0px)';
    }
});

// Prefers-color-scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.add('light-mode');
}

//Pricing Section BG
document.addEventListener('DOMContentLoaded', () => {
  const pricingBG = {
    window: document.querySelector('.pricing__bg'),
    spots: document.querySelectorAll('.pricing__bg div')
  };
  
  const rect = pricingBG.window.getBoundingClientRect();
  
  const maxWidth = rect.width;
  const maxHeight = rect.height;
  
  for (const spot of pricingBG.spots) {  
    const r1 = Math.random();
    const x = map(r1, 0, 1, -maxWidth, maxWidth);
  const r2 = Math.random();
    const y = map(r2, 0, 1, -maxHeight, maxHeight);
  
    gsap.set(spot, { x: x, y: y });

    // Animación de parpadeo
    gsap.to(spot, {
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }
  });

// Testimonial svg animation

const shapes = document.querySelectorAll(".testimonial svg");

const tlshapes = gsap.timeline({
	repeat: -1,
	yoyo: true,
	onStart:() => {
		console.log('Start!');
	},
	onComplete: () => {
		console.log('Complete!');
	},
	onRepeat: () => {
		console.log('Repeat!');
	}
});

tlshapes
.to(shapes, {
  y: -5,
	x: 0,
	duration: 1,
	ease: 'linear',
})
.to(shapes, {
  y: -5,
	x: 5,
	duration: 1,
	ease: 'linear',
})
.to(shapes, {
  y: 0,
	x: 5,
	duration: 1,
	ease: 'linear',
})
.to(shapes, {
  y: 5,
  x: 5,
duration: 1,
ease: 'linear',
})
.to(shapes, {
  y: 5,
	x: 0,
	duration: 1,
	ease: 'linear',
})
.to(shapes, {
  y: 5,
	x: -5,
	duration: 1,
	ease: 'linear',
})
.to(shapes, {
  y: 0,
	x: -5,
	duration: 1,
	ease: 'linear',
})
.to(shapes, {
  y: -5,
	x: -5,
	duration: 1,
	ease: 'linear',
})
.to(shapes, {
  y: -5,
	x: 0,
	duration: 1,
	ease: 'linear',
});

// Footer Year
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

// --- VARS DEL RAF
//Cursor
const cursor = document.querySelector('.cursor');

const postitionX = {
  target: 0,
  current: 0,
}
const postitionY = {
  target: 0,
  current: 0,
}

//Hero Text

const heroText = document.querySelector('.hero__content');
const heroTitle = document.querySelector('.hero__title');

const tl = gsap.timeline({
  paused: true,
})

const progress = {
  current: 0,
  target: 0,
}

window.addEventListener('mousemove', (e) => {
  postitionX.target = e.pageX
  postitionY.target = e.pageY
})

// --- RAF
function update() {

  //Cursor
    postitionX.current = lerp(postitionX.current, postitionX.target, 0.5);
    postitionY.current = lerp(postitionY.current, postitionY.target, 0.5);
    const circleOffsetX = 5;
    const circleOffsetY = 5; 
    cursor.style.transform = `translate(${postitionX.current + circleOffsetX}px, ${postitionY.current + circleOffsetY}px)`;

  //Hero text
  const windowH = window.innerHeight

  const totalScroll = document.body.scrollHeight
  const scroll = window.scrollY

  const min = 0
  const max = totalScroll - windowH

  // De altura del scrol la 0-1
  progress.target = map(scroll, min, max, 0, 1)

  // Aproximar current a target
  progress.current = lerp(progress.current, progress.target, 0.1)

  // Convertir de 0-1 a -100, 100
  const mapScale = map(progress.current, 0, 1, 100, 300);
  const clampedScale = clamp(mapScale, 100, 300);
  const mapTranslate = map(progress.current, 0, 1, 50, 700);
  heroText.style.transform = `translateY(${mapTranslate}%)`;
  heroTitle.style.transform = `scale(${mapScale}%)`;


  // Progress tl 0-1
  const progressTl = map(progress.current, 0, 1, 1, 0);
  tl.progress(progressTl)
}

function animate() {
  update()
  requestAnimationFrame(animate)
}
animate()
