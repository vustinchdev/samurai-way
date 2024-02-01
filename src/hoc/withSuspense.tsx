import React from "react";
import { RouteComponentProps } from "react-router-dom";

export function withSuspense<
  WCP extends JSX.IntrinsicAttributes & RouteComponentProps
>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <React.Suspense fallback={<div>loading...</div>}>
        <WrappedComponent {...props} />
      </React.Suspense>
    );
  };
}
