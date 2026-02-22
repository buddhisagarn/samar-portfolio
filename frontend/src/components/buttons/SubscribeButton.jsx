import { useEffect, useState } from "react";

const SubscribeModal = ({ onClose }) => {
  const [open, setOpen] = useState(true);

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URI}/auth/google`;
  };

  // Disable scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-md"
      onClick={() => {
        setOpen(false);
        onClose && onClose();
      }}
    >
      <div
        className="relative w-[90%] max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-blue-600">
          Continue with Google
        </h2>

        <p className="text-sm text-gray-400 mt-2">
          Secure sign in using your Google account
        </p>

        <button
          onClick={googleLogin}
          className="px-4 py-3 w-full mt-6 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          Login with Google
        </button>

        <button
          onClick={() => {
            setOpen(false);
            onClose && onClose();
          }}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SubscribeModal;
