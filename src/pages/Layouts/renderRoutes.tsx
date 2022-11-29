import { RoutesType } from "@/routes";
import React from "react";
import {
  Navigate,
  Route as ReactRoute,
  Routes,
  RoutesProps,
} from "react-router-dom";

interface IOpts {
  routes: RoutesType[];
  extraProps?: object;
  parentPath?: string;
}

interface IGetRouteElementOpts {
  route: RoutesType;
  index: number;
  opts: IOpts;
}

/**
 * 渲染路由
 */

function render({
  route,
  opts,
  props,
}: {
  route: RoutesType;
  opts: IOpts;
  props: any;
}) {
  const routes = renderRoutes(
    {
      ...opts,
      routes: route.children || [],
    },
    { location: props.location }
  );

  let { element } = route;

  if (element) {
    // const newProps = {
    //   ...props,
    //   ...opts.extraProps,
    //   route,
    // };

    // let ret = <Component {...newProps}>{routes}</Component>;

    return element;
  } else {
    return routes;
  }
}

function getRouteElement({ route, index, opts }: IGetRouteElementOpts) {
  const routeProps = {
    key: route.path || index,
    path: route.path,
    element: route.element,
    caseSensitive: route.caseSensitive,
  };

  if (route.redirect) {
    return <Navigate {...routeProps} to={route.redirect} />;
  }

  return (
    <ReactRoute
      {...routeProps}
      // render={(props) =>
      //   render({
      //     route,
      //     opts,
      //     props,
      //   })
      // }
    />
  );
}

export function renderRoutes(opts: IOpts, RoutesProps = {}) {
  return opts.routes ? (
    <Routes {...RoutesProps}>
      {opts.routes.map((route, index) =>
        getRouteElement({
          route,
          index,
          opts: {
            ...opts,
            parentPath: opts.parentPath || "/",
          },
        })
      )}
    </Routes>
  ) : null;
}

function CreateRoutes(props: {
  routes?: RoutesType[];
  loading?: boolean;
  RoutesProps?: RoutesProps;
}) {
  const { routes, loading, RoutesProps } = props;
  console.log("🚀 ~ file: renderRoutes.tsx ~ line 109 ~ routes", routes);

  return renderRoutes(
    { routes: routes!, extraProps: { loading } },
    RoutesProps
  );
}

export default CreateRoutes;
