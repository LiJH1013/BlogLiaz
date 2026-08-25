import topics from "@/config/topics.json";

export const topicDefinitions = topics;

export type PostCategory = keyof typeof topicDefinitions;

export const topicOrder = Object.keys(topicDefinitions) as PostCategory[];

export const helloTopics = topicOrder.map((name) => ({ name, ...topicDefinitions[name] }));

export function isPostCategory(value: string): value is PostCategory {
  return Object.prototype.hasOwnProperty.call(topicDefinitions, value);
}
