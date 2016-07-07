$(document).ready(function () {
  var xOrZero, computer;
  var xOrZeroArr = [], computerArr = [];
  $box = $('.box');
  $box.addClass("text-center");
  var filledPositions = [];
  var winningPositions = [
      [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
  ];


  $('#myModal').modal('show');

  function reset(){
    xOrZero = undefined;
    computer = undefined;
    xOrZeroArr = [];
    computerArr = [];
    filledPositions = [];
    for(var i = 1 ; i <= 9 ; i++)
      $("#" + i).html("");
  }

  function randomIntFromInterval(min,max)
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  $('.select').click(function () {
    $(this).attr("data-dismiss","modal");
    xOrZero = $(this).text();
    computer = xOrZero === 'X' ? 'O': 'X';
  });

  function isBoxEmpty(id){
    return filledPositions.indexOf(+id) == '-1';
  }

  function makeEntry(sel,val,id){
    filledPositions.push(id);
    sel.html(val);
  }

  //check if arr = [2,3,4,5,6] in winningPositions
  function haveTheyWon(arr) {
    for (var j in winningPositions) {
      var check = arr.indexOf(winningPositions[j][0]) != '-1' &&
          arr.indexOf(winningPositions[j][1]) != '-1' &&
          arr.indexOf(winningPositions[j][2]) != '-1';
      if (check) {
        return check;
      }
    }
  }

  function bootstrapAlert(title,message){
    BootstrapDialog.alert({
      title: "<h4 class='text-center text-danger'>" + title + "</h4>",
      message: "<h1 class='text-center text-success'>" + message + "</h1>"
    });
    reset();
  }

  $box.click(function(){
    if(xOrZero === undefined && computer === undefined) {
      $('#myModal').modal('show');
    }
    else {
      var id = $(this).attr("id");
      if(isBoxEmpty(id)){

        makeEntry($(this),xOrZero,+id);
        xOrZeroArr.push(+id);
        if(haveTheyWon(xOrZeroArr))
          bootstrapAlert("TIC-TAC-TOE","You Won !!!");
        else if(filledPositions.length === 9) {
          bootstrapAlert("TIC-TAC-TOE","It's a DRAW !!!");
          }
          else {
            do {
              random = randomIntFromInterval(1, 9);
            }while (filledPositions.indexOf(random) != '-1' && filledPositions.length != 9);

            if(filledPositions.length !== 9) {
              makeEntry($('#' + random), computer, +random);
              computerArr.push(+random);
              if(haveTheyWon(computerArr))
                bootstrapAlert("TIC-TAC-TOE","Computer Won !!!");
            }
          }
      }
    }
  });
});