import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Preloader } from "../components/common/Preloader/Preloader";

export function withSuspense<
  WCP extends JSX.IntrinsicAttributes & RouteComponentProps
>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <React.Suspense fallback={<Preloader />}>
        <WrappedComponent {...props} />
      </React.Suspense>
    );
  };
}
