// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function () {
    // Run JavaScript once the document is ready
    $(document).ready(function () {
        // TODO:
        // Request to delete comment
        function deleteComment(commentId, articleId) {
            alert(commentId);

            // TODO: figure out how to to delete comments and if it will be removed from article
            $.ajax(`/api/articles/${articleId}`, {
                type: 'DELETE'
            }).then(
                response => getComments(articleId)
            ).catch(
                err => console.log(err)
            );
        };

        // TODO: Refactor display comment
        function displayComment(articleId, previousCommentsDiv, commentObj) {
            // TODO: Make this look like a card like a GitHub comment

            // <div class="card">
            //     <div class="card-header">
            //         <p>Featured</p>
            //         <button class="btn btn-secondary">Delete</button>
            //     </div>

            //     <div class="card-body">
            //         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            //     </div>
            // </div>

            // Build comment to be displayed
            // =============================

            // Create card div
            let cardDivEl = $("<div>").addClass("card article-comment");

            // Create card header element
            let cardHeaderDivEl = $("<div>").addClass("card-header");
            // Create name p element
            let nameEl = $("<p>").addClass("comment-name").text(commentObj.name);
            // Create delete button element with comment-id attribute
            let deleteButtonEl = $("<button>").addClass("btn btn-light delete-btn").attr("comment-id", commentObj._id).text("Delete");
            // Add on click event handler to delete button
            deleteButtonEl.on("click", () => deleteComment(commentObj._id, articleId));
            // Append nameEl and deleteButtonEl to cardHeaderDivEl
            cardHeaderDivEl.append(nameEl);
            cardHeaderDivEl.append(deleteButtonEl);
            // Append cardHeaderDivEl to cardDivEl
            cardDivEl.append(cardHeaderDivEl);

            // Create card body element
            let cardBodyDivEl = $("<div>").addClass("card-body");
            // Create card text element
            let cardTextEl = $("<p>").addClass("card-text").text(commentObj.comment);
            // Append cardTextEl to cardBodyDivEl
            cardBodyDivEl.append(cardTextEl);
            // Append cardBodyDivEl to cardDivEl
            cardDivEl.append(cardBodyDivEl);

            // Append cardDivEl to previousCommentDiv
            previousCommentsDiv.append(cardDivEl);
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
                    displayComment(articleId, previousCommentsDiv, comment);
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
                    // Get all comments
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
                    $(this).text("View Comments");
                    // Hide this article's comment section
                    $(this).parent().next().hide();
                    break;
                default:
                    // Error: Should never happen; just in case
                    alert("Whoops, we made an error! Please try again later.")
            }
        });

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