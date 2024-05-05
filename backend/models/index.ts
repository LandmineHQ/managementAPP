import dblogger from "@utils/dbLogger";

/** 加载模型关系 */
async function loadModelsAssociations() {
  dblogger.info("models associations has been loaded.");

  // 延迟导入模型
  // 避免循环依赖
  const Person = (await import("./Person")).default;
  const User = (await import("./User")).default;
  const Training = (await import("./Training")).default;
  const VerificationCode = (await import("./VerificationCode")).default;
  const Message = (await import("./Message")).default;
  const Socket = (await import("./Socket")).default;
  const Image = (await import("./Image")).default;
  const Policy = (await import("./Policy")).default;
  const Group = (await import("./Group")).default;

  Person.hasOne(User);
  User.belongsTo(Person, { foreignKey: "identity_binding" });

  User.hasOne(VerificationCode);
  VerificationCode.belongsTo(User);

  Person.hasMany(Training, { foreignKey: "personId", as: "trainings" });
  Person.hasMany(Training, { foreignKey: "instructorId", as: "instructors" });
  Training.belongsTo(Person, { foreignKey: "personId" });
  Training.belongsTo(Person, { foreignKey: "instructorId" });

  User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
  User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });
  Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
  Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

  User.hasOne(Socket);
  Socket.belongsTo(User);

  Image.hasOne(User);
  User.belongsTo(Image, { foreignKey: "avatarId", as: "avatar" });

  Image.hasOne(Policy);
  Policy.belongsTo(Image, { foreignKey: "coverId", as: "cover" });
  Policy.belongsTo(Image, { foreignKey: "backgroundId", as: "background" });

  User.belongsToMany(Group, {
    foreignKey: "groupId",
    through: "UserGroup",
    as: "groups",
  });
  Group.belongsToMany(User, {
    foreignKey: "userId",
    through: "UserGroup",
    as: "users",
  });

  Image.hasOne(Group);
  Group.belongsTo(Image, { foreignKey: "avatarId", as: "avatar" });
}

export { loadModelsAssociations };
