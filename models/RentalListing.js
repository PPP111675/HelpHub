import mongoose from 'mongoose';

const rentalListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: String,
  price: String,
  bedrooms: String,
  bathrooms: String,
  sqft: String,
  imageUrl: String,
  description: String,
  url: {
    type: String,
    unique: true,
  },
  source: {
    type: String,
    enum: ['Rentals.ca', 'Kijiji', 'Other'],
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

export default mongoose.model('RentalListing', rentalListingSchema);
