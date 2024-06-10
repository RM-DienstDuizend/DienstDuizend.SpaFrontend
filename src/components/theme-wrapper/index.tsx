import { RefineThemes } from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import { PropsWithChildren, createContext, useEffect, useState } from "react";



export const ThemeWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {


  const { defaultAlgorithm } = theme;

  return (
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
          theme={{
            token: {
              colorPrimary: "#023e8a",
            },
          algorithm: defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
  );
};
