<template>
  <v-dialog v-model="model" max-width="720">
    <v-card>
      <v-card-title class="text-h6">
        使い方ヘルプ
      </v-card-title>

      <v-card-text class="pt-2">
        <v-list density="comfortable" lines="one">
          <v-list-item
            v-for="(t, i) in tips"
            :key="i"
            :title="t"
            prepend-icon="mdi-check-circle"
            base-color="success"
            class="py-2"
          />
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="flat" color="primary" @click="model = false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true }
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

const tips = [
  '「ルート音」で基準音（C, D, E…）を選択します。',
  '「スケール」でメジャー / マイナーなどを選択します。',
  '「オクターブ」で鍵盤の表示幅を調整します。',
  '「ラベルを表示する」をONにすると鍵盤上にノート名が表示されます。'
]
</script>
