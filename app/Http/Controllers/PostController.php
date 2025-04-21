<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return $posts;
        // return view("post.index", ["posts"=> $posts]);
    }

    public function create(Request $request)
    {
        return view('post.create');
    }
    public function store(Request $request)
    {
        return Post::create($request->all());
    }

    public function show()
    {
        $posts = Post::all();
        return view("post.show", ["posts" => $posts]);

    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->update($request->all());
        return $post;
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return 204;
    }

    // public function destroy(Post $post)
    // {
    //    $post->delete();
    //    return redirect("/posts/index");
    // }
    // public function create()
    // {

    //     if (Gate::allows('isAuthor')) {
    //         return Post::create([
    //             'title' => request('title'),
    //             'content' => request('content'),
    //             'user_id' => auth()->id(),
    //         ]);
    //     } else
    //         dd('You are not an Author');

    // }
    public function edit()
    {

        if (Gate::allows('isAuthor')) {
            dd('Author allowed');
        } else
            dd('You are not an Author');

    }
    public function delete()
    {

        if (Gate::allows('isAdmin')) {
            dd('Admin allowed');
        } else
            dd('You are not Admin');

    }


}