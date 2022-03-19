import { promises } from "dns";
import { hostname } from "os";

const lookup = promises.lookup;

export default async function getMyIPAddress(options?: any): Promise<string> {
  return (await lookup(hostname(), options)).address;
}
