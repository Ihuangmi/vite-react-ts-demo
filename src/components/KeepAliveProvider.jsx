// 这是一个实现 keep-alive 功能的例子，使用了高阶组件（HOC）来包装需要保持活动状态的组件。HOC 可以使用 React 的上下文 API 来存储包装组件的状态，并仅在必要时渲染它。以下是一个示例实现：

import React, { createContext, useContext, useState } from "react";

const KeepAliveContext = createContext({});

export const useKeepAlive = (id) => {
  const { cache, setCache } = useContext(KeepAliveContext);

  if (!cache[id]) {
    setCache({ ...cache, [id]: { component: null } });
  }

  return {
    cache,
    setCache,
    component: cache[id].component,
    setComponent: (component) => setCache({ ...cache, [id]: { component } }),
  };
};

export const withKeepAlive = (WrappedComponent) => {
  const WithKeepAlive = (props) => {
    const { cache, setCache, component, setComponent } = useKeepAlive(props.id);

    if (!component) {
      return <WrappedComponent {...props} setComponent={setComponent} />;
    }

    return component;
  };

  return WithKeepAlive;
};

// BarChart 组件
const BarChart = ({ setComponent }) => {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "bar",
      },
    ],
  };

  React.useEffect(() => {
    setComponent(<ReactEcharts option={option} />);
  }, [setComponent]);

  return null;
};

// KeepAliveProvider 组件
const KeepAliveProvider = ({ children }) => {
  const [cache, setCache] = useState({});

  return (
    <KeepAliveContext.Provider value={{ cache, setCache }}>
      {children}
    </KeepAliveContext.Provider>
  );
};

// App 组件
export default function App() {
  return (
    <KeepAliveProvider>
      <div>
        <h1>Bar Chart</h1>
        <BarChart id="bar-chart" />
      </div>
    </KeepAliveProvider>
  );
}

// 来自 chatGPT
