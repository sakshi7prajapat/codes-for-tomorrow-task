import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { fetchData, removePost } from "../store/slice/userSlice";
import './Card.css'; // Add your styles here

const Cards = () => {
  const dispatch = useDispatch();
  const { data: posts, loading, error } = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchData(currentPage + 1));
  }, [dispatch, currentPage]);

  const handleRemovePost = (postId) => {
    dispatch(removePost(postId));
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading || !posts) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <div className="card-container">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button className="remove-btn" onClick={() => handleRemovePost(post.id)}>Remove</button>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={Math.ceil(100 / 6)} // 100 posts, 6 per page
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        forcePage={currentPage} // Ensure the correct page is highlighted
      />
    </div>
  );
};

export default Cards;
