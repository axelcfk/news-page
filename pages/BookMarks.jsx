import { BookMarkContext } from "@/BookMarkContext";
import { useContext } from "react";
import Link from "next/link";
import { fetchDataByCategory } from "./api";
import Subscribe from "@/components/Subscribe";

const myAPI_KEY = "pub_3900581ff98cc657ee844badca5975b771778"; // 200 hämtningar per dag?

export async function getStaticProps() {
  // fetch all categories we use on the page so we can load in all types of bookmarks
  const [topNews, politicsNews, techNews, businessNews, sportsNews] =
    await Promise.all([
      fetchDataByCategory("top"), // from api.jsx
      fetchDataByCategory("politics"),
      fetchDataByCategory("technology"),
      fetchDataByCategory("business"),
      fetchDataByCategory("sports"),
    ]);

  /*  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=business,politics,sports,technology,top`
  );
  const data = await res.json(); */
  /* 
  return {
    props: {
     news: data.results,
    },
    revalidate: 10,
  }; */
  return {
    props: {
      topNews: topNews,
      politicsNews: politicsNews,
      techNews: techNews,
      businessNews: businessNews,
      sportsNews: sportsNews,
    },
    revalidate: 10,
  };
}

export default function BookMarks({
  techNews,
  politicsNews,
  businessNews,
  topNews,
  sportsNews,
}) {
  //export default function BookMarks({news}) {
  const { state, dispatch } = useContext(BookMarkContext);

  const combinedData = [
    ...techNews,
    ...politicsNews,
    ...businessNews,
    ...topNews,
    ...sportsNews,
  ];

  // filter the articles to those that match with our bookmark ids...
  const filteredArticles = combinedData.filter(
    (article) =>
      state.bookmarks.find((bookmark) => bookmark.id === article.article_id) // find stops at the first match... But React.StrictMode etc can still lead to duplicates(due to running 2 times for testing purposes) so we remove duplicates after this...(?)
  );

  console.log(filteredArticles);

  // remove duplicates, it occurs even though we use 'find' above(?):
  let articlesNoDuplicates = [];

  for (let i = 0; i < filteredArticles.length; i++) {
    let isDuplicate = false;
    for (let j = i + 1; j < filteredArticles.length; j++) {
      if (filteredArticles[i].article_id === filteredArticles[j].article_id) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      articlesNoDuplicates = [...articlesNoDuplicates, filteredArticles[i]];
    }
  }

  function deleteBookmark(article) {
    dispatch({
      type: "delete",
      id: article.article_id,
    });
  }

  function clearBookmarks() {
    dispatch({
      type: "clear",
    });
  }

  return (
    <div className="px-20">
      {/*  <div className={`${inter.className}`}> */}
      {/* <p>Saved articles:</p>
      {state.bookmarks.map((bookmark) => (
        <span key={bookmark.id}> {bookmark.id}</span>
      ))} */}
      <div className="flex justify-center">
        <h1>Saved Articles</h1>
      </div>
      <button
        className="py-2 px-4 rounded-lg border-none bg-[#1A1C21] text-white font-bold dark:bg-white dark:text-[#1A1C21] hover:cursor-pointer"
        onClick={() => {
          clearBookmarks();
        }}
      >
        Clear All Bookmarks
      </button>
      <div className="flex justify-center mt-4 border-t-1 border-b-0 border-l-0 border-r-0 border-solid border-[#1A1C21] dark:border-[#EEEFF2]">
        <div className="flex">
          <h3 className="bg-[#1A1C21] dark:bg-[#EEEFF2] text-[#EEEFF2] dark:text-[#1A1C21] p-1 m-0">
            Saved
          </h3>
        </div>
      </div>

      {articlesNoDuplicates.length > 0 ? (
        <ul className="grid grid-cols-1 gap-2">
          {/* {filteredArticles.map((article) => (
          // "0.5px solid black"
          <li style={{borderBottom: "0.5px solid black"}} className="flex flex-col gap-2 p-4  " key={article.article_id}> */}
          {articlesNoDuplicates.map(
            (
              article,
              index // using index to remove padding at the top
            ) => (
              // "0.5px solid black"

              <li
                className={`border-b-[0.5px] border-t-0 border-l-0 border-r-0 border-solid border-gray-300 p-4 ${
                  index === 0 ? "pt-0" : "pt-4"
                } flex flex-col gap-2`}
                key={article.article_id}
              >
                <div>
                  <button
                    className="text-[10px] py-2 px-4 rounded-lg border-none bg-white hover:cursor-pointer"
                    onClick={() => deleteBookmark(article)}
                  >
                    Delete Bookmark
                  </button>
                </div>
                <Link
                  className="no-underline hover:underline hover:text-black dark:hover:text-white"
                  href={`/article/${article.article_id}`}
                >
                  <div className="flex gap-4 items-end">
                    <div className="h-20 w-28 overflow-hidden ">
                      <img
                        className="h-full w-auto"
                        src={article.image_url}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="no-underline text-black dark:text-white">
                        {article.title}
                      </h2>
                      <p className="text-black dark:text-white text-sm p-0 m-0">
                        {article.creator}
                      </p>
                    </div>
                  </div>
                </Link>

                {console.log(article.image_url)}
              </li>
            )
          )}
        </ul>
      ) : (
        <div className="flex justify-center mt-20">
          {" "}
          {/* mt-20 is the same as Subscribe section */}
          <h2>You have no saved articles</h2>
        </div>
      )}

      <Subscribe />
    </div>
  );
}
