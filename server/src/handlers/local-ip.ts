import { networkInterfaces, NetworkInterfaceInfo } from "os";

const availableNetworkInterfaces = networkInterfaces();

export default async function getMyIPAddress(options?: any): Promise<string[]> {
  return Object.keys(availableNetworkInterfaces)
    .map((key: string) => {
      return availableNetworkInterfaces[key]!;
    })
    .flat()
    .filter((networkCard: NetworkInterfaceInfo) => {
      return networkCard.family === "IPv4";
    })
    .map((networkCard: NetworkInterfaceInfo) => {
      return networkCard.address;
    });
}
