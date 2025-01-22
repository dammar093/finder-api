import Property from "../models/property.model";

export const uploadPropertyService = async (title: string, description: string, price: number, location: string, longitude: number, latitude: number, bedrooms: number, bathrooms: number, image: string) => {
  const property = new Property({
    title,
    description,
    price,
    location,
    longitude,
    latitude,
    bedrooms,
    bathrooms,
    image
  });
  await property.save();
  return property;
};