<script setup>
const props = defineProps({
  forId: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <label
    class="base-label"
    :class="{ 'base-label--inline': props.inline }"
    :for="props.forId"
  >
    <slot />
    <span v-if="props.required" class="base-label__required" aria-hidden="true">*</span>
  </label>
</template>

<style scoped>
.base-label {
  display: block;
  margin-bottom: 0.25rem;
  color: #222;
  font-size: 0.95rem;
  font-weight: 500;
}

.base-label--inline {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0;
}

.base-label__required {
  color: #d93025;
  margin-left: 0.2rem;
  font-size: 0.9em;
}
</style>

