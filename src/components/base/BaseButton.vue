<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost', 'transaction', 'event'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    class="base-button"
    :class="[`base-button--${props.variant}`, { 'base-button--full': props.fullWidth }]"
    :type="props.type"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-weight: 600;
  border-radius: 0.45rem;
  border: 1px solid transparent;
  padding: 0.6rem 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    box-shadow 0.2s ease;
  font-size: 1rem;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

.base-button--primary {
  background-color: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.base-button--primary:not(:disabled):hover {
  background-color: #1d4ed8;
}

.base-button--secondary {
  background-color: #fff;
  border-color: #d0d5dd;
  color: #111827;
}

.base-button--secondary:not(:disabled):hover {
  border-color: #2563eb;
  color: #0f172a;
}

.base-button--ghost {
  background-color: transparent;
  color: #2563eb;
}

.base-button--ghost:not(:disabled):hover {
  background-color: rgba(37, 99, 235, 0.1);
}

.base-button--transaction {
  background-color: #f97316;
  border-color: #f97316;
  color: #fff;
}

.base-button--transaction:not(:disabled):hover {
  background-color: #ea580c;
}

.base-button--event {
  background-color: #fef3c7;
  border-color: #fde68a;
  color: #111827;
}

.base-button--event:not(:disabled):hover {
  background-color: #fde68a;
  border-color: #fbbf24;
}

.base-button--full {
  width: 100%;
}
</style>

