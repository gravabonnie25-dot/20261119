// 宣告角色 1 靜止精靈圖變數
let stopSheet;
// 記錄目前播放到第幾張影格（索引從 0 開始）
let stopFrame = 0;
// 記錄上次切換影格的時間（毫秒）
let lastFrameTime = 0;

// 設定靜止精靈圖的總影格數（1/stop/stop.png 共 14 格）
const stopFrameCount = 14;
// 設定靜止精靈圖的原始總寬度
const stopSheetWidth = 1955;
// 設定靜止精靈圖的原始高度
const stopSheetHeight = 212;
// 設定每個影格停留的時間（100 毫秒）
const frameDuration = 100;

function preload() {
  // 預先載入專案根目錄下 1/stop/stop.png 圖片
  stopSheet = loadImage("1/stop/stop.png");
}

function setup() {
  // 建立與瀏覽器視窗同寬高的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // 設定背景顏色為淺紫色（RGB 色值：紅 230、綠 215、藍 255）
  background(230, 215, 255);

  // 使用 millis() 判斷是否已達設定的影格間隔時間
  if (millis() - lastFrameTime >= frameDuration) {
    // 更新上次換格的時間戳記
    lastFrameTime = millis();
    // 切換到下一張影格，超過最後一張時利用餘數回到第 0 張
    stopFrame = (stopFrame + 1) % stopFrameCount;
  }

  // 計算單一影格在原圖中的寬度
  const sourceFrameWidth = stopSheetWidth / stopFrameCount;

  // 設定角色 1 在畫面上的顯示高度為整個畫布高度的 1/3
  const displayHeight = height / 3;
  // 依照原圖的寬高比例計算等比例縮放後的顯示寬度
  const displayWidth = sourceFrameWidth * (displayHeight / stopSheetHeight);

  // 在畫布底部水平置中繪製角色，並從精靈圖裁切對應影格
  image(
    stopSheet,
    width / 2 - displayWidth / 2,
    height - displayHeight,
    displayWidth,
    displayHeight,
    stopFrame * sourceFrameWidth,
    0,
    sourceFrameWidth,
    stopSheetHeight
  );
}

function windowResized() {
  // 當瀏覽器視窗大小改變時，同步調整畫布大小以維持比例
  resizeCanvas(windowWidth, windowHeight);
}