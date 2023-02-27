import React, {useState} from "react";

const Star = ({ marked, starId }) => {
    return (
        <span data-star-id={starId} className="star" style={{color:'#ff9933'}} role="button">
      {marked ? '\u2605' : '\u2606'}
    </span>
    );
};

const StarRating = ({ value }) => {
    const [rating, setRating] = useState(parseInt(value) || 0);
    const [selection, setSelection] = useState(0);
    return (
        <div style={{display:'contents'}}>
            {Array.from({ length: 5 }, (v, i) => (
                <Star
                    starId={i + 1}
                    key={`star_${i + 1}`}
                    marked={selection ? selection >= i + 1 : rating >= i + 1}
                />
            ))}
        </div>
    );
};
export default StarRating;