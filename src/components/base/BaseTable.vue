<script setup>
const props = defineProps({
  // テーブルのスタイルバリエーション
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'striped', 'bordered'].includes(value),
  },
  // テーブル全体の幅を100%にするか
  fullWidth: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="base-table-wrapper">
    <table
      class="base-table"
      :class="[
        `base-table--${props.variant}`,
        { 'base-table--full': props.fullWidth },
      ]"
    >
      <thead v-if="$slots.thead">
        <slot name="thead" />
      </thead>
      <tbody v-if="$slots.tbody">
        <slot name="tbody" />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.base-table-wrapper {
  overflow-x: auto;
  width: 100%;
}

.base-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  background-color: #fff;
}

.base-table--full {
  width: 100%;
}

/* デフォルトスタイル */
.base-table th,
.base-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e4e7ec;
}

.base-table th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
}

.base-table td {
  color: #475467;
}

.base-table tbody tr {
  transition: background-color 0.15s ease;
}

.base-table tbody tr:hover {
  background-color: #f8fafc;
}

/* ストライプスタイル */
.base-table--striped tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

.base-table--striped tbody tr:nth-child(even):hover {
  background-color: #f1f5f9;
}

/* ボーダースタイル */
.base-table--bordered th,
.base-table--bordered td {
  border: 1px solid #e4e7ec;
}

.base-table--bordered th {
  border-bottom: 2px solid #d0d5dd;
}
</style>

