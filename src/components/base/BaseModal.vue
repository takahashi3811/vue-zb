<script setup>
import { watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  // モーダルの表示/非表示
  modelValue: {
    type: Boolean,
    default: false,
  },
  // タイトル
  title: {
    type: String,
    default: '',
  },
  // オーバーレイクリックで閉じるか
  closeOnOverlay: {
    type: Boolean,
    default: true,
  },
  // ESCキーで閉じるか
  closeOnEscape: {
    type: Boolean,
    default: true,
  },
  // モーダルのサイズ
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'full'].includes(value),
  },
});

const emit = defineEmits(['update:modelValue', 'close']);

// モーダルを閉じる
const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

// オーバーレイクリック時の処理
const handleOverlayClick = (event) => {
  if (props.closeOnOverlay && event.target === event.currentTarget) {
    close();
  }
};

// ESCキーで閉じる
const handleEscape = (event) => {
  if (props.closeOnEscape && event.key === 'Escape' && props.modelValue) {
    close();
  }
};

// モーダル表示時にbodyのスクロールを無効化
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);

// ESCキーイベントリスナー
onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="base-modal-overlay"
        @click="handleOverlayClick"
      >
        <div
          class="base-modal"
          :class="`base-modal--${props.size}`"
          @click.stop
        >
          <!-- ヘッダー部分 -->
          <div v-if="title || $slots.header" class="base-modal__header">
            <slot name="header">
              <h2 class="base-modal__title">{{ title }}</h2>
            </slot>
            <button
              class="base-modal__close"
              type="button"
              @click="close"
              aria-label="閉じる"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="20"
                height="20"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- コンテンツ部分 -->
          <div class="base-modal__body">
            <slot />
          </div>

          <!-- フッター部分 -->
          <div v-if="$slots.footer" class="base-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.base-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.base-modal {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.base-modal--small {
  width: 100%;
  max-width: 400px;
}

.base-modal--medium {
  width: 100%;
  max-width: 600px;
}

.base-modal--large {
  width: 100%;
  max-width: 900px;
}

.base-modal--full {
  width: 100%;
  max-width: 95vw;
  height: 95vh;
}

.base-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e4e7ec;
}

.base-modal__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.base-modal__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.base-modal__close:hover {
  background-color: #f1f5f9;
  color: #111827;
}

.base-modal__body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.base-modal__footer {
  padding: 1.5rem;
  border-top: 1px solid #e4e7ec;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* トランジション */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .base-modal,
.modal-leave-active .base-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .base-modal,
.modal-leave-to .base-modal {
  transform: scale(0.95);
  opacity: 0;
}
</style>

