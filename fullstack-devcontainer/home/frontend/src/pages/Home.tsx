import { Navbar } from "@/components/navbar";
import "./Home.css";
import { ThemeProvider } from "@/components/theme-provider";

function Home() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">  
      <Navbar />
    </ThemeProvider>
  );
}

export default Home;
