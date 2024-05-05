import { sequelize } from "@database";
import { DataTypes, Model } from "sequelize";

class Image extends Model {
  declare id: number;
  declare createAt: Date;
  declare updateAt: Date;

  declare src: string;
}

Image.init(
  {
    src: {
      type: DataTypes.TEXT("medium"),
    },
  },
  {
    sequelize,
    modelName: "Image",
  }
);

export default Image;
