import Person from "@models/Person";
import Training from "@models/Training";
import User from "@models/User";
import images from "./images";

async function createUser() {
  await User.bulkCreate([
    {
      id: 1,
      nickname: "天王盖地虎",
      email: "11@11.com",
      password: "11",
      identity_binding: 2,
    },
    {
      id: 2,
      nickname: "小鸡炖蘑菇",
      email: "22@ac",
      password: "22",
      identity_binding: 3,
    },
    {
      id: 3,
      nickname: "宝塔镇河妖",
      email: "33bg",
      password: "33bg",
      identity_binding: 4,
    },
  ]);
}

async function createPerson() {
  await Person.bulkCreate([
    { name: "知多星", id: 1 },
    { name: "张三", id: 2 },
    { name: "李四", id: 3 },
    { name: "王五", id: 4 },
  ]);
}

async function createTraining() {
  const content1 = {
    title: "基础安全操作",
    time: new Date("2024-03-28"),
    progress: 0,
    content:
      "本课程旨在教授员工基本的安全操作知识，包括个人防护装备的正确使用、紧急情况下的应对措施等。",
    coverImage: images.getBase64_1(),
  };
  const jsonContent1 = JSON.stringify(content1);
  const content2 = {
    title: "高级设备维护",
    time: new Date("2024-03-28"),
    progress: 0,
    content: "本课程提供对工业设备进行高级维护和故障排除的深入指导。",
    coverImage: images.getBase64_2(),
  };
  const jsonContent2 = JSON.stringify(content2);

  await Training.bulkCreate([
    {
      person_id: 2,
      instructor_id: 1,
      progress: 0,
      course_content: jsonContent1,
    },
    {
      person_id: 2,
      instructor_id: 1,
      progress: 0,
      course_content: jsonContent2,
    },
  ]);
}

function initSeeds() {
  createPerson();
  createUser();
  createTraining();
}

export default initSeeds;
