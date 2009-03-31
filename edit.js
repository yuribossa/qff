
// フォーカスの設定
function setFocusElement(elem) {
  $(".focusElement").removeClass("focusElement");
  $(elem).addClass("focusElement");
}

// フォーカス要素の取得
function getFocusElement() {
  return $(".focusElement");
}

function resetFocusElement() {
  $(".focusElement").removeClass("focusElement");
}

function addTextBox() {
  $("<div/>").addClass("textBox")
  .addClass("focusElement")
  .draggable({"containment": ".slide:visible"})
  .resizable({"containment": ".slide:visible"})
  .click(function() { setFocusElement(this); })
  .appendTo(".slide:visible");
}

function deleteTextBox() {
  $(".focusElement").remove();
}

function addSlide() {
  var newSlide = $("<div/>").addClass("slide");
  if ($("div.slide:visible").length > 0) {
    $("div.slide:visible").hide()
                          .after(newSlide);
    resetFocusElement();
  } else {
    newSlide.appendTo("#editWindow");
  }
}

function deleteSlide() {
  if ($("div.slide").length >= 2) {
    var sd;
    if ($("div.slide:visible").get(0) == $("div.slide:last").get(0)) {
      sd = $("div.slide:visible").prev();
    } else {
      sd = $("div.slide:visible").next();
    }
    $("div.slide:visible").remove();
    sd.show();
  } else {
    alert("スライドが1枚だけなのでこれ以上削除できません");
  }
}

function nextSlide() {
  var currentSlide = $("div.slide:visible");
  if (currentSlide.get(0) != $("div.slide:last").get(0)) {
    resetFocusElement();
    currentSlide.hide().next().show();
  }
}

function prevSlide() {
  var currentSlide = $("div.slide:visible");
  if (currentSlide.get(0) != $("div.slide:first").get(0)) {
    resetFocusElement();
    currentSlide.hide().prev().show();
  }
}

$(document).ready(function() {
  // カラーピッカーの初期化
  $("#colorpicker").farbtastic("#color");

  // 最初のスライドを作成
  addSlide();

  // スライド挿入
  $("#addSlide").click(addSlide);

  // スライド削除
  $("#deleteSlide").click(deleteSlide);

  // テキストボックス挿入
  $("#addTextBox").click(addTextBox);

  // テキストボックス削除
  $("#deleteTextBox").click(deleteTextBox);

  // 次のスライド
  $("#nextSlide").click(nextSlide);

  // 前のスライド
  $("#prevSlide").click(prevSlide);

  // 変更をコミット
  $("#commitOk").click(function() {
    var focusElement = getFocusElement();
    if (focusElement.hasClass("textBox")) {
      focusElement.css({
        "background-color": $("#color").val()
      , "text-align": $(".textAlignRadio:checked").val()})
      .text($("#inputTextBox").val());
    }
  });

});

