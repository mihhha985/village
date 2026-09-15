export function getYandexMapsApiKey() {
  return process.env.YANDEX_MAPS_API_KEY ?? process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
}

export function getRequestsConfig() {
  return {
    requestsWebhookUrl: process.env.REQUESTS_WEBHOOK_URL,
    requestsWebhookToken: process.env.REQUESTS_WEBHOOK_TOKEN,
  };
}
