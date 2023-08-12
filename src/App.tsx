import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Router from "./shared/Router";
import { OverlayProvider } from "components/overlay/Overlay.context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {}
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <Router />
      </OverlayProvider>
    </QueryClientProvider>
  );
}

export default App;
