import PageHeading from "../../PageComponents/PageHeading";
import CategoryPostList from "./CategoryPostList";
export default function CategoryDashboard({ selectedCategory }) {
  console.log(selectedCategory);

  return (
    <section className="content">
      <PageHeading heading={selectedCategory.name} />
      <h4 className="category-details--post-count">
        Total number of posts: {selectedCategory.posts.length}
      </h4>

      {selectedCategory.posts.length > 0 ? (
        <CategoryPostList selectedCategory={selectedCategory} />
      ) : (
        <p className="no-posts">No posts to display</p>
      )}
    </section>
  );
}
