import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {API_URL, dataProvider} from "./rest-data-provider";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components";
import { ThemeWrapper } from "./components/theme-wrapper";
import {
  BusinessCreate,
  BusinessEdit,
  BusinessList,
  BusinessShow,
} from "./pages/businesses";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import {TermsOfService} from "./components/legal/TermsOfService";
import {PrivacyPolicy} from "./components/legal/PrivacyPolicy";
import {Title} from "./components/layout/title";
import resources from "./resources";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeWrapper>
          <AntdApp>
              <Refine
                dataProvider={dataProvider(API_URL)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "Jj8R7O-7mDdAh-F0SnmU",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed Title={() => <Title width={120}/>} />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="businesses" />}
                    />
                    <Route path="/businesses">
                      <Route index element={<BusinessList />} />
                      <Route path="create" element={<BusinessCreate />} />
                      <Route path="edit/:id" element={<BusinessEdit />} />
                      <Route path="show/:id" element={<BusinessShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                  <Route path="terms-of-service" element={<TermsOfService/>} />
                  <Route path="privacy-policy" element={<PrivacyPolicy/>} />
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
{/*
              <DevtoolsPanel />
*/}
          </AntdApp>
        </ThemeWrapper>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
