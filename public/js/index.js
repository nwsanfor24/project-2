$(document).ready(function () {

  // Constants
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------

  //Homepage btn click to Music
  $(document).on("click", ".music", function (event) {
    event.preventDefault();

    $(location).attr('href', '/music');

  });

  //Btn on Music page back to Home Page
  $(document.on("click", ".homeMusic", function(event) {
    event.preventDefault();

    $(location).attr('href', '/home');
  }));

  //Homepage btn click to Meditation
  $(document).on("click", ".meditation", function(event) {
    event.preventDefault();

    $(location).attr('href', '/meditation');

  });

  //Btn on Meditation page back to Home Page
  $(document).on("click", ".homeMeditation", function(event) {
    event.preventDefault();

    $(location).attr('href', '/home');
  });

  //Homepage btn click to Art
  $(document).on("click", ".art", function(event) {
    event.preventDefault();

    $(location).attr('href', '/art');
  });

  //Btn on Art page back to Home Page
  $(document).on("click", ".homeArt", function(event) {
    event.preventDefault();

    $(location).attr('href', '/home');
  });

  // Favorite Item
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------

  $(document).on("click", ".favorite", function (event) {

    event.preventDefault();

    const $this = $(this);

    const favorite = {
      src: $this.attr("data-url"),
      image: $this.attr("data-img"),
      text: $this.attr("data-text"),
    };

    $.post("/api/favorite", favorite)
      .then(function (data) {
        console.log(data);
        $this.attr("data-id", data.id);
        $this.children(".material-icons").text("favorite");
        $this.removeClass("favorite").addClass("unfavorite");
        M.toast({ html: "Favorite Saved!" });
      })
      .catch(function () {
        M.toast({ html: "Something Went Wrong..." });
      });

  });

  // Unfavorite Favorite Item
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------

  $(document).on("click", ".unfavorite", function (event) {

    event.preventDefault();

    const $this = $(this);
    const delId = $this.attr("data-id");

    $.ajax({
      method: "DELETE",
      url: `/api/favorite/${delId}`
    }).then(function () {
      $this.children(".material-icons").text("favorite_border");
      $this.removeClass("unfavorite").addClass("favorite");
      M.toast({ html: "Removed from Favorites" });
    }).catch(function () {
      M.toast({ html: "Something Went Wrong..." });
    });
  });

});