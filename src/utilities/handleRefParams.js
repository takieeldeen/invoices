export function handleRefParams(...params) {
  params = params[0];

  params["reference"] = params["ref"];
  delete params["ref"];

  return { ...params };
}
