import { BrowserRouter, Route, Routes } from "react-router-dom";
import Invoices from "./pages/Invoices";
import Signup from "./pages/Signup";
import AppLayout from "./pages/AppLayout";
import InvoiceDetails from "./pages/InvoiceDetails";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { createContext, useEffect, useMemo, useRef } from "react";
import AppTheme from "./utilities/appTheme";
import AppLanguage from "./utilities/appLanguage";
import ProtectedRoute from "./ui/ProtectedRoute";
import Account from "./pages/Account";
import Accounts from "./pages/Accounts";
import Dashboard from "./pages/Dashboard";
import Movements from "./pages/Movements";
import Users from "./pages/Users";
import UserReport from "./pages/UserReport";
import EditUserForm from "./features/users/EditUserForm";
import AdminProtectedRoute from "./ui/AdminProtectedRoute";

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/invoices",
//         element: <Invoices />,
//       },
//       {
//         path: "/register",
//         element: <Signup />,
//       },
//       {
//         path: "/invoices/:id",
//         element: <InvoiceDetails />,
//       },
//     ],
//   },
// ]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export const AppContext = createContext();
function App() {
  const [t, i18n] = useTranslation();

  let myAppLanguage = useRef();
  let myTheme = useRef();

  useMemo(() => {
    myTheme.current = new AppTheme();
    myAppLanguage.current = new AppLanguage();
  }, []);

  function toggleCurrentTheme() {
    myTheme.current.toggleTheme();
  }
  function toggleCurrentLanguage() {
    i18n.changeLanguage(myAppLanguage.current.targetLanguage);
    myAppLanguage.current.toggleLanguage();
  }

  useEffect(() => {
    // i18n.language = myAppLanguage.current.appliedLanguage;
    i18n.changeLanguage(myAppLanguage.current.appliedLanguage);
    myTheme.current.applyCurrentTheme();
    myAppLanguage.current.applyCurrentLanguage();
  }, [myTheme, myAppLanguage, i18n]);
  // return <RouterProvider router={router} />;

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AppContext.Provider
          value={{ toggleCurrentLanguage, toggleCurrentTheme }}
        >
          <Routes>
            <Route
              element={
                <AdminProtectedRoute>
                  <AppLayout />
                </AdminProtectedRoute>
              }
            >
              <Route path="reports/:id" element={<UserReport />} />
              <Route path="register" element={<Signup />} />
              <Route path="movements" element={<Movements />} />
              <Route path="accounts" element={<Users />} />
            </Route>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="accounts/:id" element={<Account />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="invoices/:id" element={<InvoiceDetails />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            <Route />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
