<script setup>
import { computed } from 'vue';

const props = defineProps({
  level: {
    type: Number,
    default: 1,
    validator: (value) => value >= 1 && value <= 6,
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value),
  },
  uppercase: {
    type: Boolean,
    default: false,
  },
  underline: {
    type: Boolean,
    default: false,
  },
});

const tag = computed(() => `h${props.level}`);

const headingClasses = computed(() => [
  `base-heading--level-${props.level}`,
  `base-heading--align-${props.align}`,
  {
    'base-heading--uppercase': props.uppercase,
    'base-heading--underline': props.underline,
  },
]);
</script>

<template>
  <component :is="tag" class="base-heading" :class="headingClasses">
    <slot />
  </component>
</template>

<style scoped>
.base-heading {
  margin: 0;
  color: #0f172a;
  font-weight: 600;
  line-height: 1.3;
}

.base-heading--align-left {
  text-align: left;
}

.base-heading--align-center {
  text-align: center;
}

.base-heading--align-right {
  text-align: right;
}

.base-heading--uppercase {
  text-transform: uppercase;
}

.base-heading--underline {
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.35rem;
}

.base-heading--level-1 {
  font-size: 2rem;
}

.base-heading--level-2 {
  font-size: 1.75rem;
}

.base-heading--level-3 {
  font-size: 1.5rem;
}

.base-heading--level-4 {
  font-size: 1.25rem;
}

.base-heading--level-5 {
  font-size: 1.1rem;
}

.base-heading--level-6 {
  font-size: 1rem;
}

@media (max-width: 640px) {
  .base-heading--level-1 {
    font-size: 1.6rem;
  }

  .base-heading--level-2 {
    font-size: 1.4rem;
  }

  .base-heading--level-3 {
    font-size: 1.25rem;
  }
}
</style>


