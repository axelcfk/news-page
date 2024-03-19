import { useContext, useState } from "react";
import { BookMarkContext } from "@/BookMarkContext";

const myAPI_KEY = "pub_3900581ff98cc657ee844badca5975b771778";
//Hämtar data
export async function getStaticPaths() {
  const topRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=top`
  );

  const topData = await topRes.json();

  const topArticles = topData.results;

  const topPaths = topArticles.map((article) => ({
    params: { id: article.article_id.toString() },
  }));

  const politicsRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=politics`
  );

  const politicsData = await politicsRes.json();

  const politicsArticles = politicsData.results;

  const politicsPaths = politicsArticles.map((article) => ({
    params: { id: article.article_id.toString() },
  }));

  const technologyRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=technology`
  );

  const technologyData = await technologyRes.json();

  const technologyArticles = technologyData.results;

  const technologyPaths = technologyArticles.map((article) => ({
    params: { id: article.article_id.toString() },
  }));

  const businessRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=business`
  );

  const businessData = await businessRes.json();

  const businessArticles = businessData.results;

  const businessPaths = businessArticles.map((article) => ({
    params: { id: article.article_id.toString() },
  }));

  const sportsRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=sports`
  );

  const sportsData = await sportsRes.json();

  const sportsArticles = sportsData.results;

  const sportsPaths = sportsArticles.map((article) => ({
    params: { id: article.article_id.toString() },
  }));

  return {
    paths: [
      ...topPaths,
      ...politicsPaths,
      ...technologyPaths,
      ...businessPaths,
      ...sportsPaths,
    ],
    fallback: false,
  };
}
//Hämtar data

//Använder Data
export async function getStaticProps({ params }) {
  const topRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=top`
  );
  const topData = await topRes.json();

  const topArticles = topData.results;

  const topArticle = topArticles.find(
    (article) => article.article_id == params.id
  );

  const politicsRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=politics`
  );
  const politicsData = await politicsRes.json();

  const politicsArticles = politicsData.results;

  const politicsArticle = politicsArticles.find(
    (article) => article.article_id == params.id
  );

  const technologyRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=technology`
  );
  const technologyData = await technologyRes.json();

  const technologyArticles = technologyData.results;

  const technologyArticle = technologyArticles.find(
    (article) => article.article_id == params.id
  );

  const businessRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=business`
  );
  const businessData = await businessRes.json();

  const businessArticles = businessData.results;

  const businessArticle = businessArticles.find(
    (article) => article.article_id == params.id
  );

  const sportsRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=sports`
  );
  const sportsData = await sportsRes.json();

  const sportsArticles = sportsData.results;

  const sportsArticle = sportsArticles.find(
    (article) => article.article_id == params.id
  );

  return {
    props: {
      article:
        topArticle ||
        politicsArticle ||
        technologyArticle ||
        businessArticle ||
        sportsArticle, // Use whichever article is found first
    },
  };
}
//Använder Data

//Shantis add/delete knapp
export default function Article({ article }) {
  //det här är den ända ändringen i hennes kod
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
    const buttonText = isBookmarked ? "Remove Bookmark" : "Add Bookmark";
    const buttonIcon = isBookmarked ? "bookmark_remove" : "bookmark_added";
    return { text: buttonText, icon: buttonIcon };
  }
  //Shantis add/delete knapp

  return (
    <div className="px-20 pt-20 flex flex-col justify-center items-start ">
      {article && (
        <>
          <h2 className="text-5xl ">{article.title}</h2>
          <img className="w-1/2 mb-10" src={article.image_url} alt={article.title} />
          <div className="btn-container">
            <div className="bookmark-btn-wrapper">
              <button
                className="bookmark-btn mb-10"
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
            <span className="fade-out-text">{bookmarkText} {""} Lorem20</span>
          )}
          <p className="w-1/2 text-lg">{article.description} {""} Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quas itaque minima sit officiis nihil quasi quam tempore eligendi ratione...</p>
          <h3 className="text-4xl mb-20">{article.content}</h3>
        </>
      )}
    </div>
  );
}
