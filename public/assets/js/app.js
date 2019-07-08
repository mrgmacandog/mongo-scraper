// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function () {
    // Run JavaScript once the document is ready
    $(document).ready(function () {
        // TODO: Refactor get all comments for an article and display on page
        //       Should be used for comment-button, delete-button, and submit-button

        // When a comment button is clicked
        $(".comment-btn").on("click", function () {
            // Assign button state to a variable
            let state = $(this).attr("state");

            // Switch for the comment button state
            switch (state) {
                // If the button state is hidden
                case "hidden":
                    // TODO: Get all comments
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

        // TODO: Add comment to db and get all comments once clicked
        // When a submit button is clicked
        $(".submit-btn").on("click", function () {
            event.preventDefault();

            // Get comment name input and clear comment field
            let inputComment = $(this).prev().find("textarea").val();
            $(this).prev().find("textarea").val("");

            // Get name input and clear input field
            let inputName = $(this).prev().prev().find("input").val();
            $(this).prev().prev().find("input").val("");

            // Build comment to be displayed
            // =============================
            let divEl = $("<div>").addClass("article-comment");
            let commentEl = $("<p>").text(inputComment);
            let nameEl = $("<p>").text(inputName);
            let deleteBtnEl = $("<button>").addClass("btn btn-danger").text("Delete");

            divEl.append(commentEl);
            divEl.append(nameEl);
            divEl.append(deleteBtnEl);

            $(this).parent().prev().append(divEl);

            console.log(`/api/articles/${$(this).attr("article-id")}`);
            

            // Post comment to API
            $.ajax(`/api/articles/${$(this).attr("article-id")}`, {
                type: "POST",
                data: {
                    name: inputName,
                    comment: inputComment
                }
            });
        });
    });
})();