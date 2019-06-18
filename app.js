$(document).ready(function() {
  var athletes = [
    "Lebron James",
    "Cam Newton",
    "Javier Baez",
    "James Harden",
    "Deandre Hopkins",
    "Mike Trout",
    "Kemba Walker",
    "Ladainian Tomlinson"
  ];

  function renderButtons() {
    $("#athlete-buttons").empty();
    for (i = 0; i < athletes.length; i++) {
      $("#athlete-buttons").append(
        "<button class='btn btn-success' data-athlete='" +
          athletes[i] +
          "'>" +
          athletes[i] +
          "</button>"
      );
    }
  }

  renderButtons();

  $("#add-athlete").on("click", function() {
    event.preventDefault();
    var athlete = $("#athlete-input")
      .val()
      .trim();
    athletes.push(athlete);
    renderButtons();
    return;
  });

  $("button").on("click", function() {
    var athlete = $(this).attr("data-athlete");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      athlete +
      "&api_key=ryrqpXWQYRuDcvWaWcFUBapuRqSsQ4KN&limit=10";
    // queryURL.done(function(data) {
    // console.log("success got data", data);
    // });

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      var results = response.data;
      $("#athletes").empty();
      for (var i = 0; i < results.length; i++) {
        var athleteDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var athleteImg = $("<img>");

        athleteImg.attr("src", results[i].images.original_still.url);
        athleteImg.attr("data-still", results[i].images.original_still.url);
        athleteImg.attr("data-animate", results[i].images.original.url);
        athleteImg.attr("data-state", "still");
        athleteImg.attr("class", "gif");
        athleteDiv.append(p);
        athleteDiv.append(athleteImg);
        $("#athletes").append(athleteDiv);
      }
    });
  });

  $(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");

    console.log("hello");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("img").on("click", function() {
    console.log("click worked!");
    var src = athleteImg.attr(src);
    src = src.substring(0, src.length - 10);
    src += ".url";
    console.log(src);
    athleteImg.attr("src", src);
  });

  $(document).on("click", "#input", displayImg);
  $(document).on("click", ".gif", changeState);
});
