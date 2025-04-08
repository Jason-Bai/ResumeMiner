import { getRepository } from "../database";
import { Key } from "../database/entities/Key";

export class KeyService {
  private get keyRepository() {
    return getRepository().Key;
  }

  private maskKey(key: string): string {
    if (key.length <= 8) return key;
    const prefix = key.slice(0, 4);
    const suffix = key.slice(-4);
    const maskLength = key.length - 8;
    const mask = "*".repeat(maskLength);
    return `${prefix}${mask}${suffix}`;
  }

  async getAllKeys(): Promise<Key[]> {
    const keys = await this.keyRepository.find();
    return keys.map((key) => ({
      ...key,
      key: this.maskKey(key.key),
    }));
  }

  async saveKey(key: Partial<Key>): Promise<Key> {
    return await this.keyRepository.save(key);
  }

  async updateKey(id: string, data: Partial<Key>): Promise<Key> {
    const key = await this.keyRepository.findOne({ where: { id } });
    if (!key) {
      throw new Error("Key not found");
    }
    Object.assign(key, data);
    return await this.keyRepository.save(key);
  }

  async deleteKey(id: string): Promise<void> {
    await this.keyRepository.delete(id);
  }
}
