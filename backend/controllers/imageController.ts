import Image from "@models/Image";

async function getImageById(id: string) {
  const image = await Image.findByPk(id);
  return image;
}

export default { getImageById };
