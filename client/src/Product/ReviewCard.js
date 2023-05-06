import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    edit : false,
    color : "rgba(20,20,20,0.1)",
    activeColor : "tomato",
    size : window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    readOnly: true,
    isHalf : true,
  };

  return (
    <div className="reviewCard">
      <p>{review.uname}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;