import Person from "@models/Person";
import Training from "@models/Training";
import User, { USER_PERMISSIONS } from "@models/User";
import images from "./images";
import Policy from "@models/Policy";
import Image from "@models/Image";
import Group from "@models/Group";

async function createUser() {
  await User.bulkCreate([
    {
      id: 1,
      nickname: "天王盖地虎",
      email: "11",
      password: "11",
      identity_binding: 2,
      avatarId: 3,
      permission: USER_PERMISSIONS.USER,
    },
    {
      id: 2,
      nickname: "小鸡炖蘑菇",
      email: "22@ac",
      password: "22",
      identity_binding: 3,
      avatarId: 4,
      permission: USER_PERMISSIONS.USER,
    },
    {
      id: 3,
      nickname: "宝塔镇河妖",
      email: "33bg@gmail.com",
      password: "33bg",
      identity_binding: 4,
      avatarId: 5,
      permission: USER_PERMISSIONS.USER,
    },
    {
      id: 4,
      nickname: "debugUser",
      email: "yuyunxi@gmail.com",
      password: "AGqvSiojPw",
      avatarId: 6,
      permission: USER_PERMISSIONS.USER,
    },
    {
      id: 5,
      nickname: "admin",
      email: "admin",
      password: "admin",
      avatarId: 10,
      permission:
        USER_PERMISSIONS.USER |
        USER_PERMISSIONS.OPREATION |
        USER_PERMISSIONS.LAW,
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
    content:
      "本课程旨在教授员工基本的安全操作知识，包括个人防护装备的正确使用、紧急情况下的应对措施等。",
    coverImage: 1,
  };
  const jsonContent1 = JSON.stringify(content1);
  const content2 = {
    title: "高级设备维护",
    time: new Date("2024-03-28"),
    content: "本课程提供对工业设备进行高级维护和故障排除的深入指导。",
    coverImage: 2,
  };
  const jsonContent2 = JSON.stringify(content2);

  await Training.bulkCreate([
    {
      personId: 2,
      instructorId: 1,
      course_content: content1,
      progress: 90,
      steps: [
        {
          title: "Step 4",
          content: "Step 4 content",
        },
        {
          title: "Step 5",
          content: "Step 5 content",
        },
        {
          title: "Step 6",
          content: "Step 6 content",
        },
      ],
      steps_active: 1,
    },
    {
      personId: 2,
      instructorId: 1,
      course_content: content2,
      progress: 60,
      steps: [
        {
          title: "Step 7",
          content: "Step 7 content",
        },
        {
          title: "Step 8",
          content: "Step 8 content",
        },
        {
          title: "Step 9",
          content: "Step 9 content",
        },
      ],
      steps_active: 2,
    },
    {
      personId: 3,
      instructorId: 1,
      course_content: content2,
      progress: 30,
      steps: [
        {
          title: "Step 10",
          content: "Step 10 content",
        },
        {
          title: "Step 11",
          content: "Step 11 content",
        },
        {
          title: "Step 12",
          content: "Step 12 content",
        },
      ],
      steps_active: 3,
    },
  ]);
}

async function createPolicy() {
  await Policy.bulkCreate([
    {
      name: "互联网弹窗信息推送服务管理规定",
      type: "政策",
      release_date: new Date("2024-03-28"),
      implementation_date: new Date("2024-03-28"),
      content: {
        title: "互联网弹窗信息推送服务管理规定",
        content:
          "为了规范互联网弹窗信息推送服务，维护国家安全和公共利益，保护公民、法人和其他组织的合法权益，促进行业健康有序发展，根据《中华人民共和国网络安全法》等法律法规，制定了相关管理规定。提供互联网弹窗信息推送服务的，应当遵守宪法、法律和行政法规，弘扬社会主义核心价值观，坚持正确政治方向、舆论导向和价值取向，维护清朗网络空间。",
        analysis:
          "为了规范互联网弹窗信息推送服务，维护国家安全和公共利益，保护公民、法人和其他组织的合法权益，促进行业健康有序发展，根据《中华人民共和国网络安全法》等法律法规，制定了相关管理规定。提供互联网弹窗信息推送服务的，应当遵守宪法、法律和行政法规，弘扬社会主义核心价值观，坚持正确政治方向、舆论导向和价值取向，维护清朗网络空间。",
      },
    },
    {
      name: "数字经济发展指导原则",
      type: "政策",
      release_date: new Date("2024-04-01"),
      implementation_date: new Date("2024-04-15"),
      content: {
        title: "数字经济发展指导原则",
        content:
          "为了推动数字经济高质量发展，根据国家相关法律法规，出台本指导原则。旨在优化数字经济发展环境，促进数字技术应用，保障网络安全和数据安全，保护个人隐私。",
        analysis:
          "本指导原则为数字经济发展提供了明确的方向和政策支持，通过促进技术创新和应用，加强数据保护，为我国数字经济发展奠定了坚实的基础。",
      },
    },
    {
      name: "网络信息安全管理办法",
      type: "政策",
      release_date: new Date("2024-05-01"),
      implementation_date: new Date("2024-05-20"),
      content: {
        title: "网络信息安全管理办法",
        content:
          "本办法旨在加强网络信息安全管理，保护网络信息系统的安全运行，防止网络攻击、网络犯罪等安全风险，保障国家安全和公民、法人和其他组织的合法权益。",
        analysis:
          "通过本办法的实施，将进一步规范网络信息服务的安全管理，提高网络信息系统的安全保护能力，为社会经济的健康发展提供安全保障。",
      },
    },
    {
      name: "个人信息保护法实施细则",
      type: "政策",
      release_date: new Date("2024-06-10"),
      implementation_date: new Date("2024-07-01"),
      content: {
        title: "个人信息保护法实施细则",
        content:
          "为了加强个人信息保护，规范个人信息处理活动，保护个人合法权益，根据《个人信息保护法》，制定本实施细则。",
        analysis:
          "本实施细则明确了个人信息处理的具体要求和标准，对加强个人信息保护、促进信息化发展具有重要意义。",
      },
    },
    {
      name: "数据安全管理条例",
      type: "政策",
      release_date: new Date("2024-08-15"),
      implementation_date: new Date("2024-09-01"),
      content: {
        title: "数据安全管理条例",
        content:
          "本条例旨在加强数据安全管理，促进数据资源的安全和有效利用，保护国家安全和公共利益，保障公民、法人和其他组织的合法权益。",
        analysis:
          "条例的实施将有助于建立健全数据安全管理体系，提高数据安全保护水平，推动数据资源的合理利用和开发。",
      },
    },
    {
      name: "电子商务法修订案",
      type: "政策",
      release_date: new Date("2024-10-05"),
      implementation_date: new Date("2024-11-01"),
      content: {
        title: "电子商务法修订案",
        content:
          "为了适应电子商务发展的新情况，保障电子商务交易安全和消费者权益，促进电子商务健康有序发展，对《电子商务法》进行修订。",
        analysis:
          "修订案的出台将进一步完善电子商务法律框架，为电子商务市场的健康发展提供法律保障。",
      },
    },
    {
      name: "公共数据开放利用规定",
      type: "政策",
      release_date: new Date("2024-12-01"),
      implementation_date: new Date("2025-01-01"),
      content: {
        title: "公共数据开放利用规定",
        content:
          "为了促进公共数据的开放与共享，推动数据资源的集约化、高效化利用，制定本规定。",
        analysis:
          "本规定将有助于提高公共数据的利用效率，促进经济社会的数字化转型。",
      },
    },
    {
      name: "云计算服务安全管理办法",
      type: "政策",
      release_date: new Date("2025-02-15"),
      implementation_date: new Date("2025-03-01"),
      content: {
        title: "云计算服务安全管理办法",
        content: "本办法旨在规范云计算服务市场，保障云计算服务的安全可靠运行。",
        analysis:
          "通过规范云计算服务提供和使用，提高云计算服务的整体安全水平。",
      },
    },
    {
      name: "智能制造发展指南",
      type: "政策",
      release_date: new Date("2025-04-20"),
      implementation_date: new Date("2025-05-10"),
      content: {
        title: "智能制造发展指南",
        content:
          "为了推动智能制造技术的发展和应用，提高制造业的智能化水平，制定本指南。",
        analysis:
          "本指南为智能制造技术的发展提供了方向，对提升我国制造业竞争力具有重要意义。",
      },
    },
    {
      name: "新能源汽车产业发展政策",
      type: "政策",
      release_date: new Date("2025-06-05"),
      implementation_date: new Date("2025-07-01"),
      content: {
        title: "新能源汽车产业发展政策",
        content:
          "为了促进新能源汽车产业的健康发展，加快新能源汽车的推广应用，制定本政策。",
        analysis:
          "本政策将加速新能源汽车产业的发展，对减少环境污染、促进能源结构转型具有积极作用。",
      },
    },
    {
      name: "人工智能伦理规范",
      type: "政策",
      release_date: new Date("2025-08-15"),
      implementation_date: new Date("2025-09-01"),
      content: {
        title: "人工智能伦理规范",
        content:
          "鉴于人工智能技术的快速发展及其广泛应用，特制定本伦理规范，以指导人工智能的健康发展。",
        analysis:
          "本规范的制定有助于确保人工智能技术的发展符合伦理道德标准，保护人类利益。",
      },
    },
    {
      name: "区块链技术应用与发展指导意见",
      type: "政策",
      release_date: new Date("2025-10-10"),
      implementation_date: new Date("2025-11-01"),
      content: {
        title: "区块链技术应用与发展指导意见",
        content:
          "为了促进区块链技术的健康发展和应用，提出本指导意见。旨在明确区块链技术发展的方向，加强区块链技术创新应用，保障区块链技术安全可控，促进区块链服务经济社会发展。",
        analysis:
          "本指导意见为区块链技术的应用与发展提供了政策支持和方向指引，有助于推动区块链技术的创新和应用，促进经济社会数字化转型。",
      },
    },
    {
      name: "跨境数据传输安全管理办法",
      type: "政策",
      release_date: new Date("2025-12-20"),
      implementation_date: new Date("2026-01-15"),
      content: {
        title: "跨境数据传输安全管理办法",
        content:
          "为了加强跨境数据传输的安全管理，保护国家安全和公民个人隐私，制定本办法。明确跨境数据传输的监管要求，加强对跨境数据传输活动的安全审查。",
        analysis:
          "本办法的实施将有助于规范跨境数据传输活动，保障数据传输安全，维护国家安全和公民个人信息安全。",
      },
    },
    {
      name: "数字货币监管政策",
      type: "政策",
      release_date: new Date("2026-02-25"),
      implementation_date: new Date("2026-03-10"),
      content: {
        title: "数字货币监管政策",
        content:
          "鉴于数字货币的快速发展及其对经济金融体系的影响，出台本政策，对数字货币进行有效监管。旨在保护投资者权益，维护金融市场稳定，促进数字货币健康发展。",
        analysis:
          "本政策的制定为数字货币市场提供了监管框架，有助于防范金融风险，保护投资者权益，促进数字货币市场的稳定和发展。",
      },
    },
    {
      name: "社交媒体内容监管政策",
      type: "政策",
      release_date: new Date("2026-04-15"),
      implementation_date: new Date("2026-05-01"),
      content: {
        title: "社交媒体内容监管政策",
        content:
          "为了加强社交媒体平台内容的监管，保护网络环境，防止虚假信息和有害内容的传播，制定本政策。明确社交媒体平台的内容审核责任，加强对违法和不良信息的监控与处理。",
        analysis:
          "本政策的实施将有助于清洁网络空间，提升社交媒体内容质量，保护用户权益，促进健康有序的网络环境。",
      },
    },
    {
      name: "网络游戏管理规定",
      type: "政策",
      release_date: new Date("2026-06-20"),
      implementation_date: new Date("2026-07-15"),
      content: {
        title: "网络游戏管理规定",
        content:
          "为了规范网络游戏市场，保护未成年人身心健康，制定本规定。对网络游戏内容、运营和未成年人游戏时间进行严格管理。",
        analysis:
          "本规定将有效减少网络游戏对未成年人的不良影响，促进网络游戏行业的健康发展，保护消费者权益。",
      },
    },
    {
      name: "电子支付安全管理办法",
      type: "政策",
      release_date: new Date("2026-08-05"),
      implementation_date: new Date("2026-09-01"),
      content: {
        title: "电子支付安全管理办法",
        content:
          "鉴于电子支付业务的快速发展，为保障电子支付的安全性和可靠性，制定本办法。明确电子支付服务提供者的安全管理责任，加强对电子支付业务的监督管理。",
        analysis:
          "本办法的实施将提高电子支付系统的安全性，保护消费者资金安全，促进电子支付市场的健康发展。",
      },
    },
    {
      name: "大数据安全保护条例",
      type: "政策",
      release_date: new Date("2026-10-10"),
      implementation_date: new Date("2026-11-01"),
      content: {
        title: "大数据安全保护条例",
        content:
          "为了加强大数据安全保护，促进大数据的安全和有效利用，制定本条例。明确大数据安全保护的责任主体，加强对大数据处理活动的监管。",
        analysis:
          "本条例将有助于保障大数据安全，促进大数据产业的健康发展，保护个人隐私和公共利益。",
      },
    },
    {
      name: "智慧城市建设指南",
      type: "政策",
      release_date: new Date("2026-12-15"),
      implementation_date: new Date("2027-01-10"),
      content: {
        title: "智慧城市建设指南",
        content:
          "为了推动智慧城市的建设，提高城市管理和服务水平，制定本指南。指导地方政府和相关企业在智慧城市建设中的技术应用和管理服务。",
        analysis:
          "本指南将促进智慧城市的科学规划和高效建设，通过技术创新提升城市服务质量和管理效率，为城市居民创造更加便捷、安全的生活环境。",
      },
    },
    {
      name: "网络安全技术措施规范",
      type: "政策",
      release_date: new Date("2027-02-20"),
      implementation_date: new Date("2027-03-15"),
      content: {
        title: "网络安全技术措施规范",
        content:
          "为了加强网络安全管理，提高网络安全防护水平，制定本规范。明确网络安全技术措施的要求，加强对网络运营者的监管。",
        analysis:
          "本规范的实施将有助于提升网络安全防护能力，保障网络信息安全，维护国家安全和社会公共利益。",
      },
    },
    {
      name: "信息技术服务外包管理办法",
      type: "政策",
      release_date: new Date("2027-04-25"),
      implementation_date: new Date("2027-05-10"),
      content: {
        title: "信息技术服务外包管理办法",
        content:
          "为了规范信息技术服务外包活动，保护外包服务交易双方的合法权益，制定本办法。明确信息技术服务外包的管理要求和监督措施。",
        analysis:
          "本办法将促进信息技术服务外包行业的健康发展，提高服务质量，保护客户和服务提供者的权益。",
      },
    },
    {
      name: "数字身份认证服务管理规定",
      type: "政策",
      release_date: new Date("2027-06-30"),
      implementation_date: new Date("2027-07-15"),
      content: {
        title: "数字身份认证服务管理规定",
        content:
          "为了加强数字身份认证服务的管理，保障用户身份信息的安全，制定本规定。规范数字身份认证服务提供和使用，保护用户隐私。",
        analysis:
          "本规定的实施将有助于提高数字身份认证服务的安全性和可靠性，保护用户的个人隐私和数据安全。",
      },
      coverId: 2,
      backgroundId: 1,
    },
    {
      name: "互联网广告发布和运营管理办法",
      type: "政策",
      release_date: new Date("2027-09-05"),
      implementation_date: new Date("2027-10-01"),
      content: {
        title: "互联网广告发布和运营管理办法",
        content:
          "为了规范互联网广告的发布和运营，保护消费者权益，制定本办法。明确互联网广告服务的提供者、发布者和用户的权利与义务。",
        analysis:
          "本办法将促进互联网广告业的健康发展，维护市场秩序，保护消费者的合法权益。",
      },
      coverId: 1,
      backgroundId: 2,
    },
  ]);
}

async function createImage() {
  await Image.bulkCreate([
    {
      src: images.getBase64_1(),
    },
    {
      src: images.getBase64_2(),
    },
    {
      src: images.getBase64_3(),
    },
    {
      src: images.getBase64_4(),
    },
    {
      src: images.getBase64_5(),
    },
    {
      src: images.getBase64_6(),
    },
    {
      src: images.getBase64_7(),
    },
    {
      src: images.getBase64_8(),
    },
    {
      src: images.getBase64_9(),
    },
    {
      src: images.getBase64_10(),
    },
  ]);
}

async function createGroup() {
  await Group.bulkCreate([
    {
      name: "Mortar",
      description:
        "Mortar is a group of people who are passionate about technology and want to help",
    },
    {
      name: "MineCraft",
      description:
        "MineCraft is a group of people who are passionate about technology and want to help",
    },
  ]);
}

async function initSeeds() {
  await createImage();
  await createPerson();
  await createUser();
  await createTraining();
  await createPolicy();
  await createGroup();
}

async function testSeeds() {}

export default initSeeds;
export { testSeeds };
