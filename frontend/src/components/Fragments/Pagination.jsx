import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = (props) => {
  const { currentPage, totalJob } = props;
  const [pageDetail, setPageDetail] = useState({
    pageList: [],
    totalPage: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const totalPage = Math.ceil(totalJob / 10);
    let page = parseInt(currentPage, 10);
    if (isNaN(page)) page = 1;

    const list = generatePageList(page, totalPage);

    setPageDetail({ pageList: list, totalPage });
  }, [currentPage, totalJob]);

  const generatePageList = (current, total) => {
    const pages = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else if (current <= 3) {
      pages.push(1, 2, 3, 4);
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 3; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      pages.push(current - 1, current, current + 1);
      pages.push("...");
      pages.push(total);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page === "...") return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
  };

  return (
    <div className="my-8 flex justify-center">
      <ul className="inline-flex -space-x-px text-base h-10">
        {pageDetail.pageList.map((page, idx) => (
          <li key={idx}>
            <button
              onClick={() => handlePageClick(page)}
              disabled={page === "..." || page === parseInt(currentPage, 10)}
              className={`flex items-center justify-center px-4 h-10 border border-gray-300 
              ${
                page === parseInt(currentPage, 10)
                  ? "text-white bg-[var(--primary-color)] font-bold"
                  : "text-gray-500 bg-white hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
