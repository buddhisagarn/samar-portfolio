import { useEffect } from "react";

export default function AuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const email = params.get("email");
    const token = params.get("token");

    if (email && token) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("token", token);

      // optional: decode name from backend later if needed
      window.location.href = "/";
    }
  }, []);

  return <p className="text-center mt-10">Authorizing Gmail…</p>;
}
