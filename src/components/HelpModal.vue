<template>
  <v-dialog v-model="model" max-width="720">
    <v-card>
      <v-card-title class="text-h6">
        使い方ヘルプ
      </v-card-title>
      <v-card-text class="pt-2">
        <ol class="ml-4">
          <li>「ルート音」で基準音（C, D, E…）を選択します。</li>
          <li>「スケール」でメジャー / マイナーなどを選択します。</li>
          <li>「オクターブ」で鍵盤の表示幅を調整します。</li>
          <li>「ラベルを表示する」をONにすると鍵盤上にノート名が表示されます。</li>
          <!-- <li>（将来）表示モードで「鍵盤 / 五線譜」を切り替えできます。</li> -->
        </ol>
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

// v-model 用（親：<HelpModal v-model="showHelp" />）
const props = defineProps({
  modelValue: { type: Boolean, required: true }
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>