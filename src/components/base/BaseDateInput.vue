<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
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
  // 最小日付（YYYY-MM-DD形式）
  min: {
    type: String,
    default: null,
  },
  // 最大日付（YYYY-MM-DD形式）
  max: {
    type: String,
    default: null,
  },
  // 必須入力
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur', 'change']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
  emit('input', event);
};

const handleChange = (event) => {
  emit('change', event);
};
</script>

<template>
  <input
    class="base-date-input"
    type="date"
    :id="props.id"
    :name="props.name"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :min="props.min"
    :max="props.max"
    :required="props.required"
    @input="handleInput"
    @change="handleChange"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  />
</template>

<style scoped>
.base-date-input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #d0d5dd;
  border-radius: 0.4rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;
  color: #111827;
  background-color: #fff;
  min-height: 2.75rem;
  line-height: 1.4;
  appearance: none;
}

.base-date-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.base-date-input:disabled {
  background-color: #f2f4f7;
  cursor: not-allowed;
  opacity: 0.7;
}

.base-date-input:read-only {
  background-color: #f8fafc;
  cursor: default;
}

/* ブラウザの日付ピッカーのスタイル調整 */
.base-date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.base-date-input:hover::-webkit-calendar-picker-indicator {
  opacity: 1;
}

.base-date-input:disabled::-webkit-calendar-picker-indicator {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>

