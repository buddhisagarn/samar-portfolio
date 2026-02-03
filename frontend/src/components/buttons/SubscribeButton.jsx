import { useEffect, useState } from "react";

const SubscribeModal = ({ onClose }) => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // // ⏱ auto open after 5 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => setOpen(true), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  //  disable scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // 📧 email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
      setSuccess(true);
      setEmail("");

      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setMessage("");
      }, 2500);
    } catch (err) {
      setError("Something went wrong ", err);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-md animate-fadeIn"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-[90%] max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {!success ? (
          <>
            <h2 className="text-2xl font-semibold text-blue-600">
              Subscribe for Updates
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your Email must be personal
            </p>

            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-5 w-full rounded-xl border border-blue-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            {error && (
              <p className="mt-2 text-left text-xs text-red-500">{error}</p>
            )}

            <button
              onClick={handleSubscribe}
              className="mt-5 w-full rounded-xl bg-linear-to-r from-blue-600 to-blue-400 py-3 text-sm font-medium text-white transition hover:opacity-95"
            >
              Subscribe
            </button>

            {message && <p className="mt-3 text-sm text-blue-600">{message}</p>}

            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <div className="mb-3 text-3xl animate-bounce"></div>
            <h2 className="text-2xl font-semibold text-blue-600">You're in!</h2>
            <p className="mt-1 text-sm text-gray-500">Thanks for subscribing</p>
          </>
        )}
      </div>

      {/* animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scaleIn {
          from { transform: scale(0.85); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.35s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SubscribeModal;
