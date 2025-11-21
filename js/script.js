// burger-menu
const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', (e) => {
	burgerMenu.classList.toggle('_active');
	document.querySelector('.header-menu').classList.toggle('_active');
	document.body.classList.toggle('_lock');
});




// hero home animation

const firstSwithButton = document.querySelector('.hero-home__switcher-01'),
	secondSwithButton = document.querySelector('.hero-home__switcher-02');



firstSwithButton.addEventListener('click', (e) => {
	let homeHeroTl = gsap.timeline();
	homeHeroTl.to('.hero-home__slide-01', {
		xPercent: -100,
		autoAlpha: 0,
		duration: 1
	})
		.to('.hero-home__slide-02', {
			xPercent: -200,
			autoAlpha: 1,
			duration: 1
		}, "<")
})


secondSwithButton.addEventListener('click', (e) => {
	let homeHeroTl = gsap.timeline();
	homeHeroTl.to('.hero-home__slide-01', {
		xPercent: 0,
		autoAlpha: 1,
		duration: 1
	})
		.to('.hero-home__slide-02', {
			xPercent: 0,
			autoAlpha: 0,
			duration: 1
		}, "<")
})



// running stroke
const crawlers = document.querySelectorAll(".crawl");

crawlers.forEach(crawler => {
	const totalWidth = crawler.scrollWidth / 2;
	ScrollTrigger.create({
		animation: gsap.fromTo(crawler, {
			x: 0
		}, {
			x: -totalWidth * .1,   // рухаємо в 4 рази далі
			ease: "none"
		}),
		trigger: crawler,
		start: "bottom bottom",
		end: "top top",           // скролимо в 4 рази довше
		scrub: 1,                  // ідеальна прив’язка
		invalidateOnRefresh: true,
		// При скролі вниз → текст вправо (бо ми рухаємо контейнер вліво, а візуально текст іде вправо)
		// При скролі вгору → текст вліво — працює автоматично!
	});

});





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



// let productTL1 = gsap.timeline({
// 	scrollTrigger: {
// 		trigger: '.home-products__image-01',
// 		start: 'top top',
// 		scrub: 1,
// 		end: '+=1000',
// 		// invalidateOnRefresh: true
// 	},
// })

// productTL1.from('.home-products__image-01', {
// 	yPercent: -70
// })

// let productTL2 = gsap.timeline({
// 	scrollTrigger: {
// 		trigger: '.home-products__image-02',
// 		start: 'top center',
// 		scrub: 1,
// 		end: '+=1000',
// 		// invalidateOnRefresh: true
// 	},
// })

// productTL2.from('.home-products__image-02', {
// 	xPercent: 20
// })


// let productTL3 = gsap.timeline({
// 	scrollTrigger: {
// 		trigger: '.home-products__image-03',
// 		start: 'top center',
// 		scrub: 1,
// 		end: '+=1000',
// 		// invalidateOnRefresh: true
// 	},
// })

// productTL3.from('.home-products__image-03', {
// 	yPercent: 20
// })



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

// Тепер просто викликай так:
createScrollAnimation(".home-products__image-01", { yPercent: -20 });
createScrollAnimation(".home-products__image-02", { xPercent: 20 });
createScrollAnimation(".home-products__image-03", { yPercent: 20 });



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
