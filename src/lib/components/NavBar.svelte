<script>
    // @ts-nocheck
	import { tick } from 'svelte';
	
	let modalElement;
	let isModalOpen = false;

	async function openModal() {
		isModalOpen = true;
		await tick();
		modalElement?.focus();
	}

	function closeModal() {
		isModalOpen = false;
	}

	function downloadCV(language) {
		const cvUrl = language === 'fr' ? '/CV-2026-LIM-LEANA.pdf' : '/CV-EN-2026-LEANA-LIM.pdf';
		window.open(cvUrl, '_blank');
		closeModal();
	}

	function handleKeydown(event) {
		if (event.key === 'Escape' && isModalOpen) {
			closeModal();
		}
	}

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }
</script>

<svelte:window on:keydown={ handleKeydown } />

<nav>
    <div class="nav-content">
        <button class="burger" aria-label="Open menu" on:click={ toggleMenu }>
            <i class="fa-solid fa-bars"></i>
        </button>
        <div class="logo"><a href="/"><img src="/logo.svg" alt="Mon logo" /></a></div>
        <ul class="nav-links">
            <li><a href="/"><i class="fa-solid fa-plus"></i> Home</a></li>
            <li><a href="#work-section"><i class="fa-solid fa-plus"></i> Work</a></li>
            <li><a href="/"><i class="fa-solid fa-plus"></i> Info</a></li>
            <li><a href="/"><i class="fa-solid fa-plus"></i> Contact</a></li>
            <li>
				<button class="cv-button" on:click={ openModal }>
					<i class="fa-solid fa-download"></i> Download my resume
				</button>
			</li>
        </ul>
    </div>
</nav>

{#if isMenuOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="mobile-menu-overlay" on:click={closeMenu}>
		<div class="mobile-menu" on:click|stopPropagation>
			<ul>
				<li><a href="/" on:click={closeMenu}><i class="fa-solid fa-plus"></i> Home</a></li>
				<li><a href="/" on:click={closeMenu}><i class="fa-solid fa-plus"></i> Work</a></li>
				<li><a href="/" on:click={closeMenu}><i class="fa-solid fa-plus"></i> Info</a></li>
				<li><a href="/" on:click={closeMenu}><i class="fa-solid fa-plus"></i> Contact</a></li>
				<li>
					<button class="cv-button" on:click={() => { closeMenu(); openModal(); }}>
						<i class="fa-solid fa-download"></i> Download my resume
					</button>
				</li>
			</ul>
		</div>
	</div>
{/if}

{#if isModalOpen}
	<div class="modal-overlay" on:click={ closeModal } on:keydown={(e) => e.key === 'Enter' && closeModal()} role="button" tabindex="-1" >
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="modal-content" on:click|stopPropagation role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1" bind:this={ modalElement }>
			<button class="modal-close" on:click={ closeModal } aria-label="Fermer">
				<i class="fa-solid fa-xmark"></i>
			</button>
			<h2 id="modal-title">Choose the version</h2>
			<p>Select the version of my resume to download</p>
			<div class="cv-options">
				<button class="cv-option" on:click={() => downloadCV('fr')}>
					<i class="fa-solid fa-flag"></i>
					<span>Version Française</span>
					<i class="fa-solid fa-download"></i>
				</button>
				<button class="cv-option" on:click={() => downloadCV('en')}>
					<i class="fa-solid fa-flag"></i>
					<span>English Version</span>
					<i class="fa-solid fa-download"></i>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    mix-blend-mode: difference;
    backdrop-filter: blur(4px);
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm);
    backdrop-filter: blur(4px);
}

.logo {
    width: 50px;
    height: 50px;
}

.logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.nav-links {
    display: flex;
    list-style-type: none;
    align-items: center;
}

.nav-links li {
    margin-left: var(--space-md);
}

.nav-links a,
.cv-button {
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
}

.cv-button {
    border: 1px solid white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: all 0.3s ease;
}

.cv-button:hover {
    background: white;
    color: black;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
    cursor: pointer;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal-content {
    background: #e6e6e6;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    position: relative;
    animation: slideUp 0.3s ease;
    cursor: default;
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    color: black;
    font-size: 24px;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
}

.modal-close:hover {
    opacity: 1;
}

.modal-content h2 {
    margin: 0 0 0.5rem 0;
    color: black;
    font-size: 24px;
}

.modal-content p {
    margin: 0 0 2rem 0;
    color: black;
    font-size: 14px;
}

.cv-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.cv-option {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    color: black;
    cursor: pointer;
    transition: all 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 500;
}

.cv-option:hover {
    background: linear-gradient(90deg, rgba(16, 1, 68, 0.4) 0%, rgba(103, 81, 1, 0.1) 100%);
    transform: translateX(5px);
}

.cv-option span {
    flex: 1;
    text-align: left;
    margin-left: 1rem;
}

.burger {
	display: none;
	background: transparent;
	border: none;
	color: white;
	font-size: 24px;
	cursor: pointer;
}

.mobile-menu-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.85);
	backdrop-filter: blur(6px);
	z-index: 999;
	display: flex;
	justify-content: flex-end;
	animation: fadeIn 0.2s ease;
}

.mobile-menu {
	width: 80%;
	max-width: 320px;
	background: #e6e6e6;
	padding: 2rem;
	animation: slideIn 0.3s ease;
}

@keyframes slideIn {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
}

.mobile-menu ul {
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.mobile-menu a {
	color: black;
	font-size: 18px;
	text-transform: uppercase;
}

.mobile-menu .cv-button {
    width: 100%;
    text-align: center;
    color: black;
    align-items: center;
    justify-content: center;
    border: solid 1px black;
    min-width: 200px;
}

.nav-links a,
.mobile-menu a {
	position: relative;
	text-decoration: none;
}

.nav-links a::after,
.mobile-menu a::after {
	content: "";
	position: absolute;
	left: 0;
	bottom: -4px;
	width: 100%;
	height: 2px;
	background-color: currentColor;
	transform: scaleX(0);
	transform-origin: left;
	transition: transform 0.3s ease;
}

.nav-links a:hover::after,
.mobile-menu a:hover::after {
	transform: scaleX(1);
}

@media (max-width: 768px) {
	.nav-links {
		display: none;
	}

	.burger {
		display: block;
	}
}
</style>