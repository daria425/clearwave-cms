export default function TopPostWidget({ post }) {
  return (
    <div role="article" className="post-card" key={post._id} id={post._id}>
      <h3>{post.title}</h3>
      <p>{post.likes}</p>
    </div>
  );
}
