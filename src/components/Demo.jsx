import { useState, useEffect, React } from "react";
import { copy, loader, linkIcon, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  async function handleSubmit(e) {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
      };
      setArticle(newArticle);
      console.log(newArticle);
    }
  }

  return (
    <section className="mt-16 w-full max-w-4xl">
      {/* Search  */}
      <div className="flex-col flex w-full gap-2">
        <form
          action=""
          className="relative flex justify-center items-center "
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter Url Here"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required="Please fill out this field"
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-800"
          >
            ↲
          </button>
        </form>

        {/* Browse Url History */}
      </div>
      {/* Display Results */}
    </section>
  );
};

export default Demo;
