import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Layout } from "../shell/Layout";
import { HomePage } from "./HomePage";
import { GamePage } from "./GamePage";
import { detectLocale, isLocale, LOCALES } from "../i18n/locales";

function LocaleRedirect() {
  return <Navigate to={`/${detectLocale()}`} replace />;
}

function LocaleGate({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LocaleRedirect />,
  },
  {
    path: "/:locale",
    element: <Layout />,
    children: [
      { index: true, element: <LocaleGate><HomePage /></LocaleGate> },
      { path: ":gameSlug", element: <LocaleGate><GamePage /></LocaleGate> },
    ],
    loader: ({ params }) => {
      if (!isLocale(params.locale)) {
        throw new Response("Not Found", { status: 404 });
      }
      if (typeof document !== "undefined") {
        document.documentElement.lang = params.locale;
      }
      return null;
    },
    errorElement: <Navigate to={`/${detectLocale()}`} replace />,
  },
  {
    path: "*",
    element: <Navigate to={`/${detectLocale()}`} replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

// re-export so we can check at top-level
export { LOCALES };
