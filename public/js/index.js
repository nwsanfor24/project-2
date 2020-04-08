$( document ).ready(function() {

  // Constants
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------

  const testuser = "faithful3192@gmail.com";

  // Favorite Item
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------

  $(document).on("click", ".favorite", function(event) {

    event.preventDefault();

    if (!testuser) {
      return M.toast({html: "You must sign in to save favorites!"});
    }

    const $this = $(this);

    const favorite = {
      src: $this.attr("data-url"),
      image: $this.attr("data-img"),
      text: $this.attr("data-text"),
      userid: testuser
    };

    $.post("/api/favorite", favorite)
      .then(function(data) {
        console.log(data);
        $this.attr("data-id", data.id);
        $this.children(".material-icons").text("favorite");
        $this.removeClass("favorite").addClass("unfavorite");
        M.toast({html: "Favorite Saved!"});
      })
      .catch(function() {
        M.toast({html: "Something Went Wrong..."});
      });

  });

  // Unfavorite Favorite Item
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------

  $(document).on("click", ".unfavorite", function(event) {

    event.preventDefault();

    if (!testuser) {
      return M.toast({html: "You must sign in to save favorites!"});
    }

    const $this = $(this);
    const delId = $this.attr("data-id");

    $.ajax({
      method: "DELETE",
      url: `/api/favorite/${delId}`
    }).then(function() {
      $this.children(".material-icons").text("favorite_border");
      $this.removeClass("unfavorite").addClass("favorite");
      M.toast({html: "Removed from Favorites"});
    });

  });

});