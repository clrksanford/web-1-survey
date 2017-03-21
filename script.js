$(document).ready(function () {
  loadResponses();

  // $("a.nav").on("click", function (e) {
  //   e.preventDefault();
  //
  //   var clicked = e.currentTarget;
  //   var requestedPage = $(clicked).attr("data");
  //
  //   showPage(requestedPage);
  // })

  $("#survey-form").on('submit', function (e) {
    e.preventDefault();

    var responses = buildResponses();

    saveResponses(responses);
  });
})

function showPage(pageName) {
  var pageArray = $(".page");

  for(var i=0; i<pageArray.length; i++) {
    var currentPage = pageArray[i];
    var currentPageId = $(currentPage).attr("id");

    if(currentPageId !== pageName) {
      $(currentPage).addClass("hidden");
    } else {
      $(currentPage).removeClass("hidden");
    }
  }
  // pageArray.forEach(function (page) {
  //   if(page.attr("id") !== pageName) {
  //     page.addClass("hidden");
  //   } else {
  //     page.removeClass("hidden");
  //   }
  // })
}

function loadResponses() {
  firebase.database().ref().on('value', function (snapshot) {
    clearTable();

    var dbItems = snapshot.val();
    var tableOrder = buildTable();

    for (var key in dbItems) {
      var responses = dbItems[key].responses;

      var newRow = $("<tr />");
      // var div = $('<div />').addClass("bio");
      for (var i=0; i<tableOrder.length; i++) {
        var currentColHeader = tableOrder[i];
        var currentCellVal = responses[currentColHeader];

        var newCell = $("<td />").text(currentCellVal);
        newRow.append(newCell);
      }

      $("tbody").append(newRow);

//       for (var field in responses) {
//         // displayField = field.replace(/-/g, " ");
//         // displayField = displayField[0].toUpperCase() + displayField.substring(1);
//
//
//         // var p = $('<p />').text(displayField + ': ' + responses[field]);
// //
//         div.append(p)
//       }
//
//       $("#response-display").append(div);
    }
  });
}

function clearTable() {
  $("tbody").empty();
}

function buildTable() {
  var thArray = $("th");
  var fieldOrderArray = [];

  for (var i=0; i<thArray.length; i++) {
    var currentField = $(thArray[i]).attr("data");

    fieldOrderArray.push(currentField);
  }

  return fieldOrderArray;
}

function saveResponses(responses) {
  var key = firebase.database().ref().push().key;

  firebase.database().ref('/' + key).set({
    responses
  });
}

function buildResponses() {
  var inputArray = $("input[type='text']");
  var responses = {};

  for(var i=0; i<inputArray.length; i++) {
    var keyName = inputArray[i]['name'];
    var value = inputArray[i]['value'];

    responses[keyName] = value;
  }

  return responses;
}
