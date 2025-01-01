import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Suspense, useState } from "react";
import Layout from "./components/Layout.jsx";
import Listing from "./pages/Listing.jsx";
import Property from "./pages/Property.jsx";
import Bookings from "./pages/Bookings.jsx";
import Favourites from "./pages/Favourites.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userDetailContext from "./context/UserDetailContext.js";

export default function App() {
  const queryClient = new QueryClient();
  const [userDetail, setUserDetail] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });
  return (
    <userDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listing">
                  <Route index element={<Listing />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </userDetailContext.Provider>
  );
}
