<script>
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
</script>

<footer class="footer">
    <button class="back-to-top" on:click={scrollToTop}>
        <span class="arrow">↑</span> Back to top
    </button>
    
    <div class="copyright">
        ©2026 All Rights Reserved
    </div>
</footer>

<style>
    .footer {
        background-color: #090909; 
        color: var(--color-text);
        padding: var(--space-md) var(--space-sm);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        z-index: 200;
    }

    @media (min-width: 768px) {
        .footer {
            padding: var(--space-md) var(--space-lg);
        }
    }

    .back-to-top {
        background: none;
        border: none;
        color: var(--color-text);
        font-family: 'DM Sans', sans-serif;
        font-weight: 200;
        font-size: 0.9rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        opacity: 0.7;
        transition: opacity 0.3s ease, transform 0.3s ease;
        padding: 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .back-to-top:hover {
        opacity: 1;
        transform: translateY(-3px);
    }

    .arrow {
        font-size: 1.2rem;
    }

    .copyright {
        font-family: 'DM Sans', sans-serif;
        font-weight: 200;
        font-size: 0.85rem;
        letter-spacing: 0.02em;
        z-index: 201;
        color: var(--color-text);
    }

    @media (max-width: 640px) {
        .footer {
            flex-direction: column;
            gap: var(--space-md);
            padding: var(--space-lg) var(--space-sm);
            text-align: center;
        }
    }
</style>