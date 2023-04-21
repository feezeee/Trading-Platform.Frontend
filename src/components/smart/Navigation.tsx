import React from "react";
import logo from "../../images/logo.png";

function Navbar() {
  return (
    <div style={{ backgroundColor : "#a5d8fa" }}>
      <div className="container">
        <nav className="navbar navbar-expand">
          <div className="container-fluid justify-content-start">
            <a className="navbar-brand" href="/">
              <img
                className="d-inline-block"
                src={logo}
                alt="Куплю | Продам"
                width="50"
                height="50"
              />
            </a>
            <form className="d-flex w-100" role="search">
              <input
                id="floatSearch"
                className="form-control"
                type="search"
                placeholder="Поиск"
                aria-label="Поиск"
              />
              <button className="btn btn-success" type="submit">
                Поиск
              </button>
            </form>
            <div className="d-flex ms-5">
              <button className="btn btn-outline-success" type="submit">
                Войти
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>

    // <div className="">
    //   <div className="container-xxl text-center">
    //     <div className="row w-100">
    //       <div className="col-md-auto">
    //         <a href="/">
    //           <img src={logo} alt="Куплю | Продам" width="50" height="50" />
    //         </a>
    //       </div>
    //       <div className="col">
    // <form className="d-flex" role="search">
    //   <input
    //     className="form-control me-2"
    //     type="search"
    //     placeholder="Поиск"
    //     aria-label="Поиск"
    //   />
    //   <button className="btn btn-outline-success" type="submit">
    //     Поиск
    //   </button>
    // </form>
    //       </div>
    //     </div>
    //     {/* <a className="navbar-brand" href="#">
    //       <img src={logo} alt="Куплю | Продам" width="50" height="50" />
    //     </a>
    //     <form className="d-flex" role="search">
    //       <input
    //         className="form-control me-2"
    //         type="search"
    //         placeholder="Поиск"
    //         aria-label="Поиск"
    //       />
    //       <button className="btn btn-outline-success" type="submit">
    //         Поиск
    //       </button>
    //     </form> */}
    //     {/* <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNav"
    //       aria-controls="navbarNav"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button> */}
    //     {/* <div className="collapse navbar-collapse" id="navbarNav">
    //       <ul className="navbar-nav">
    //         <li className="nav-item">
    //           <a className="nav-link active" aria-current="page" href="#">
    //             Home
    //           </a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">
    //             Features
    //           </a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">
    //             Pricing
    //           </a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link disabled">Disabled</a>
    //         </li>
    //       </ul>
    //     </div> */}
    //   </div>
    // </div>
  );
}

export default Navbar;
