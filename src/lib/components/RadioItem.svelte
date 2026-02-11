<script>
    import { base } from '$app/paths';
    let { label, value, group = $bindable(), description, icon } = $props();
</script>

<div class="flex flex-col gap-2">
    <label class="flex items-top gap-2">
        <input type="radio" bind:group={group} value={value} />
        <img src="{base}{icon}" alt="radio" />
        {label}
    </label>
    <p class="text-[#00000060] text-sm">{description}</p>
</div>