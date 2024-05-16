import Policy from "@models/Policy";
import socketController from "./socketController";

async function getAllPolicies() {
  return await Policy.findAll();
}

async function getLatestPolicy() {
  const policies = await getAllPoliciesWithLimit(1, 0);
  const latest = policies[0];
  const latestJson = latest.toJSON();

  // @ts-expect-error
  latestJson.cover = await latest.getCover();
  // @ts-expect-error
  latestJson.background = await latest.getBackground();
  return latestJson;
}

async function getPolicyById(id: string) {
  const numberId = parseInt(id, 10);
  const policy = await Policy.findOne({
    where: {
      id: numberId,
    },
  });
  if (!policy) return null;
  const policyJson = policy.toJSON();
  // @ts-expect-error
  policyJson.cover = policy.getCover();
  // @ts-expect-error
  policyJson.background = policy.getBackground();
  return policyJson;
}

async function getAllPoliciesWithLimit(limit: number = 10, offset: number = 0) {
  return await Policy.findAll({
    limit: limit,
    offset: offset,
    order: [
      ["createdAt", "DESC"],
      ["id", "DESC"],
    ],
  });
}

async function createPolicy(data: any) {
  if (data.content) {
    const policy = await Policy.create({ data });
    socketController.pushGlobalPolicy(policy);
    return policy;
  }
}

export default {
  getAllPolicies,
  getAllPoliciesWithLimit,
  getLatestPolicy,
  getPolicyById,

  createPolicy,
};
