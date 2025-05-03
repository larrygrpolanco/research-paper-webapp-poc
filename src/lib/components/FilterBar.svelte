<script>
	import { createEventDispatcher } from 'svelte';

	// Props
	export let filters = [
		{
			id: 'sentiment',
			label: 'Sentiment',
			options: [
				{ id: 'positive', label: 'Positive', count: 357 },
				{ id: 'neutral', label: 'Neutral', count: 43 },
				{ id: 'negative', label: 'Negative', count: 5 }
			],
			multiSelect: true
		},
		{
			id: 'aspect',
			label: 'Evaluation Aspect',
			options: [
				{ id: 'social-attractiveness', label: 'Social Attractiveness', count: 202 },
				{ id: 'nativeness', label: 'Nativeness', count: 182 },
				{ id: 'phonetic-features', label: 'Phonetic Features', count: 28 },
				{ id: 'speech', label: 'Speech', count: 22 },
				{ id: 'motivation', label: 'Motivation', count: 19 },
				{ id: 'proficiency', label: 'Proficiency', count: 13 },
				{ id: 'comprehensibility', label: 'Comprehensibility', count: 13 },
				{ id: 'metalinguistic', label: 'Metalinguistic', count: 4 }
			],
			multiSelect: true
		},
		{
			id: 'idol',
			label: 'Idol',
			options: [
				{ id: 'joshua', label: 'Joshua', count: 0 },
				{ id: 'mark', label: 'Mark', count: 0 },
				{ id: 'wendy', label: 'Wendy', count: 0 },
				{ id: 'rose', label: 'Rosé', count: 0 },
				{ id: 'jennie', label: 'Jennie', count: 0 },
				{ id: 'rm', label: 'RM', count: 0 },
				{ id: 'felix', label: 'Felix', count: 0 }
			],
			multiSelect: true
		},
		{
			id: 'language',
			label: 'Language',
			options: [
				{ id: 'english', label: 'English', count: 0 },
				{ id: 'korean', label: 'Korean', count: 0 }
			],
			multiSelect: false
		}
	];

	export let selectedFilters = {};
	export let showCounts = true;
	export let collapsible = true;
	export let initiallyExpanded = false;

	// State
	let expanded = initiallyExpanded;
	let expandedSections = {};

	// Initialize expanded sections
	$: {
		if (!expandedSections || Object.keys(expandedSections).length === 0) {
			expandedSections = {};
			filters.forEach((filter) => {
				expandedSections[filter.id] = true;
			});
		}
	}

	// Initialize selected filters if not provided
	$: {
		if (!selectedFilters || Object.keys(selectedFilters).length === 0) {
			selectedFilters = {};
			filters.forEach((filter) => {
				selectedFilters[filter.id] = [];
			});
		}
	}

	// Event dispatcher
	const dispatch = createEventDispatcher();

	// Toggle filter bar expansion
	function toggleExpanded() {
		expanded = !expanded;
	}

	// Toggle filter section expansion
	function toggleSection(filterId) {
		expandedSections[filterId] = !expandedSections[filterId];
	}

	// Toggle filter selection
	function toggleFilter(filterId, optionId) {
		const filter = filters.find((f) => f.id === filterId);

		if (filter.multiSelect) {
			// For multi-select filters, toggle the option
			if (selectedFilters[filterId].includes(optionId)) {
				selectedFilters[filterId] = selectedFilters[filterId].filter((id) => id !== optionId);
			} else {
				selectedFilters[filterId] = [...selectedFilters[filterId], optionId];
			}
		} else {
			// For single-select filters, replace the selection
			if (selectedFilters[filterId].includes(optionId)) {
				selectedFilters[filterId] = [];
			} else {
				selectedFilters[filterId] = [optionId];
			}
		}

		// Trigger update
		selectedFilters = { ...selectedFilters };

		// Dispatch event
		dispatch('filterchange', { selectedFilters });
	}

	// Clear all filters
	function clearAllFilters() {
		filters.forEach((filter) => {
			selectedFilters[filter.id] = [];
		});

		// Trigger update
		selectedFilters = { ...selectedFilters };

		// Dispatch event
		dispatch('filterchange', { selectedFilters });
	}

	// Get total selected filter count
	$: selectedCount = Object.values(selectedFilters).reduce(
		(total, selected) => total + selected.length,
		0
	);
</script>

<div class="filter-bar">
	<div class="filter-header">
		<h3 class="filter-title">Filters</h3>

		{#if collapsible}
			<button
				class="toggle-button"
				on:click={toggleExpanded}
				aria-label={expanded ? 'Collapse filters' : 'Expand filters'}
			>
				<span class="toggle-icon">{expanded ? '−' : '+'}</span>
			</button>
		{/if}
	</div>

	{#if expanded}
		<div class="filter-content">
			{#if selectedCount > 0}
				<div class="active-filters">
					<span class="active-count"
						>{selectedCount} active filter{selectedCount !== 1 ? 's' : ''}</span
					>
					<button class="clear-all-button" on:click={clearAllFilters}>Clear All</button>
				</div>
			{/if}

			{#each filters as filter}
				<div class="filter-section">
					<div class="filter-section-header" on:click={() => toggleSection(filter.id)}>
						<h4 class="filter-section-title">{filter.label}</h4>
						<span class="section-toggle-icon">{expandedSections[filter.id] ? '−' : '+'}</span>
					</div>

					{#if expandedSections[filter.id]}
						<div class="filter-options">
							{#each filter.options as option}
								<label class="filter-option">
									<input
										type={filter.multiSelect ? 'checkbox' : 'radio'}
										name={filter.id}
										value={option.id}
										checked={selectedFilters[filter.id]?.includes(option.id)}
										on:change={() => toggleFilter(filter.id, option.id)}
									/>
									<span class="option-label">{option.label}</span>
									{#if showCounts && option.count !== undefined}
										<span class="option-count">{option.count}</span>
									{/if}
								</label>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.filter-bar {
		background-color: white;
		border-radius: var(--border-radius-lg);
		box-shadow: var(--shadow-md);
		margin-bottom: var(--spacing-4);
		overflow: hidden;
	}

	.filter-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-2) var(--spacing-3);
		border-bottom: 1px solid var(--color-border);
	}

	.filter-title {
		margin: 0;
		font-size: var(--font-size-h4);
		line-height: var(--line-height-h4);
	}

	.toggle-button {
		background: none;
		border: none;
		color: var(--color-text-secondary);
		font-size: var(--font-size-h4);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		padding: 0;
	}

	.toggle-icon {
		font-weight: var(--font-weight-bold);
	}

	.filter-content {
		padding: var(--spacing-2) var(--spacing-3);
	}

	.active-filters {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-2);
		padding-bottom: var(--spacing-2);
		border-bottom: 1px solid var(--color-border);
	}

	.active-count {
		font-size: var(--font-size-small);
		color: var(--color-text-secondary);
	}

	.clear-all-button {
		background: none;
		border: none;
		color: var(--color-secondary);
		font-size: var(--font-size-small);
		cursor: pointer;
		padding: 0;
		text-decoration: underline;
	}

	.filter-section {
		margin-bottom: var(--spacing-2);
	}

	.filter-section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		padding: var(--spacing-1) 0;
	}

	.filter-section-title {
		margin: 0;
		font-size: var(--font-size-regular);
		font-weight: var(--font-weight-medium);
	}

	.section-toggle-icon {
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-bold);
	}

	.filter-options {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		margin-top: var(--spacing-1);
		padding-left: var(--spacing-1);
	}

	.filter-option {
		display: flex;
		align-items: center;
		font-size: var(--font-size-small);
		cursor: pointer;
	}

	.option-label {
		margin-left: var(--spacing-1);
		flex-grow: 1;
	}

	.option-count {
		color: var(--color-text-secondary);
		font-size: var(--font-size-small);
		background-color: rgba(0, 0, 0, 0.05);
		padding: 2px 6px;
		border-radius: var(--border-radius-sm);
		min-width: 24px;
		text-align: center;
	}

	/* Responsive styles */
	@media (min-width: 640px) {
		.filter-options {
			padding-left: var(--spacing-2);
		}
	}
</style>
