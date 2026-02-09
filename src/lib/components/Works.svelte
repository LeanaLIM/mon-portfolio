<script>
// @ts-nocheck

    import works from '$lib/data/works.json';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    let section;
    let cardsWrapper;

    onMount(() => {
        const totalScrollWidth = cardsWrapper.scrollWidth - window.innerWidth;

        const ctx = gsap.context(() => {
            gsap.to(cardsWrapper, {
                x: -totalScrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${totalScrollWidth}`,
                    invalidateOnRefresh: true,
                }
            });
        });

        return () => ctx.revert();
    });
</script>

<section id="work-section" class="works-container" bind:this={section}>
    <div class="horizontal-wrapper">
        <div class="works-header">
            <h2>Work</h2>
            <p class="subtitle">
                All of these works have been created between 2023 and 2025 during my scholarship.
            </p>
        </div>

        <div class="works-cards" bind:this={cardsWrapper}>
            {#each works as work}
                <article class="work-card">
                    <div class="image-wrapper">
                        <img src={work.img} alt={work.title} />
                    </div>
                    <div class="card-content">
                        <span class="year">{work.year}</span>
                        <h3>{work.title}</h3>
                        <p>{work.description}</p>
                        <a href={work.link} target="_blank" rel="noopener noreferrer">
                            View project →
                        </a>
                    </div>
                </article>
            {/each}
        </div>
    </div>
</section>

<style>
.works-container {
    overflow: hidden;
    width: 100%;
}

.horizontal-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 var(--space-lg, 2rem);
}

.works-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--space-md, 1rem);
    flex-wrap: wrap;
    margin-bottom: 3rem;
}

.works-header h2 {
    font-size: 3rem;
    font-weight: 500;
    margin: 0;
    color: white;
}

.works-header .subtitle {
    max-width: 420px;
    font-size: 1rem;
    opacity: 0.7;
    text-align: right;
    margin: 0;
    color: white;
}

.works-cards {
    display: flex;
    gap: var(--space-md, 1.5rem);
    width: max-content;
    padding-bottom: 2rem;
}

.work-card {
    flex: 0 0 320px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.image-wrapper {
    width: 100%;
    aspect-ratio:  4 / 3;
    overflow: hidden;
}

.image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.card-content {
    padding: var(--space-sm, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm, 1rem);
    height: 100%;
    opacity: 0.3;
    transition: all 0.3s ease;
}

.card-content:hover {
    opacity: 1;
}

.card-content .year {
    font-size: 0.75rem;
    font-weight: 500;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: white;
}

.card-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.3;
    color: #ffffff;
}

.card-content p {
    font-size: 0.9rem;
    opacity: 0.85;
    flex-grow: 1;
    line-height: 1.4;
    color: #e0e0e0;
}

.card-content a {
    margin-top: auto;
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    color: white;
    transition: color 0.2s ease, transform 0.2s ease;
}

.card-content a:hover {
    color: #ffaa00;
    transform: translateX(4px);
}

@media (max-width: 1024px) {
    .work-card {
        flex: 0 0 280px;
    }
}

@media (max-width: 768px) {
    .work-card {
        flex: 0 0 300px;
    }
    .works-header h2 {
        font-size: 2rem;
    }
    .works-header .subtitle {
        text-align: left;
    }
}
</style>