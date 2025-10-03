// 黒鍵のピッチクラス（C=0 として +いくつの音か）
export const BLACK_PITCH_CLASSES = [1, 3, 6, 8, 10];

// 黒鍵の水平配置：1オクターブ内で「どの白鍵の後」に置くか
// C#, D#, F#, G#, A# = afterWhite: 0,1,3,4,5
export const BLACK_LAYOUT_PATTERN = [
  { afterWhite: 0 },
  { afterWhite: 1 },
  { afterWhite: 3 },
  { afterWhite: 4 },
  { afterWhite: 5 },
];