export default class httpRequest {
  async get(url) {
    const response = await fetch(url);
    const resPromise = await response.json();
    return resPromise;
  }

  async patch(url, data) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    };
    const response = await fetch(url, options);
    const resPromise = await response.json();
    return resPromise;
  }
}
