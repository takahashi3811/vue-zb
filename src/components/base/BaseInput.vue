<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
});

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
  emit('input', event);
};
</script>

<template>
  <input
    class="base-input"
    :id="props.id"
    :name="props.name"
    :type="props.type"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :autocomplete="props.autocomplete"
    @input="handleInput"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  />
</template>

<style scoped>
.base-input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #d0d5dd;
  border-radius: 0.4rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.base-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.base-input:disabled {
  background-color: #f2f4f7;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>

