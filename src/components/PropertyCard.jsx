import React from "react";

const PropertyCard = ({ property }) => {
  const {
    title,
    address,
    neighborhood_name,
    city,
    state,
    zipcode,
    min_price,
    max_price,
    min_bedrooms,
    max_bedrooms,
    min_bathrooms,
    max_bathrooms,
    amenity_tags = [],
    building_amenity_tags = [],
    url,
    rating,
    image_ids = [],
  } = property;

 const getImageUrl = (id) =>
  `https://img.zumpercdn.com/${id}/1280x960?w=640&fit=max&dpr=2&q=50`;


  return (
    <div className="rounded-xl border shadow-md overflow-hidden bg-white hover:shadow-lg transition">
      {image_ids.length > 0 && (
        <img
  src={getImageUrl(image_ids[0])}
  alt={title}
  className="mt-2 w-full h-48 object-cover rounded"
/>

      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{address}, {neighborhood_name}, {city}, {state} {zipcode}</p>

        <div className="my-2 text-sm text-gray-700">
          <p>
            <strong>Rent:</strong> ${min_price} – ${max_price}
          </p>
          <p>
            <strong>Bedrooms:</strong> {min_bedrooms} – {max_bedrooms}
          </p>
          <p>
            <strong>Bathrooms:</strong> {min_bathrooms} – {max_bathrooms}
          </p>
        </div>

        {rating && (
          <div className="text-yellow-600 text-sm font-semibold mb-2">
            ⭐ Rated {rating}/10
          </div>
        )}

        <div className="mb-3">
          {amenity_tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 mr-2 mb-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={`https://www.zumper.com${url}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-2 text-sm font-medium text-blue-600 hover:underline"
        >
          View Listing →
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
