// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function () {
    // Run JavaScript once the document is ready
    $(document).ready(function () {
        // TODO: Refactor display comment
        function displayComment(previousCommentsDiv, commentObj) {
            // Build comment to be displayed
            // =============================
            let divEl = $("<div>").addClass("article-comment");
            let commentEl = $("<p>").text(commentObj.comment);
            let nameEl = $("<p>").text(commentObj.name);
            let deleteBtnEl = $("<button>").addClass("btn btn-danger").text("Delete");

            // Append comment, name, and delete button to div
            divEl.append(commentEl);
            divEl.append(nameEl);
            divEl.append(deleteBtnEl);

            // Append the div ot the previous comments div
            previousCommentsDiv.append(divEl);
        }

        // TODO: Refactor get all comments for an article and display on page
        //       Should be used for comment-button, delete-button, and submit-button
        function getComments(articleId) {
            // Get comments
            $.get(`/api/articles/${articleId}`, response => {
                // Save previous comment div for the given articleId
                let previousCommentsDiv = $(`#${articleId}`).find(".previous-comments");
                // Empty the div
                previousCommentsDiv.empty();

                // Populate the div with each comment
                response.comments.forEach(comment => {
                    // Display one comment
                    displayComment(previousCommentsDiv, comment);
                });
 
            });
        }

        // When a comment button is clicked
        $(".comment-btn").on("click", function () {
            // Assign button state to a variable
            let state = $(this).attr("state");

            let articleId = $(this).attr("article-id")

            // Switch for the comment button state
            switch (state) {
                // If the button state is hidden
                case "hidden":
                    // TODO: Get all comments
                    getComments(articleId)
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

            let articleId = $(this).attr("article-id");

            // Get comment name input and clear comment field
            let inputComment = $(this).prev().find("textarea").val();
            $(this).prev().find("textarea").val("");

            // Get name input and clear input field
            let inputName = $(this).prev().prev().find("input").val();
            $(this).prev().prev().find("input").val("");

            // Display comment TODO: remove this because getComments should use it
            displayComment($(this).parent().prev(), {
                name: inputName,
                comment: inputComment
            });

            // Get all comments
            getComments(articleId);
            

            // Post comment to API
            $.ajax(`/api/articles/${articleId}`, {
                type: "POST",
                data: {
                    name: inputName,
                    comment: inputComment
                }
            });
        });
    });
})();