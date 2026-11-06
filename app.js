// 计数器：把数字存在一个变量里，点按钮就加一减一，再把结果写回页面
var count = 0;

var countEl = document.getElementById("count");
var hintEl = document.getElementById("hint");
var plusBtn = document.getElementById("plus");
var minusBtn = document.getElementById("minus");
var resetBtn = document.getElementById("reset");

// 双击 index.html 打开时（file:// 协议）有的浏览器会禁止 localStorage，
// 所以这里用 try / catch 包一层，读不到就用默认值 0，保证页面不会报错。
function loadCount() {
  try {
    var saved = window.localStorage.getItem("myFirstPageCount");
    if (saved !== null) {
      count = parseInt(saved, 10) || 0;
    }
  } catch (e) {
    count = 0;
  }
}

function saveCount() {
  try {
    window.localStorage.setItem("myFirstPageCount", String(count));
  } catch (e) {
    // 存不了就算了，不影响当前这次使用
  }
}

function render(pop) {
  countEl.textContent = count;
  hintEl.textContent = count === 0 ? "还没开始点" : "你一共点了 " + count + " 次";

  if (pop) {
    countEl.classList.add("pop");
    window.setTimeout(function () {
      countEl.classList.remove("pop");
    }, 130);
  }
}

plusBtn.addEventListener("click", function () {
  count = count + 1;
  render(true);
  saveCount();
});

minusBtn.addEventListener("click", function () {
  count = count - 1;
  render(true);
  saveCount();
});

resetBtn.addEventListener("click", function () {
  count = 0;
  render(true);
  saveCount();
});

loadCount();
render(false);

// 在浏览器控制台里看到这一行，说明 JS 文件确实被加载了
console.log("app.js 已加载，计数器准备好了");
