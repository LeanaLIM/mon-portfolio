<script>
	// @ts-ignore
	import { Background } from '$lib';
  import { NavBar } from '$lib';
	import '$lib/styles/global.css';
  import { Works } from '$lib';
  import { Footer } from '$lib';

  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  /**
   * @type {gsap.TweenTarget}
   */
    let titleHomepage;
    /**
   * @type {HTMLDivElement}
   */
    let whatText;
    /**
   * @type {HTMLDivElement}
   */
    let whoText;
    /**
   * @type {gsap.TweenTarget}
   */
    let signatureText;

    // @ts-ignore
    onMount(() => {
        const tl = gsap.timeline();

        // @ts-ignore
        gsap.set(titleHomepage, { autoAlpha: 0 }); 

        // @ts-ignore
        tl.to(titleHomepage, {
            autoAlpha: 1,
            duration: 1.2,
            ease: "power2.out"
        });

        // @ts-ignore
        tl.from(whatText.children, {
            y: 20,
            autoAlpha: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.8")

        // @ts-ignore
        .from(whoText.children, {
            y: 20,
            autoAlpha: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.7")
    });
</script>

<NavBar />

<Background />

<section class="hero">
  <div class="title-homepage" bind:this={titleHomepage}>
    <div class="what" bind:this={whatText}>
      <div><p>PORTFOLIO</p></div>
      <div><p>Here are <strong> my projects</strong></p></div>
    </div>

    <div class="who" bind:this={whoText}>
      <div>
        <p class="italic">Fullstack developer &</p>
        <p>computer science engineering student</p>
      </div>
      <div bind:this={signatureText}>
        <h1 class="signature">LIM Léana</h1>
      </div>
    </div>
  </div>
</section>

<Works />

<div class="content">
  <slot />
</div>

<Footer />

<style>

.hero {
	min-height: 100vh;
	position: relative;
}

.title-homepage {
  position: absolute;
  bottom: var(--space-md);
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
  box-sizing: border-box;
  padding: 0 var(--space-sm);
}

.who, .what {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
}

.signature {
	font-style: italic;
	font-weight: 500;
	font-size: 9rem;
	pointer-events: none;
  line-height: 1;
}

@media (max-width: 768px) {
	.signature {
		font-size: 6rem;
	}

	.what p,
	.who p {
		font-size: 0.9rem;
	}
}

@media (max-width: var(--breakpoint-sm)) {
	.title-homepage {
		bottom: var(--space-sm);
		gap: var(--space-xs);
	}

	.what,
	.who {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.signature {
		font-size: 1.5rem;
		line-height: 1;
	}

	.what p,
	.who p {
		font-size: 0.85rem;
	}
}
</style>
