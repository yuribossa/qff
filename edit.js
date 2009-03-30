
// フォーカスの設定
function setFocusElement(elem) {
  $(".focusElement").removeClass("focusElement");
  $(elem).addClass("focusElement");
}

// フォーカス要素の取得
function getFocusElement() {
  return $(".focusElement");
}

$(document).ready(function() {
  // カラーピッカーの初期化
  $("#colorpicker").farbtastic("#color");

  // テキストボックス挿入
  $("#addTextBox").click(function() {
    $("<div/>").addClass("textBox")
    .addClass("focusElement")
    .draggable({"containment": "#editWindow"})
    .resizable({"containment": "#editWindow"})
    .click(function() { setFocusElement(this); })
    .appendTo("#editWindow");
  });

  // テキストボックス削除
  $("#deleteTextBox").click(function() {
    $(".focusElement").remove();
  });

  // 変更をコミット
  $("#commitOk").click(function() {
    var focusElement = getFocusElement();
    if (focusElement.hasClass("textBox")) {
      focusElement.css({"background-color": $("#color").val()})
      .text($("#inputTextBox").val());
    }
  });

});

