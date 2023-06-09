import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { AuthContextProvider } from "./store/auth-context";

import "./index.css";

// import Community, { fetchPosts as fetchPosts } from "./routes/Community";
// import Goal from "./routes/Goal";

import NotLogin from "./routes/pages/NotLogin";
import RequestLogin from "./routes/pages/RequestLogin";

import NewPost, { action as newPostAction } from "./routes/pages/NewPost";
// import PostDetails, { loader as postDetailsLoader } from "./routes/PostDetails";

import WrapperRootLayOut from "./routes/pages/WrapperRootLayOut";
// import RootLayOut from "./routes/pages/RootLayout";

// import RootLayOutAuth from "./routes/auth/RootLayOutAuth";

import RootLayOutLogin from "../src/routes/auth/login/RootLayOutLogin";
import LoginPassword from "./routes/auth/login/LoginPassword";
import LoginEmailLink from "./routes/auth/login/LoginEmailLink";

import RootLayOutSignUp from "./routes/auth/signUp/RootLayOutSignUp";
import SignUpPassword from "./routes/auth/signUp/SignUpPassword";
import SignUpEmailLink from "./routes/auth/signUp/SignUpEmailLink";

const Community = lazy(() => import("./routes/pages/Community"));
const Goal = lazy(() => import("./routes/pages/Goal"));
const MyInfo = lazy(() => import("./routes/pages/MyInfo"));
const Analysis = lazy(() => import("./routes/pages/Analysis"));
const Notification = lazy(() => import("./routes/pages/Notification"));

// const NewPost = lazy(() => import("./routes/NewPost"));
// const PostDetails = lazy(() => import("./routes/PostDetails"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <WrapperRootLayOut />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<p>로딩중입니다...</p>}>
            <Community />
          </Suspense>
        ),
        // loader: () => import("./routes/Community").then((module) => module.loader()),
        // loader: fetchPosts,

        children: [
          // {
          //   path: "/:postId",
          //   element: (
          //     <Suspense fallback={<p>로딩중입니다...</p>}>
          //       <PostDetails />
          //     </Suspense>
          //   ),
          //   loader: () => import("./routes/PostDetails").then((module) => module.loader()),
          // },
        ],
      },
      {
        path: "/goal",
        element: (
          <Suspense fallback={<p>로딩중입니다...</p>}>
            <Goal />
          </Suspense>
        ),
      },
      {
        path: "/myinfo",
        element: (
          <Suspense fallback={<p>로딩중입니다...</p>}>
            <MyInfo />
          </Suspense>
        ),
      },
      {
        path: "/notification",
        element: (
          <Suspense fallback={<p>로딩중입니다...</p>}>
            <Notification />
          </Suspense>
        ),
      },
      {
        path: "/analysis",
        element: (
          <Suspense fallback={<p>로딩중입니다...</p>}>
            <Analysis />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/not_login",
    element: (
      <Suspense fallback={<p>로딩중입니다...</p>}>
        <NotLogin />
      </Suspense>
    ),
  },
  {
    path: "/request_login",
    element: (
      <Suspense fallback={<p>로딩중입니다...</p>}>
        <RequestLogin />
      </Suspense>
    ),
  },
  {
    path: "/create_post",
    element: (
      // <Suspense fallback={<p>로딩중입니다...</p>}>
      <NewPost />
      // </Suspense>
    ),
    action: newPostAction,
    // action: ({ request }) => import("./routes/NewPost").then((module) => module.action({ request })),
  },
  {
    path: "sign_up",
    element: <RootLayOutSignUp />,
    children: [
      {
        path: "with_email_link",
        element: <SignUpEmailLink />,
      },
      {
        path: "with_password",
        element: <SignUpPassword />,
        // loader: () => import("./routes/Community").then((module) => module.loader()),
      },
    ],
  },
  {
    path: "login",
    element: <RootLayOutLogin />,
    children: [
      {
        path: "with_email_link",
        element: <LoginEmailLink />,
      },
      {
        path: "with_password",
        element: <LoginPassword />,
      },
    ],
  },

  // {
  //   path: "/login",
  //   element: <RootLayOutLogin />,
  //   children: [
  //     {
  //       path: "with_password",
  //       element: <LoginPassword />,
  //     },
  //     {
  //       path: "with_email_link",
  //       element: <LoginEmailLink />,
  //     },
  //   ],
  // },
  // {
  //   path: "/sign_up",
  //   element: <RootLayOutSignUp />,
  //   children: [
  //     {
  //       path: "with_password",
  //       element: <SignUpPassword />,
  //       // loader: () => import("./routes/Community").then((module) => module.loader()),
  //     },
  //     {
  //       path: "with_email_link",
  //       element: <SignUpEmailLink />,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
