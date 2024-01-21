import React from "react";
import ProductImage from "./ProductImage.jsx";
import ProductStore from "../../store/ProductStore.js";
import DetailsSkeleton from "../../skeleton/DetailSkeleton";
import parse from "html-react-parser";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import Review from "./Review.jsx";
function Details() {
  const { DetailList, ReviewList } = ProductStore();
  const [qty, setQty] = useState(1);

  const [reviewButton, setReviewButton] = useState(false);
  const [specifyButton, setSpecifyButton] = useState(true);

  const incrementQty = () => {
    setQty((qty) => qty + 1);
  };
  const decrementQty = () => {
    if (qty > 1) {
      setQty((qty) => qty - 1);
    }
  };
  console.log(DetailList);
  if (DetailList === null) {
    return <DetailsSkeleton />;
  } else {
    return (
      <div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-7 align-content-center p-1">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <Skeleton count={1} />
                  </div>
                  <div className="col-3">
                    <Lottie className="w-100" animationData={""} loop={true} />
                  </div>
                  <div className="col-3">
                    <Lottie className="w-100" animationData={""} loop={true} />
                  </div>
                  <div className="col-3">
                    <Lottie className="w-100" animationData={""} loop={true} />
                  </div>
                  <div className="col-3">
                    <Lottie className="w-100" animationData={""} loop={true} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 p-1">
              <Skeleton count={1} />
            </div>
          </div>
        </div>
        <div>
          <div className="container mt-2">
            <div className="row">
              <div className="col-md-7 p-3">
                <ProductImage />
              </div>
              <div className="col-md-5 p-3">
                <h4>{DetailList[0]["title"]}</h4>
                <p className="text-muted bodySmal my-1">
                  Category:{DetailList[0]["category"]["categoryName"]}
                </p>
                <p className="text-muted bodySmal my-1">
                  Brand:{DetailList[0]["brand"]["brandName"]}
                </p>
                <p className="bodySmal mb-2 mt-1">
                  shortDes:{DetailList["0"]["shortDes"]}
                </p>
                {DetailList[0]["discount"] ? (
                  <span className="bodyXLarge">
                    price:
                    <strike class="text-secondary">
                      {DetailList[0]["price"]}
                    </strike>
                    {DetailList[0]["discountPrice"]}
                  </span>
                ) : (
                  <span>{DetailList[0]["price"]}</span>
                )}
                <div className="row">
                  <div className="col-4 p-2">
                    <label className="bodySmal">Size</label>
                    <select className="form-control my-2 form-select">
                      <option value="">Size</option>
                      {DetailList[0]["details"]["size"]
                        .split(",")
                        .map((item, i) => {
                          return <option value={item}>{item}</option>;
                        })}
                    </select>
                  </div>
                  <div className="col-4 p-2">
                    <label className="bodySmal">Color</label>
                    <select className="form-control my-2 form-select">
                      <option value="">Color</option>
                      {DetailList[0]["details"]["color"]
                        .split(",")
                        .map((item, i) => {
                          return <option value={item}>{item}</option>;
                        })}
                    </select>
                  </div>
                  <div className="col-4 p-2">
                    <label className="bodySmal">Quantity</label>
                    <div className="input-group my-2">
                      <button
                        onClick={decrementQty}
                        className="btn btn-outline-secondary"
                      >
                        -
                      </button>
                      <input
                        value={qty}
                        type="text"
                        className="form-control bg-light text-center"
                        readOnly
                      />
                      <button
                        onClick={incrementQty}
                        className="btn btn-outline-secondary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-4 p-2">
                    <button className="btn w-100 btn-success">
                      Add to Cart
                    </button>
                  </div>
                  <div className="col-4 p-2">
                    <button className="btn w-100 btn-success">
                      Add to Wish
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      setReviewButton(false);
                      setSpecifyButton(true);
                    }}
                    className="nav-link active"
                    id="Speci-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Specitab-pane"
                    type="button"
                    role="tab"
                    aria-controls="Speci-tab-pane"
                    ariaselected="true"
                  >
                    Specifications
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      setReviewButton(true);
                      setSpecifyButton(false);
                    }}
                    className="nav-link"
                    id="Review-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Review-tab-
        pane"
                    type="button"
                    role="tab"
                    aria-controls="Review-tab-pane"
                    aria-selected="false"
                  >
                    Review
                  </button>
                  {reviewButton === true && <Review />}
                  {specifyButton === true && <div
                  className="tab-pane fade show active"
                  id="Speci-tab-pane"
                  role="tabpanel"
                  arialabelledby="Speci-tab"
                  tabIndex="0"
                >
                  {parse(DetailList[0]["details"]["des"])}
                </div>}
                </li>
              </ul>
              {/* <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="Speci-tab-pane"
                  role="tabpanel"
                  arialabelledby="Speci-tab"
                  tabIndex="0"
                >
                  {parse(DetailList[0]["details"]["des"])}
                </div>
                <div
                  className="tab-pane fade"
                  id="Review-tab-pane"
                  role="tabpanel"
                  aria-labelledby="Review-tab"
                  tabIndex="0"
                >
                  <ul className="list-group list-group-flush"></ul>
                  <Review />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
