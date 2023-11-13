export default function TopPostWidget({ post }) {
  return (
    <div className="colorful-wrapper">
      <h2 className="top-post-label">Top Post:</h2>
      <div role="article" className="post-card" key={post._id} id={post._id}>
        <h2>{post.title}</h2>
        <p>Likes:{post.likes}</p>
        <button className="btn-outline">VIEW POST</button>
      </div>
    </div>
  );
}
