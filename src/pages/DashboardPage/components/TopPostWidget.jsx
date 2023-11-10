export default function TopPostWidget({ post }) {
  return (
    <div className="colorful-wrapper">
      <h1>Top Post:</h1>
      <div role="article" className="post-card" key={post._id} id={post._id}>
        <h3>Title:{post.title}</h3>
        <p>Likes:{post.likes}</p>
      </div>
    </div>
  );
}
