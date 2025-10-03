<template>
  <v-sheet
    class="keyboard mx-auto elevation-2"
    rounded="lg"
    :style="{ maxWidth: `calc(${whiteKeys.length} * var(--white-w))` }"
  >
    <!-- White keys -->
    <div class="whites">
      <div
        v-for="(whiteKey, i) in whiteKeys"
        :key="`w-${i}-${whiteKey.name}${whiteKey.octave}`"
        class="white-key"
      >
        <span v-if="showLabels" class="label">{{ whiteKey.name }}{{ whiteKey.octave }}</span>
        <span v-if="isInScale(whiteKey.pitchClassNumber)" class="dot" />
      </div>
    </div>

    <!-- Black keys -->
    <div class="blacks">
      <div
        v-for="(blackKey, i) in blackKeys"
        :key="`b-${i}-${blackKey.name}${blackKey.octave}`"
        class="black-key"
        :style="blackStyleForIndex(i)"
      >
        <span v-if="isInScale(blackKey.pitchClassNumber)" class="dot dot--small" />
      </div>
    </div>
  </v-sheet>
  <div class="text-medium-emphasis text-caption mt-2">● は選択スケールに含まれるキー</div>
</template>

<script setup>
import { computed } from 'vue'
import { BLACK_PITCH_CLASSES, BLACK_LAYOUT_PATTERN } from '../constants/keyboard.js'

const props = defineProps({
  root: { type: String, required: true },
  scaleName: { type: String, required: true },
  octaves: { type: Number, required: true },
  showLabels: { type: Boolean, default: true },
  noteNames: { type: Array, required: true },
  scales: { type: Object, required: true },
})

/** 
 * 鍵盤モデルを生成
 */
const keys = computed(() =>
  // 12音 × オクターブ数
  Array.from({ length: 12 * props.octaves }, (_, i) => {
    // ピッチクラス番号(0~11)を計算
    const pitchClassNumber = i % 12
    return {
      pitchClassNumber: pitchClassNumber,
      name: props.noteNames[pitchClassNumber],
      octave: 4 + Math.floor(i / 12), // 基準オクターブを4とする
      isBlack: BLACK_PITCH_CLASSES.includes(pitchClassNumber),
    }
  })
)

// 鍵盤モデルを黒鍵と白鍵に振り分け
const whiteKeys = computed(() => keys.value.filter(k => !k.isBlack))
const blackKeys = computed(() => keys.value.filter(k => k.isBlack))

/** 
 * スケールに含まれるピッチクラスの集合
 */
const pitchClassesInScale = computed(() => {
  // スケール名に対応するビットマスク文字列を取得
  const mask = props.scales[props.scaleName]
  // 基準音をピッチクラス番号に変換
  const rootPitchClassNumber = props.noteNames.indexOf(props.root)

  const set = new Set()
  for (let i = 0; i < 12; i++) {
    // ルート音を0に揃えるようにビットマスクをシフト
    const noteBit = mask[(i - rootPitchClassNumber + 12) % 12]
    // 音がスケールに含まれていればセットに追加
    if (noteBit === '1') set.add(i)
  }
  return set
})

/**
 * 特定のピッチクラス番号がスケールに含まれるか判定
 * @param {number} pitchClassNumber: ピッチクラス番号
*/ 
const isInScale = (pitchClassNumber) => pitchClassesInScale.value.has(pitchClassNumber)

/** 
 * 黒鍵のx方向の位置を返却（白鍵のインデックス基準） 
 * @param {number} index: 黒鍵の通し番号
*/
const blackStyleForIndex = (index) => {
  // 現在どのオクターブにいるか
  const octave = Math.floor(index / BLACK_LAYOUT_PATTERN.length)
  // オクターブ内で黒鍵が何番目か
  const indexInOctave = index % BLACK_LAYOUT_PATTERN.length
  // 黒鍵を置く基準となる（1音前の）白鍵の通し番号
  const baseWhiteKeyIndex = octave * 7 + BLACK_LAYOUT_PATTERN[indexInOctave].afterWhite

  // 黒鍵の位置を算出
  return { left: `calc(${baseWhiteKeyIndex} * var(--white-w) + var(--white-w) * 1)` }
}
</script>

<style scoped>
.keyboard {
  --white-w: 56px;
  --white-h: 200px;
  --black-w: 34px;
  --black-h: 120px;
  position: relative;
  height: var(--white-h);
  background: linear-gradient(#fff, #fafafa);
  overflow: hidden;
}

/* White keys */
.whites {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--white-w);
  height: var(--white-h);
  border: 1px solid #1f1f1f;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,.12);
}
.white-key {
  position: relative;
  background: #fff;
  border-right: 1px solid rgba(0,0,0,.25);
  box-shadow: inset 0 1px 0 rgba(0,0,0,.25);
  transition: background .12s ease;
}
.white-key:last-child { border-right: 0; }
.white-key:hover { background: #f6f7fb; }
.white-key:active { background: #eef0f6; }

.label {
  position: absolute;
  bottom: 6px;
  left: 6px;
  font-size: 11px;
  color: rgba(0,0,0,.5);
  user-select: none;
}

/* Black keys */
.blacks {
  position: absolute; top: 0; left: 0; width: 100%;
  height: var(--black-h);
  pointer-events: none;
  z-index: 2;
}
.black-key {
  position: absolute;
  width: var(--black-w);
  height: var(--black-h);
  background: #2f2f2f;
  border: 1px solid #1d1d1d;
  transform: translateX(-50%);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,.35), inset 0 -3px 0 rgba(0,0,0,.35);
}

/* Scale dot */
.dot {
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px; height: 14px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px #fff inset, 0 0 0 1px rgba(0,0,0,.2);
}
.dot--small {
  bottom: 8px;
  width: 11px; height: 11px;
}
</style>
