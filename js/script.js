// burger-menu
const burgerMenu = document.querySelector('.burger-menu'),
	header = document.querySelector('.header');
burgerMenu.addEventListener('click', (e) => {
	burgerMenu.classList.toggle('_active');
	document.querySelector('.header-menu').classList.toggle('_active');
	document.body.classList.toggle('_lock');
	header.classList.toggle('_active')
});


// header amination

window.addEventListener('scroll', (e)=>{
	let scrollDistance = window.scrollY
	if (scrollDistance > 10) {
		header.classList.add('header-on-scroll')

	} else {
		header.classList.remove('header-on-scroll')
	}
})

// ==========================================================================================================================================================
// homepage
// hero home animation

const firstSwithButton = document.querySelector('.hero-home__switcher-01'),
	secondSwitchButton = document.querySelector('.hero-home__switcher-02');




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
			header.classList.add('header-logo-anim-alt')
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
			header.classList.remove('header-logo-anim-alt')


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
			duration: .5,
			
		})
	})

}


// running strokes anim
const crawlers = document.querySelectorAll(".crawl");

if (crawlers) {
	crawlers.forEach(crawler => {
		const totalWidth = crawler.scrollWidth / 2;
		let ratio = 0.1 //this affects the speed of scrolling the line 
		ScrollTrigger.create({
			animation: gsap.fromTo(crawler, {
				x: -totalWidth * ratio   
			}, {
				x: 0,
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

if (imageOne) {

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

// home about section
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

// home values sections
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


// ====================================================================================================================
// About page
// video Player
const videoPlayers = document.querySelectorAll('[data-video-player]');

if (videoPlayers) {
	videoPlayers.forEach(videoPlayer => {
		const player = new Plyr(videoPlayer, {
			controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
			clickToPlay: true
		});
	});
}



// story gallery

const aboutImages = document.querySelectorAll('.about-story__image');

if (aboutImages) {
	aboutImages.forEach(aboutImage => {
		let aboutGalleryTl = gsap.timeline({
			scrollTrigger: {
				trigger: aboutImage,
				start: "top bottom",
				end: '+=500',
				scrub: 1,
				invalidateOnRefresh: true,
				refreshPriority: -1,
			}
		})
			.to(aboutImage, {
				rotate: +aboutImage.dataset.rotateValue,
			})
	});
}


// ====================================================================================================================
// blog page
// swiper-hero


if (typeof Swiper !== 'undefined') {
	const swiperPromotions = new Swiper('.actions-blog-hero__swiper', {
		loop: true,
		autoplay: {
			delay: 5000,
		},
		spaceBetween: 24,

		speed: 1000,
		navigation: {
			nextEl: '.actions-blog-hero__button-next',

		},

		breakpoints: {
			320: {
				slidesPerView: 1.05,
			},
			500: {
				slidesPerView: 1.2,
			},
			630: {
				slidesPerView: 1.5,
			},
			768: {
				slidesPerView: 2.5,
			},
			992: {
				slidesPerView: 3,

			}
		},


	})
}


// articles anim
const articlesWrappers = document.querySelectorAll('.article__wrapper-anim');

if (articlesWrappers) {

	articlesWrappers.forEach(articlesWrapper => {
		const articles = articlesWrapper.querySelectorAll('.article');

		let blogArticlesTl = gsap.timeline({
			scrollTrigger: {
				start: 'top bottom',
				trigger: articlesWrapper
			},
		})
			.from(articles, {

				autoAlpha: 0,
				duration: 1,
				stagger: .3
			})
			.fromTo('.blog-hero-articles__button', {

				autoAlpha: 0,
			}, {
				autoAlpha: 1,
				duration: 1,
			})
	});

}


// ==============================================================================================================================================================
// single post page

const swiperEl = document.querySelector(".single-post-articles__swiper");
if (swiperEl) {
	if (typeof Swiper !== 'undefined') {
		document.addEventListener("DOMContentLoaded", function () {
			let mobileSwiper = null;

			function initMobileSwiper() {
				const isMobile = window.innerWidth <= 767.98;

				if (isMobile && !mobileSwiper) {
					mobileSwiper = new Swiper(swiperEl, {

						spaceBetween: 24,

						speed: 1000,
						navigation: {
							nextEl: '.single-post-articles__button-next',
						},

						breakpoints: {
							320: {
								slidesPerView: 1,
							},
							380: {
								slidesPerView: 1.2,
							},
							500: {
								slidesPerView: 1.5,
							},
							630: {
								slidesPerView: 2,
							},

						},
					});

				} else if (!isMobile && mobileSwiper) {
					mobileSwiper.destroy(true, true);
					mobileSwiper = null;
				}
			}

			initMobileSwiper();

			let resizeTimeout;
			window.addEventListener("resize", () => {
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(initMobileSwiper, 100);
			});
		});
	}
}

//==================================================================================================================================================================

// page geo search

const selectionMenus = document.querySelectorAll('[data-selection-menu]');

if (selectionMenus) {
	selectionMenus.forEach(selectionMenu => {
		const selectionMenuItems = selectionMenu.querySelectorAll('[data-selection-menu-item]');

		selectionMenuItems.forEach(selectionMenuItem => {
			selectionMenuItem.addEventListener('click', (e) => {
				const activeItem = selectionMenu.querySelector('[data-selection-menu-item]._active')
				activeItem.classList.remove('_active');
				selectionMenuItem.classList.add('_active')
			})
		});
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
