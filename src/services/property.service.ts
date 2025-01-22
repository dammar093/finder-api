import Property from "../models/property.model";

export const createPropertiesService = async (
  title: string,
  description: string,
  services: string[],
  price: number,
  location: string,
  longitude: number,
  latitude: number,
  status: boolean,
  images: string[],
  duration: number,
  duration_type: string,
  category: string,
  user: string
) => {
  let property = await Property.create({
    title,
    description,
    services,
    price: Number(price),
    location,
    longitude: Number(longitude),
    latitude: Number(latitude),
    status,
    images,
    duration: Number(duration),
    duration_type,
    category,
    user,
  });
  return property;
};

export const getPropertiesService = async () => {
  const properties = await Property.find().populate("category", "name").populate("user", "fullName email phoneNumber email _id");
  return properties;
}

export const getPropertyService = async (id: string) => {
  const property = await Property.findById(id).populate("category", "_id name").populate("user", "fullName email phoneNumber email _id");
  return property;
}
