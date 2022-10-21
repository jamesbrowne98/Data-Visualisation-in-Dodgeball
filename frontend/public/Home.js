$(function() {
    $("#sayHello").click(function() {
        let userName = $("#name").val();

        let message = "Hello " + userName + "!";
        $("#sayHello_result").html(message);
    });
   });

   $(function() {
    $("#checkNumber").click(function() {
    let number = $("#number").val();
    $("#numberMessage").removeClass("greater less");
    if (number < 10) {
    $("#numberMessageText").html("Less than ten");
    $("#numberMessage").addClass("less");
    } else {
    $("#numberMessageText").html("Greater than or equal to ten");
    $("#numberMessage").addClass("greater");
    }
    $("#numberMessage").removeClass("hidden");
    });
   });
   
   function uniqueNumbers(numbers) {
    let uniques = [];
    for (i=0; i<numbers.length; i++) {
    if (!uniques.includes(numbers[i])) {
    uniques.push(numbers[i]);
    }
    }
    return uniques;
   }
   $(function() {
    $("#listUnique").click(function() {
    let numbers = $("#numbers").val().split(",");
    let vals = uniqueNumbers(numbers);
    console.log("vals: " + vals);
   
    for (i=0; i<vals.length; i++) {
    $("#uniqueNumbers").append(vals[i] + " ");
    }
    });
   });