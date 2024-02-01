import React, { Suspense } from "react";
import logo from './logo.svg';
import './App.css';

const Footer = React.lazy(() => import("./Footer"))
const Header = React.lazy(() => import('./Header'));
const SideBar = React.lazy(() => import('./Sidebar'))


function App() {
  return (
    <Suspense fallback="Loading">
      <Header />

      <SideBar />
      {/* <div>
        <p>Copyright {new Date().getFullYear()} All Rights Reserved</p></div> */}
    </Suspense>
  );
}

export default App;
