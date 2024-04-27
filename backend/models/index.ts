import dblogger from "@utils/dblogger";

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

  Person.hasOne(User);
  User.belongsTo(Person, { foreignKey: "identity_binding" });

  User.hasOne(VerificationCode);
  VerificationCode.belongsTo(User);

  User.hasOne(Training);
  Training.belongsTo(User, {});

  User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
  User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });
  Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
  Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });
}

export { loadModelsAssociations };
