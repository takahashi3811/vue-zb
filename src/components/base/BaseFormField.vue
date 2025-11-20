<script setup>
import BaseLabel from './BaseLabel.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  forId: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: '',
  },
  stacked: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="base-form-field" :class="{ 'base-form-field--stacked': props.stacked }">
    <span class="base-form-field__label">
      <BaseLabel :for-id="props.forId" :required="props.required" inline>
        {{ props.label }}
      </BaseLabel>
    </span>

    <div class="base-form-field__control" :class="{ 'base-form-field__control--error': props.error }">
      <slot />
      <small v-if="props.hint && !props.error" class="base-form-field__hint">{{ props.hint }}</small>
      <small v-if="props.error" class="base-form-field__error">{{ props.error }}</small>
    </div>
  </div>
</template>

<style scoped>
.base-form-field {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
  width: 100%;
}

.base-form-field--stacked {
  grid-template-columns: 1fr;
}

.base-form-field__label {
  display: inline-flex;
  justify-content: flex-start;
  padding: 0.4rem;
  color: #0f172a;
  font-weight: 600;
  background-color: lightskyblue;
}

.base-form-field--stacked .base-form-field__label {
  justify-content: flex-start;
  padding-top: 0;
}

.base-form-field__control {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

.base-form-field__control--error :deep(.base-input),
.base-form-field__control--error :deep(input),
.base-form-field__control--error :deep(select),
.base-form-field__control--error :deep(textarea) {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.15);
}

.base-form-field__hint {
  font-size: 0.85rem;
  color: #64748b;
  padding:0.5%;
}

.base-form-field__error {
  font-size: 0.85rem;
  color: #dc2626;
}

@media (max-width: 640px) {
  .base-form-field {
    grid-template-columns: 1fr;
  }

  .base-form-field__label {
    justify-content: flex-start;
    padding-top: 0;
  }
}
</style>

