export default function BlogCard({ post }) {
  return (
    <div role="article" key={post._id}>
      <h2>Title:{post.title}</h2>
      <p>Category:{post.category.name}</p>
      <p>{post.createdAt}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
