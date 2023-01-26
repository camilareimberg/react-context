import GlobalState from "./contexts/GlobalState";
import Router from "./routes/Router";

export default function App() {
  return (
    <>
      <GlobalState>
        <Router />
      </GlobalState>
    </>
  );
}
