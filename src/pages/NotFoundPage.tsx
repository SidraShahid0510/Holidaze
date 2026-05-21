import { useEffect } from "react";

function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found | Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "The page you are looking for could not be found on Holidaze.",
      );
    }
  }, []);

  return <h1>404 - Page Not Found</h1>;
}

export default NotFoundPage;
