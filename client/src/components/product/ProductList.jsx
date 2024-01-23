import React, { useEffect } from "react";
import "./App.css";
import ProductStore from "../../store/ProductStore";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
function ProductList() {
  const [rating, setRating] = useState(null);
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

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="card vh-100 p-3 shadow-sm">
            <label className="form-label mt-3">Brands</label>
            <select
              value={filter.brandID}
              onChange={(e) => {
                inputOnChange("brandID", e.target.value);
              }}
              className="form-control form-select"
            >
              <option value="">Choose Brand</option>
              {BrandList !== null ? (
                BrandList.map((item, i) => {
                  return (
                    <option value={item["_id"]}>{item["brandName"]}</option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            <label className="form-label mt-3">Categories</label>
            <select
              value={filter.categoryID}
              onChange={(e) => {
                inputOnChange("categoryID", e.target.value);
              }}
              className="form-control form-select"
            >
              <option value="">Choose Category</option>
              {CategoryList !== null ? (
                CategoryList.map((item, i) => {
                  return (
                    <option value={item["_id"]}>{item["categoryName"]}</option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            <label className="form-label mt-3">
              Maximum Price ${filter.priceMax}
            </label>
            <input
              value={filter.priceMax}
              onChange={(e) => {
                inputOnChange("priceMax", e.target.value);
              }}
              min={0}
              max={1000}
              step={10}
              type="range"
              className="form-range"
            />
            <label className="form-label mt-3">
              Minimum Price ${filter.priceMin}
            </label>
            <input
              value={filter.priceMin}
              onChange={(e) => {
                inputOnChange("priceMin", e.target.value);
              }}
              min={0}
              max={1000}
              step={10}
              type="range"
              className="form-range"
            />
          </div>
        </div>
        <div className="col-md-9 p-2">
          <div className="container">
            <div className="row">
              {" "}
              {ListProduct === null ? (
                <ProductsSkeleton />
              ) : (
                <div className="container">
                  <div className="row">
                    {ListProduct.map((item, i) => {
                      let price = (
                        <p className="bodyMedium  text-dark my-1">
                          Price: ${item["price"]}{" "}
                        </p>
                      );
                      if (item["discount"] === true) {
                        price = (
                          <p className="bodyMedium  text-dark my-1">
                            Price:<strike> ${item["price"]} </strike> $
                            {item["discountPrice"]}{" "}
                          </p>
                        );
                      }
                      return (
                        <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                          <Link
                            to={`/details/${item["_id"]}`}
                            className="card shadow-sm h-100 rounded-3 bg-white"
                          >
                            <img
                              className="w-100 rounded-top-2"
                              src={item["image"]}
                            />
                            <div className="card-body">
                              <p className="bodySmal text-secondary my-1">
                                {item["title"]}
                              </p>
                              {price}
                              {/* <Rating
                                onClick={handleRating}
                                initialValue={rating}
                              /> */}
                              {/* <FontAwesomeIcon icon="fa-sharp fa-regular fa-star" /> */}

                              {/* <button ><CiStar /></button> */}
                              {[...Array(5)].map((star, i) => {
                                const currentRating = i+1;
                                return (
                                  <label>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value={currentRating}
                                      onClick={() => setRating(currentRating)}
                                    />
                                    <FaStar className="star" size={20}
                                    color={currentRating<=(hover||rating)?'#ffc107':"#e4e5e9"}
                                    onMouseEnter={()=>setHover(currentRating)}
                                    onMouseLeave={()=>setHover(null)}
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
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
