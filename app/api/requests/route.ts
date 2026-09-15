import { receiveRequest } from "@/src/lib/utils/receive-request";
import { getRequestsConfig } from "@/src/lib/runtime-config";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return receiveRequest(request, getRequestsConfig());
}
