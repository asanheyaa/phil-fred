// burger-menu
const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', (e) => {
	burgerMenu.classList.toggle('_active');
	document.querySelector('.header-menu').classList.toggle('_active');
	document.body.classList.toggle('_lock');
});




// hero home animation

const firstSwithButton = document.querySelector('.hero-home__switcher-01'),
	secondSwitchButton = document.querySelector('.hero-home__switcher-02'),
	header = document.querySelector('.header');



if (firstSwithButton) {

	let homeHeroTl = gsap.timeline({
		paused: true,
		onReverseComplete: () => {
			gsap.to('.hero-home__slide-01 .hero-home__pizza-image', {
				scale: 1,
				autoAlpha: 1,
				duration: .5
			})

			gsap.set('.hero-home__slide-02 .hero-home__pizza-image', {
				scale: .9,
				autoAlpha: 0
			})
			header.classList.add('header-dark')
			header.classList.remove('header-white')
		},
		onComplete: () => {
			gsap.to('.hero-home__slide-02 .hero-home__pizza-image', {
				scale: 1,
				autoAlpha: 1,
				duration: .5
			})
			gsap.to('.header__logo-dark-anim', {
				autoAlpha: 1,
				duration: .5
			})
			gsap.set('.hero-home__slide-01 .hero-home__pizza-image', {
				scale: .9,
				autoAlpha: 0,
			})

			header.classList.remove('header-dark')
			header.classList.add('header-white')

		},
	});
	homeHeroTl.to('.hero-home__body', {
		x: '0%',
		duration: 1
	})
		.to('.hero-home__slide-01', {
			autoAlpha: 0,
			duration: 1
		}, "<")
		.to('.hero-home__slide-02', {
			autoAlpha: 1,
			duration: 1
		}, "<")

	firstSwithButton.addEventListener('click', (e) => {
		homeHeroTl.play()
	})


	secondSwitchButton.addEventListener('click', (e) => {
		homeHeroTl.reverse()
		gsap.to('.header__logo-dark-anim', {
			autoAlpha: 0,
			duration: .5
		})
	})

}


// running stroke
const crawlers = document.querySelectorAll(".crawl");

if (crawlers) {
	crawlers.forEach(crawler => {
		const totalWidth = crawler.scrollWidth / 2;
		ScrollTrigger.create({
			animation: gsap.fromTo(crawler, {
				x: 0
			}, {
				x: -totalWidth * .1,
				ease: "none"
			}),
			trigger: crawler,
			start: "bottom bottom",
			end: "top top",
			scrub: 1,
			invalidateOnRefresh: true,
		});

	});
}


if (typeof Swiper !== 'undefined') {
	const swiperPromotions = new Swiper('.home-promotions__swiper', {
		loop: true,
		autoplay: {
			delay: 5000,
		},
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 500,
		pagination: {
			el: '.home-promotions__swiper-pagination',
		},


	});

	const swiperUp = new Swiper('.body-home-reviews__swiper-up', {
		direction: 'vertical',
		loop: true,
		speed: 6000, // швидкість плавного руху (чим більше – тим повільніше)
		spaceBetween: 8,
		freeMode: {
			enabled: true,
			momentum: false,
		},
		autoplay: {
			delay: 0,          // без затримки
			disableOnInteraction: false,
		},
		slidesPerView: 2,
		allowTouchMove: false,
		simulateTouch: false,
		allowTouchMove: false,
		touchStartPreventDefault: false,
		breakpoints: {

			768: {
				spaceBetween: 24,
			}
		}
	});

	const swiperDown = new Swiper('.body-home-reviews__swiper-reverse', {
		direction: 'vertical',
		loop: true,
		speed: 6000,
		spaceBetween: 8,
		freeMode: {
			enabled: true,
			momentum: false,
		},
		autoplay: {
			delay: 0,
			reverseDirection: true, // рух у зворотному напрямку
			disableOnInteraction: false,
		},
		slidesPerView: 2,
		allowTouchMove: false,
		simulateTouch: false,
		allowTouchMove: false,
		touchStartPreventDefault: false,
		breakpoints: {

			768: {
				spaceBetween: 24,
			}
		}
	});
}


//home products parallax

const imageOne = document.querySelector('.home-products__image-01'),
	imageTwo = document.querySelector('.home-products__image-02'),
	imageThree = document.querySelector('.home-products__image-03');

if (imageOne){

function createScrollAnimation(target, vars) {
	const el = gsap.utils.toArray(target)[0];
	if (el && el.tagName === "IMG") {
		el.addEventListener("load", () => ScrollTrigger.refresh());
		if (el.complete) ScrollTrigger.refresh();
	}

	gsap.from(target, {
		...vars,
		ease: "none",
		scrollTrigger: {
			trigger: target,
			start: "top bottom",
			end: "+=1000",
			scrub: 1,
			invalidateOnRefresh: true,
			refreshPriority: -1,

		}
	});
}

	createScrollAnimation(imageOne, { yPercent: -20 });
	createScrollAnimation(imageTwo, { xPercent: 20 });
	createScrollAnimation(imageThree, { yPercent: 20 });

}

const gallerySections = document.querySelectorAll('.--galery-anim');

if (gallerySections) {
	gallerySections.forEach(gallerySection => {
		const galleryImages = gallerySection.querySelectorAll('.--galery-image');
		galleryImages.forEach(galleryImage => {
			let galleryTl = gsap.timeline({
				scrollTrigger: {
					trigger: galleryImage,
					start: "top bottom",
					end: "top 10%",
					scrub: 1,
					invalidateOnRefresh: true,
					refreshPriority: -1,
				}
			})

			galleryTl.to(galleryImage, {
				rotate: 0,
				x: 0,
				y: 0
			})
		});
	});
}


const cards = document.querySelectorAll('.home-values__item');



if (cards) {
	cards.forEach(card => {

		function initCardAnimation(card) {

			let hoverEnterCardsTl = gsap.timeline({ paused: true });

			const back = card.querySelector('.home-values__background'),
				description = card.querySelector('.home-values__description'),
				label = card.querySelector('.home-values__label');

			// Split description text into individual characters
			const text = description.textContent.trim();
			description.innerHTML = text
				.split("")
				.map(letter => `<span class="char">${letter}</span>`)
				.join("");

			// Base timeline animation (shared for hover and scroll)
			hoverEnterCardsTl
				.to(description, { autoAlpha: 1, duration: 0.2 })
				.to(back, { scale: 1.1, duration: 1 })
				.to(label, { letterSpacing: "5px", duration: 1 }, "<")
				.from(card.querySelectorAll('.char'), {
					opacity: 0,
					y: 20,
					duration: 0.05,
					stagger: 0.03,
					ease: "power2.out"
				}, "<");


			// MatchMedia to switch between desktop hover & mobile scroll behavior
			let mediaQuery = gsap.matchMedia();

			mediaQuery.add({
				desktop: "(hover: hover)",
				touch: "(hover: none)"
			}, (context) => {

				let { desktop, touch } = context.conditions;


				// DESKTOP MODE (hover animation)
				if (desktop) {

					// Remove existing ScrollTrigger if switching from mobile
					ScrollTrigger.getById(card.dataset.stId)?.kill();

					function onEnter() { hoverEnterCardsTl.play(); }
					function onLeave() { hoverEnterCardsTl.reverse(1); }

					// Attach hover listeners
					card.addEventListener("mouseenter", onEnter);
					card.addEventListener("mouseleave", onLeave);

					// Clean up when switching out of desktop mode
					return () => {
						card.removeEventListener("mouseenter", onEnter);
						card.removeEventListener("mouseleave", onLeave);
					};
				}


				// TOUCH MODE (mobile/tablet scroll trigger)
				if (touch) {

					let st = ScrollTrigger.create({
						id: card.dataset.stId,    // unique id to remove later
						trigger: card,
						start: "top bottom",
						end: "center center",
						onEnter: () => hoverEnterCardsTl.play(),
						onEnterBack: () => hoverEnterCardsTl.play(),
					});

					// Clean up when leaving touch mode
					return () => st.kill();
				}
			});
		}


		// Initialize animations for all cards
		// Assign unique ScrollTrigger ID to each card
		card.dataset.stId = "st-" + Math.random();
		initCardAnimation(card);


	});

}


// A function that moves elements to other blocks depending on the size of the screen. (Used when adapting the page to different devices.)
function dynamicAdaptiv() {
	class DynamicAdapt {
		constructor(type) {
			this.type = type
		}

		init() {
			// массив объектов
			this.оbjects = []
			this.daClassname = '_dynamic_adapt_'
			// массив DOM-элементов
			this.nodes = [...document.querySelectorAll('[data-da]')]

			// наполнение оbjects обьектами
			this.nodes.forEach((node) => {
				const data = node.dataset.da.trim()
				const dataArray = data.split(',')
				const оbject = {}
				оbject.element = node
				оbject.parent = node.parentNode
				оbject.destination = document.querySelector(`${dataArray[0].trim()}`)
				оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767'
				оbject.place = dataArray[2] ? dataArray[2].trim() : 'last'
				оbject.index = this.indexInParent(оbject.parent, оbject.element)
				this.оbjects.push(оbject)
			})
			this.arraySort(this.оbjects)

			// массив уникальных медиа-запросов
			this.mediaQueries = this.оbjects
				.map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
				.filter((item, index, self) => self.indexOf(item) === index)
			// навешивание слушателя на медиа-запрос
			// и вызов обработчика при первом запуске
			this.mediaQueries.forEach((media) => {
				const mediaSplit = media.split(',')
				const matchMedia = window.matchMedia(mediaSplit[0])
				const mediaBreakpoint = mediaSplit[1]

				// массив объектов с подходящим брейкпоинтом
				const оbjectsFilter = this.оbjects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint)
				matchMedia.addEventListener('change', () => {

					this.mediaHandler(matchMedia, оbjectsFilter)
				})
				this.mediaHandler(matchMedia, оbjectsFilter)
			})
		}

		// Основная функция
		mediaHandler(matchMedia, оbjects) {
			if (matchMedia.matches) {
				оbjects.forEach((оbject) => {
					// оbject.index = this.indexInParent(оbject.parent, оbject.element);
					this.moveTo(оbject.place, оbject.element, оbject.destination)
				})
			} else {
				оbjects.forEach(({ parent, element, index }) => {
					if (element.classList.contains(this.daClassname)) {
						this.moveBack(parent, element, index)
					}
				})
			}
		}

		// Функция перемещения
		moveTo(place, element, destination) {
			element.classList.add(this.daClassname)
			if (place === 'last' || place >= destination.children.length) {
				destination.append(element)
				return
			}
			if (place === 'first') {
				destination.prepend(element)
				return
			}
			destination.children[place].before(element)
		}

		// Функция возврата
		moveBack(parent, element, index) {
			element.classList.remove(this.daClassname)
			if (parent.children[index] !== undefined) {
				parent.children[index].before(element)
			} else {
				parent.append(element)
			}
		}

		// Функция получения индекса внутри родителя
		indexInParent(parent, element) {
			return [...parent.children].indexOf(element)
		}

		// Функция сортировки массива по breakpoint и place
		// по возрастанию для this.type = min
		// по убыванию для this.type = max
		arraySort(arr) {
			if (this.type === 'min') {
				arr.sort((a, b) => {
					if (a.breakpoint === b.breakpoint) {
						if (a.place === b.place) {
							return 0
						}
						if (a.place === 'first' || b.place === 'last') {
							return -1
						}
						if (a.place === 'last' || b.place === 'first') {
							return 1
						}
						return 0
					}
					return a.breakpoint - b.breakpoint
				})
			} else {
				arr.sort((a, b) => {
					if (a.breakpoint === b.breakpoint) {
						if (a.place === b.place) {
							return 0
						}
						if (a.place === 'first' || b.place === 'last') {
							return 1
						}
						if (a.place === 'last' || b.place === 'first') {
							return -1
						}
						return 0
					}
					return b.breakpoint - a.breakpoint
				})
				return
			}
		}
	}

	let da = new DynamicAdapt('max');
	da.init();
}

dynamicAdaptiv()
