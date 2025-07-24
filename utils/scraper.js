export const getJobs = async (filters) => {
  return [
    { title: 'Software Developer', company: 'ABC Corp', location: 'Toronto', type: 'Full-Time' },
    { title: 'Graphic Designer', company: 'XYZ Ltd', location: 'Vancouver', type: 'Part-Time' }
  ];
};

export const getHouses = async (filters) => {
  return [
    { title: '2 BHK Apartment', price: '$1400/month', location: 'Mississauga' },
    { title: 'Studio Condo', price: '$1000/month', location: 'Ottawa' }
  ];
};
