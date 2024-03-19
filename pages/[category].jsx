import Link from "next/link";
import { fetchDataByCategory } from "./api";
import { useContext, useState } from "react";
import { BookMarkContext } from "@/BookMarkContext";

export async function getStaticPaths() {
  // Choose which categories you want to fetch
  const categories = ["politics", "technology", "sports"];
  // Make a route(path) for each category
  const paths = categories.map((category) => ({
    params: { category },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { category } = params;
  // Fetch data depending on category
  const news = await fetchDataByCategory(category);
  return {
    props: { news },
  };
}

export default function CategoryPage({ news }) {
  const { state, dispatch } = useContext(BookMarkContext);
  const [bookmarkText, setBookmarkText] = useState("");
  const [bookmarkAricleID, setBookmarkAricleID] = useState(false);

  function toggleBookmark(article) {
    const isBookMarked = state.bookmarks.some(
      (item) => item.id === article.article_id
    );
    if (isBookMarked) {
      deleteBookmark(article);
    } else {
      addBookmark(article);
    }
  }

  function addBookmark(article) {
    dispatch({
      type: "add",
      id: article.article_id,
    });
    setBookmarkAricleID(article.article_id); // Spara artikel-ID
    setBookmarkText("Bookmark added to Saved Articles");
    setTimeout(() => setBookmarkText(""), 2000); // Fade out after 2 seconds
  }

  function deleteBookmark(article) {
    dispatch({
      type: "delete",
      id: article.article_id,
    });
    setBookmarkAricleID(article.article_id); // Spara artikel-ID
    setBookmarkText("Bookmark removed from Saved Articles");
    setTimeout(() => setBookmarkText(""), 2000); // Fade out after 2 seconds
  }

  function getButtonInfo(article) {
    const isBookmarked = state.bookmarks.some(
      (item) => item.id === article.article_id
    );
    // Change text based on if bookmarked or not
    const buttonText = isBookmarked ? "Remove Bookmark" : "Add Bookmark";
    // Change icon based on if bookmarked or not
    const buttonIcon = isBookmarked ? "bookmark_remove" : "bookmark_added";
    return { text: buttonText, icon: buttonIcon };
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="flex justify-center pb-20 pt-12">
          {console.log("Category:", news.length > 0 ? news[0].category : null)}
          <span className="bg-black text-white p-2 dark:bg-white dark:text-black transition-colors duration-800">
            {news.length > 0 &&
            Array.isArray(news[0].category) &&
            news[0].category.length > 0
              ? news[0].category[0].charAt(0).toUpperCase() +
                news[0].category[0].slice(1)
              : "Unknown"}
          </span>
          <span className="mt-2"> &nbsp; News</span>
        </h1>
        <ul className="article-list grid grid-cols-2 gap-4 mx-20 pb-20 p-0 m-0 max-w-screen-xl">
          {news.map((article, index) => (
            <li
              key={article.article_id}
              className={index === 0 ? "full-width" : ""}
            >
              <Link
                className="text-black no-underline hover:underline dark:text-white"
                href={`/article/${article.article_id}`}
              >
                <h2>{article.title}</h2>
              </Link>
              <img className="w-full" src={article.image_url} alt="" />
              <div className="btn-container">
                <div className="bookmark-btn-wrapper">
                  <button
                    className="bookmark-btn"
                    onClick={() => toggleBookmark(article)}
                  >
                    <span className="material-symbols-outlined">
                      {getButtonInfo(article).icon}
                    </span>{" "}
                    &nbsp; {getButtonInfo(article).text}
                  </button>
                </div>
              </div>
              {bookmarkAricleID === article.article_id && (
                <span className="fade-out-text">{bookmarkText}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
