$(document).ready(function() {

  var mass = new Array(); // Массив занятых клеток
  var mass_X = new Array(); // Массив клеток, занятых Х
  var mass_O = new Array(); // Массив клеток, занятых О
  var end = 0; // Проверка на победу, если 1, то кто-то победил

  $(".square").on("click", function() {
    var square_text = $(this).text(); // Считываем текст в данной клетке
    if (square_text != "") {
      alert("Клетка занята");
    } else {
      $(this).text("x");
      var square_id = $(this).attr("id"); // Считываем id данной клетки
      square_id = parseInt(square_id);

      mass.push(square_id);
      mass_X.push(square_id);
      mass_X.sort();

      end = checkVictory(mass_X, "Пользователь")
      if (mass_X.length != 0 && mass.length < 8 && end != 1)
        computer();
      if (mass.length == 9 && end != 1) {
        saveHistory(1);
        fillSquare(mass);
        checkDraw();
      }
    }
  })

  // Ход компьютера
  function computer() {
    var zero; // Переменная для поиска свободной клетки
    var flag = 0;

    mass.sort();

    while (flag == 0) {
      zero = Math.floor(Math.random() * 9) + 1; // Получаем случайное число от 1 до 9
      flag++;
      // Проверяем занята клетка с таким номером или нет
      for (var i = 0; i < mass.length; i++) {
        if (zero == mass[i]) {
          flag = 0;
        }
      }
    }
    $(".square").eq(zero - 1).text("o"); // Записываем выбор случайного номера в свободную клетку

    mass.push(zero);
    mass_O.push(zero);
    checkVictory(mass_O, "Компьютер")
  }

  // Запрещаем ходить после завершения игры
  function fillSquare(mass) {
    mass.sort();
    var flag = 0;
    for (var i = 1; i < 10; i++) {
      for (var j = 0; j < mass.length; j++) {
        if (i == mass[j]) {
          flag++;
        }
      }
      if (flag == 0) {
        $(".square").eq(i - 1).text(" ");
      }
      flag = 0;
    }
    return mass;
  }
// Функция проверки победы в игре
  function checkVictory(massiv, user) {
    var srt1 = 0; // переменная проверки первой строки
    var srt2 = 0; // переменная проверки второй строки
    var srt3 = 0; // переменная проверки третьей строки

    var st1 = 0; // переменная проверки первого столбца
    var st2 = 0; // переменная проверки второго столбца
    var st3 = 0; // переменная проверки третьего столбца

    var d1 = 0; // переменная проверки первой диагонали
    var d2 = 0; // переменная проверки второй диагонали

    for (var i = 0; i < massiv.length; i++) {
      switch (massiv[i]) {
        case 1:
          {
            srt1++;st1++;d1++;
            break;
          }
        case 2:
          {
            srt1++;st2++;
            break;
          }
        case 3:
          {
            srt1++;st3++;d2++;
            break;
          }
        case 4:
          {
            srt2++;st1++;
            break;
          }
        case 5:
          {
            srt2++;st2++;d1++;d2++;
            break;
          }
        case 6:
          {
            srt2++;st3++;
            break;
          }
        case 7:
          {
            srt3++;st1++;d2++;
            break;
          }
        case 8:
          {
            srt3++;st2++;
            break;
          }
        case 9:
          {
            srt3++;st3++;d1++;
            break;
          }
      }
      if (srt1 == 3 || srt2 == 3 || srt3 == 3 || st1 == 3 || st2 == 3 || st3 == 3 || d1 == 3 || d2 == 3) {
        $(".win").text("Победил " + user);
        $(".win").css("display", "block");
        var index = user;
        saveHistory(index);
        fillSquare(mass);
        hideBlock(user);
        break;
      }
    }
    if (srt1 == 3 || srt2 == 3 || srt3 == 3 || st1 == 3 || st2 == 3 || st3 == 3 || d1 == 3 || d2 == 3)
      return 1;
  }

// Если случилась ничья
  function checkDraw() {
    setTimeout(function() {
      $(".win").text("Ничья");
      $(".win").css("display", "block");
    }, 0);

    setTimeout(function() {
      $(".win").css("display", "none");
      $(".square").text("");

      var raund = $(".round span").text();
      raund++;
      $(".round span").text(raund);

      mass.length = 0;
      mass_X.length = 0;
      mass_O.length = 0;

    }, 3000);
  }

// Запись истории игр
  function saveHistory(user) {
    var round = $(".round span").text();
    if (user == "Компьютер") {
      $(".hystiory_play").append("Раунд " + round + " - <font color='red'>Проигрыш</font><br>");
      return;
    }
    if (user == "Пользователь") {
      $(".hystiory_play").append("Раунд " + round + " - <font color='green'>Победа</font><br>");
      return;
    }
    if (user == "1") {
      $(".hystiory_play").append("Раунд " + round + " - <font color='blue'>Ничья</font><br>");
      return;
    }
  }
// Скрыть сообщение о результате игры
  function hideBlock(user) {
    setTimeout(function() {
      $(".win").css("display", "none");
      $(".square").text("");

      var round = $(".round span").text();
      round++;
      $(".round span").text(round);

      if (user == "Компьютер") {
        var num = $(".score_computer").text();
        num++;
        $(".score_computer").text(num);
      } else {
        var num = $(".score_user").text();
        num++;
        $(".score_user").text(num);
      }

      mass.length = 0;
      mass_X.length = 0;
      mass_O.length = 0;
    }, 3000);

  }

})
