import { GreeterClient } from "../../../client/proto/GreeterServiceClientPb";
import { HelloRequest } from "../../../client/proto/Greeter_pb";

const client = new GreeterClient("https://" + "0.0.0.0" + ":8082");

export function sendGreeting() {
  return new Promise<HelloRequest[]>(async (resolve, reject) => {

    const request = new HelloRequest().setName("Robin Edbom");
    const response = await client.sayHello(request, {});
    console.log(`Received response ${response.getMessage()}`);
  });
}