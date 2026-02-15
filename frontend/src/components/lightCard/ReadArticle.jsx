import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/api/api";
import { FaArrowLeft } from "react-icons/fa";
const ReadArticle = ({ onClose }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await API.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading article...</p>;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start gap-5">
        <p className="text-center mt-10">Article not found</p>
        <button
          className="bg-blue-700 p-2 text-white rounded-sm flex items-center gap-2 cursor-pointer"
          onClick={() => (window.location.href = "/news")}
        >
          <FaArrowLeft />
          Back Home
        </button>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          {article.title}
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Published on {new Date(article.createdAt).toDateString()}
        </p>

        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full rounded-lg mb-6"
          />
        )}

        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
          {article.content}
        </p>
      </div>
    </div>
  );
};

export default ReadArticle;
