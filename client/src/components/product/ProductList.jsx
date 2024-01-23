import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./App.css";
import ProductStore from "../../store/ProductStore";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";

function ProductList() {
  const [productRatings, setProductRatings] = useState({});
  const [hover, setHover] = useState(null);
  const {
    ListProduct,
    BrandList,
    BrandListRequest,
    CategoryList,
    CategoryListRequest,
    ListByFilterRequest,
  } = ProductStore();
  const [filter, setFilter] = useState({
    brandID: "",
    categoryID: "",
    priceMax: "",
    priceMin: "",
  });

  const inputOnChange = (name, value) => {
    setFilter((data) => ({
      ...data,
      [name]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      BrandList === null ? await BrandListRequest() : null;
      CategoryList === null ? await CategoryListRequest() : null;
      let isEveryFilterPropertyEmpty = Object.values(filter).every(
        (value) => value === ""
      );
      !isEveryFilterPropertyEmpty ? await ListByFilterRequest(filter) : null;
    })();
  }, [filter]);

  const handleRatingChange = (productId, newRating) => {
    setProductRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: newRating,
    }));
  };

  return (
    <div className="container mt-2">
      <div className="row">
        {/* ... (your existing code) ... */}
        <div className="col-md-9 p-2">
          <div className="container">
            <div className="row">
              {ListProduct === null ? (
                <ProductsSkeleton />
              ) : (
                <div className="container">
                  <div className="row">
                    {ListProduct.map((item, i) => {
                      let price = (
                        <p className="bodyMedium text-dark my-1">
                          Price: ${item["price"]}{" "}
                        </p>
                      );
                      if (item["discount"] === true) {
                        price = (
                          <p className="bodyMedium text-dark my-1">
                            Price:<strike> ${item["price"]} </strike> $
                            {item["discountPrice"]}{" "}
                          </p>
                        );
                      }
                      const productId = item["_id"];
                      const productRating = productRatings[productId] || null;

                      return (
                        <div
                          className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                          key={productId}
                        >
                          <Link
                            to={`/details/${productId}`}
                            className="card shadow-sm h-100 rounded-3 bg-white"
                          >
                            <img
                              className="w-100 rounded-top-2"
                              src={item["image"]}
                              alt={item["title"]}
                            />
                            <div className="card-body">
                              <p className="bodySmal text-secondary my-1">
                                {item["title"]}
                              </p>
                              {price}
                              {[...Array(5)].map((star, i) => {
                                const currentRating = i + 1;
                                return (
                                  <label key={i}>
                                    <input
                                      type="radio"
                                      name={`rating-${productId}`}
                                      value={currentRating}
                                      onClick={() =>
                                        handleRatingChange(
                                          productId,
                                          currentRating
                                        )
                                      }
                                    />
                                    <FaStar
                                      className="star"
                                      size={20}
                                      color={
                                        currentRating <=
                                        (hover || productRating)
                                          ? "#ffc107"
                                          : "#e4e5e9"
                                      }
                                      onMouseEnter={() => setHover(currentRating)}
                                      onMouseLeave={() => setHover(null)}
                                    />
                                  </label>
                                );
                              })}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;