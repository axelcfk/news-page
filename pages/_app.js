import { BookMarkProvider } from "@/BookMarkContext";
import "../styles/globals.css";
// import 'tailwindcss/tailwind.css'; // Import Tailwind CSS, same as @import "tailwindcss/base"; in globals.css... this fixes the issue with updating fonts in tailwind.config.js, but it adds a lot of default styles... 
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "../ThemeContext";
import ScrollToTop from "@/ScrollToTopButton";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";


function MyApp({ Component, pageProps }) {
  const { state } = useTheme();

  console.log(state);
  console.log(state.userPreferences.theme);

  useEffect(() => {

    const rootEl = document.documentElement;
    if (state.userPreferences.theme === "light") {
      rootEl.classList.add("dark");
      rootEl.style.backgroundColor = "#1A1C21"; // ROOT BACKGROUND COLOR
      rootEl.style.color = "#eeeff2ed"; // ROOT TEXT COLOR
    } else if (state.userPreferences.theme === "dark") {
      rootEl.classList.remove("dark");
      rootEl.style.backgroundColor = "#eeeff2ed"; // ROOT BACKGROUND COLOR
      rootEl.style.color = "#1A1C21"; // ROOT TEXT COLOR
    } else {
      console.log("Unknown Theme for Dark/Light mode");
    }

  }, [state.userPreferences.theme]); 

  return (
    <BookMarkProvider>
      
      <Navbar />
      <ScrollToTop />
      <Component {...pageProps} />
      <Footer />
    </BookMarkProvider>
  );
}

export default ({ Component, pageProps }) => (
  <ThemeProvider>
    <MyApp Component={Component} pageProps={pageProps} />
  </ThemeProvider>
);
