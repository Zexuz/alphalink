import { GreeterClient } from "../../client/proto/Greeter.client.ts";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { HelloReply, HelloRequest } from "../../client/proto/Greeter.ts";
import { useState } from "react";


const client = new GreeterClient(new GrpcWebFetchTransport({
  baseUrl: "https://localhost:8082"
}));


const fetchData = async (request: HelloRequest): Promise<HelloReply> => {
  const resp = await client.sayHello(request);
  return resp.response;
};

interface GreeterHook {
  call: (request: HelloRequest) => void;
  data: HelloReply | null;
  isLoading: boolean;
  error: Error | null;
}


const useGreeter = (): GreeterHook => {
  const [data, setData] = useState<HelloReply | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const call = async (request: HelloRequest) => {
    setIsLoading(true);
    try {
      const resp = await fetchData(request);
      setData(resp);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    call,
    data,
    isLoading,
    error
  };
};

export default useGreeter;