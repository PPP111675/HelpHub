// models/JobListing.js
import mongoose from 'mongoose';

const jobListingSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  summary: String,
  url: String,
  source: String,
  postedDate: String,
}, { timestamps: true });

export default mongoose.model('JobListing', jobListingSchema);
