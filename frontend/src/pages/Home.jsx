import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./util";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setloggedInuser] = useState();
  const [Product, setProduct] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setloggedInuser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    handleSuccess("User are logout");
  };
  const ProductsAPI = async (e) => {
    try {
      const productsURL = "http://localhost:8080/products";
      const headers = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(productsURL, headers);
      const result = await response.json();
      // console.log(result);
      setProduct(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    ProductsAPI();
  }, []);

  return (
    <div>
      <div>
        <h1>Welcome {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        {Product &&
          Product.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
