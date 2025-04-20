import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Login from "./pages/auth/login";
import MainLayout from "./components/main-layout";

const App = () => {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path={"/app"} element={<MainLayout />}>
        {routes?.map((item, index) => {
          return (
            <Route
              key={index}
              index={item?.index ? true : false}
              path={item.path}
              element={item.element}
            />
          );
        })}
      </Route>
      <Route
        path="/*"
        element={
          <h1>
            NOT FOUND!
            <br />
            404
          </h1>
        }
      />
    </Routes>
  );
};

export default App;
