import { useState, useEffect } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { BiLastPage, BiFirstPage } from "react-icons/bi";

//Styles
import "../styles/Pagination.scss";

const Pagination = ({ numOfPages = 48 }) => {
  let arr = [];
  for (let i = 1; i <= numOfPages; i++) arr.push(i);

  const [currentPage, setCurrentPage] = useState(1);
  const [arrToShow, setArrToShow] = useState(arr.slice(0, 4));
  useEffect(() => {
    if (
      !arrToShow.slice(0, 4).includes(currentPage) &&
      currentPage != 1 &&
      currentPage >= 4
    )
      setArrToShow(arr.slice(currentPage - 4, currentPage ));
    if (currentPage < 4) setArrToShow(arr.slice(0, 4));
    console.log(currentPage, arrToShow);
  }, [currentPage]);

  return (
    <div className="pagination-container">
      {currentPage !== 1 && (
        <>
          <div className="go-to-first-btn" onClick={() => setCurrentPage(1)}>
            <BiLastPage />
          </div>
          <div
            className="prev-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <MdNavigateNext />
          </div>
        </>
      )}
      {arrToShow.map((page) => (
        <div
          key={page}
          className={`page-number-btn ${
            currentPage === page ? "page-number-btn-active" : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </div>
      ))}
      {currentPage !== arr.push() && (
        <>
          <div
            className="next-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <MdNavigateBefore />
          </div>
          <div
            className="go-to-last-btn"
            onClick={() => setCurrentPage(arr.push())}
          >
            <BiFirstPage />
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
