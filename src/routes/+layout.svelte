<script>
	import { Background } from '$lib';
</script>

<Background />

<div class="content">
	<slot />
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	.content {
		position: relative;
		z-index: 1;
		min-height: 100vh;
	}
</style>
