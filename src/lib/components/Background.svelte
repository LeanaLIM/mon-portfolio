<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

    // responsive
    const isTouchDevice = () =>
	window.matchMedia('(pointer: coarse)').matches ||
	window.innerWidth < 1024;

	onMount(() => {
        if (isTouchDevice()) {
            gsap.set(['.background-halo-1', '.background-halo-2'], {
                x: 0,
                y: 0,
                scale: 1,
                '--morph-x1': 50,
                '--morph-x2': 50,
                '--morph-x3': 50,
                '--morph-x4': 50,
                '--morph-y1': 50,
                '--morph-y2': 50,
                '--morph-y3': 50,
                '--morph-y4': 50
            });
            return;
        }

		let mouseX = 0;
		let mouseY = 0;

		window.addEventListener('mousemove', (e) => {

			mouseX = (e.clientX / window.innerWidth) * 2 - 1;
			mouseY = (e.clientY / window.innerHeight) * 2 - 1;

			gsap.to('.background-halo-1', {
				x: mouseX * 100,
				y: mouseY * 100,
				scale: 1 + Math.abs(mouseX) * 0.2,
				duration: 4,
				ease: 'power2.out'
			});

			// déformation
			const p1 = 50 + mouseX * 15 + mouseY * 5;
			const p2 = 50 - mouseX * 10 + mouseY * 8;
			const p3 = 50 + mouseY * 15 - mouseX * 5;
			const p4 = 50 - mouseY * 12 + mouseX * 7;
			const p5 = 50 - mouseX * 15 - mouseY * 5;
			const p6 = 50 + mouseX * 10 - mouseY * 8;
			const p7 = 50 - mouseY * 15 + mouseX * 5;
			const p8 = 50 + mouseY * 12 - mouseX * 7;

			gsap.to('.background-halo-1', {
				'--morph-x1': p1,
				'--morph-x2': p2,
				'--morph-x3': p3,
				'--morph-x4': p4,
				'--morph-y1': p5,
				'--morph-y2': p6,
				'--morph-y3': p7,
				'--morph-y4': p8,
				duration: 1.2,
				ease: 'power2.out',
				overwrite: false
			});

			gsap.to('.background-halo-2', {
				x: mouseX * 80,
				y: mouseY * 80,
				scale: 1 + Math.abs(mouseY) * 0.15,
				duration: 3,
				ease: 'power2.out'
			});
		});

		// réinit
		window.addEventListener('mouseleave', () => {
			gsap.to(['.background-halo-1', '.background-halo-2'], {
				x: 0,
				y: 0,
				scale: 1,
				'--morph-x1': 50,
				'--morph-x2': 50,
				'--morph-x3': 50,
				'--morph-x4': 50,
				'--morph-y1': 50,
				'--morph-y2': 50,
				'--morph-y3': 50,
				'--morph-y4': 50,
				duration: 2.5,
				ease: 'power2.out'
			});
		});
	});
</script>

<div class="background-fixed">
	<div class="background-halo background-halo-1"></div>
	<div class="background-halo background-halo-2"></div>
	<div class="background-halo background-halo-3"></div>
	<div class="background-grain"></div>
</div>

<style>
	.background-fixed {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: #0B0B0B;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.background-halo {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(-30deg);
		pointer-events: none;
	}

	.background-halo-1 {
		width: 80%;
		height: 80%;
		background: radial-gradient(
			ellipse 65% 45% at 50% 50%,
			#4B3F2C 0%,
			#3A2F1F 30%,
			#2A1F18 50%,
			#1E013A 70%,
			#060823 85%,
			transparent 100%
		);
		opacity: 0.7;
		z-index: 1;
		
		--morph-x1: 50;
		--morph-x2: 50;
		--morph-x3: 50;
		--morph-x4: 50;
		--morph-y1: 50;
		--morph-y2: 50;
		--morph-y3: 50;
		--morph-y4: 50;
		
		border-radius: 
			calc(var(--morph-x1) * 1%) 
			calc(var(--morph-x2) * 1%) 
			calc(var(--morph-x3) * 1%) 
			calc(var(--morph-x4) * 1%) / 
			calc(var(--morph-y1) * 1%) 
			calc(var(--morph-y2) * 1%) 
			calc(var(--morph-y3) * 1%) 
			calc(var(--morph-y4) * 1%);
		
		filter: blur(40px);
	}

	.background-halo-2 {
		width: 110%;
		height: 110%;
		background: radial-gradient(
			ellipse 70% 50% at 50% 50%,
			transparent 0%,
			#1E013A 40%,
			#0D0520 60%,
			#060823 80%,
			transparent 100%
		);
		opacity: 0.6;
		z-index: 1;
		border-radius: 50% 50% 50% 50%;
		filter: blur(50px);
	}

	.background-halo-3 {
		width: 140%;
		height: 140%;
		background: radial-gradient(
			ellipse 75% 55% at 50% 50%,
			transparent 0%,
			transparent 45%,
			#060823 65%,
			#030311 85%,
			transparent 100%
		);
		opacity: 0.5;
		z-index: 1;
		border-radius: 50% 50% 50% 50%;
		filter: blur(60px);
	}

    .background-grain { 
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 1 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
        background-repeat: repeat;
        pointer-events: none;
        z-index: 2;
        mix-blend-mode: screen;
    }

    @media (max-width: 1024px), (pointer: coarse) {
        .background-grain {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 1 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
        }
    }
</style>