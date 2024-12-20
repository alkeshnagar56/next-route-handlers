import { comments } from "./data"

export async function  GET( request) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("query")
    const filteredComments = query ?
    comments.filter(comment=>comment.text.includes(query))
    :comments;
    return Response.json(filteredComments);
}

export async function  POST(request) {
    const comment = await request.json();

    const newcomment ={
        id: comments.length+1,
        Text: comment.text
    }

    comments.push(newcomment)


    return new Response(JSON.stringify(newcomment),{
        headers: {
            "content-type": "application/json"
        },
        status: 201,
    });
}




