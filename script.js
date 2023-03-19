'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navLinks = document.querySelector('.nav__links');
const tab = document.querySelector('.operations__tab');
const operationContainer = document.querySelector('.operations__tab-container');
const operationContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  // console.log(id);
  if (e.target.classList.contains('nav__link')) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const eventHandler = function (e) {
  const links = e.target;
  const navLink = links.closest('.nav').querySelectorAll('.nav__link');
  const logo = links.closest('.nav').querySelector('.nav__logo');
  // if (!links.classList.contains('nav__link')) return;

  navLink.forEach(el => {
    if (el !== links) el.style.opacity = this;
  });
  logo.style.opacity = this;
};
nav.addEventListener('mouseover', eventHandler.bind(0.5));

nav.addEventListener('mouseout', eventHandler.bind(1));

const callback = entries => {
  // const [entry] = entries;
  entries.forEach(entry => {
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
    // console.log(entries);
    // console.log(entry);
  });
};
const obeserverHeight = nav.getBoundingClientRect().height;

const observer = new IntersectionObserver(callback, {
  root: null,
  rootMargin: `-${obeserverHeight}px`,
  threshold: 0,
});
observer.observe(header);

const callBack = (entries, observe) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(callBack, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

const imgLoad = (entries, observe) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
    observe.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(imgLoad, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

const allImg = document.querySelectorAll('img[data-src]');
allImg.forEach(img => {
  imgObserver.observe(img);
});

operationContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  tab.forEach(el => el.classList.remove('operations__tab--active'));
  operationContent.forEach(c =>
    c.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// const header = document.querySelector('header');

// // const buttonAll = document.getElementsByTagName('button');
// // console.log(buttonAll);
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cooked for improved functionality <button class="btn btn--close-cookie">Got it</button>';
// header.append(message);
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function () {
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
const slide = function () {
  // const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const slideBtnRight = document.querySelector('.slider__btn--right');
  const slideBtnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  const maxSlide = slides.length - 1;
  let curSlide = 0;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(d => {
      d.classList.remove('dots__dot--active');
      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    });
  };

  const goSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  const init = function () {
    goSlide(0);
    createDots();
    activeDot(0);
  };
  init();

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goSlide(curSlide);
    activeDot(curSlide);
  };
  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goSlide(curSlide);
    activeDot(curSlide);
  };

  slideBtnRight.addEventListener('click', nextSlide);
  slideBtnLeft.addEventListener('click', previousSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
  });
};
slide();
