// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function () {
    // Run JavaScript once the document is ready
    $(document).ready(function () {
        // When a comment button is clicked
        $(".comment-btn").on("click", function () {
            // Assign button state to a variable
            let state = $(this).attr("state");

            // Switch for the comment button state
            switch (state) {
                // If the button state is hidden
                case "hidden":
                    // Change state to visible
                    $(this).attr("state", "visible");
                    // Change text
                    $(this).text("Hide Comments");
                    // Show this article's comment section
                    $(this).parent().next().show();
                    break;
                // If the button state is visible
                case "visible":
                    // Change state to hidden
                    $(this).attr("state", "hidden");
                    // Change text
                    $(this).text("Show Comments");
                    // Hide this article's comment section
                    $(this).parent().next().hide();
                    break;
                default:
                    // Error: Should never happen; just in case
                    alert("Whoops, we made an error! Please try again later.")
            }
        });
    });
})();