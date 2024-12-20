import { comments } from "../data";

export async function GET(_request, { params }) {
  const comment = comments.find((item) => item.id === parseInt(params.id));
  return Response.json(comment);
}

// export async function GET(request) {
//   const searchParams = new URL(request.url).searchParams; // Correctly parse the search parameters
//   const query = searchParams.get("query");

//   // Assuming `comments` is defined
//   const filteredComments = query
//     ? comments.filter((comment) => comment.text.includes(query))
//     : comments;

//   return new Response(JSON.stringify(filteredComments), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }             //code is not working

export async function PATCH(request, { params }) {
  const body = await request.json(); // Await the parsed JSON
  const { text } = body;
  console.log({ params }, "padkoo");

  // Find the index of the comment with the given ID
  const index = comments.findIndex((item) => item.id === parseInt(params.id));

  if (index === -1) {
    // Handle case where the comment isn't found
    return new Response(JSON.stringify({ error: "Comment not found" }), {
      status: 404,
    });
  }

  // Update the text of the comment
  comments[index].text = text;

  // Return the updated comment
  return new Response(JSON.stringify(comments[index]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// export async function DELETE({ params }, _request) {
//   // Parse the ID and validate it
//   const commentId = parseInt(params?.id);
//   console.log("Params:", params?.id);

//   if (isNaN(commentId)) {
//     return new Response(JSON.stringify({ error: "Invalid comment ID" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   // Find the index of the comment
//   const index = comments.findIndex((item) => item.id === commentId);

//   // Handle case where the comment is not found
//   if (index === -1) {
//     return new Response(JSON.stringify({ error: "Comment not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   // Remove the comment
//   const deletedComment = comments[index];
//   comments.splice(index, 1);

//   // Return the deleted comment
//   return new Response(JSON.stringify(deletedComment), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }









export async function DELETE({ params }, _request) {
  const index = comments.findIndex(
    (comment) => comment.id === parseInt(params.id)
  );

  const deletedComment = comments[index]
  comments.splice(index, 1);
  return Response.json(deletedComment);
}
