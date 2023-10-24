import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import { Nav } from "./nav";

export const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        {ROUTES.map(({ Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="/" element={<Navigate to={ROUTES[0].path} />} />
      </Routes>
    </>
  );
};
