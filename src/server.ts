import path from 'path';
import { cwd } from 'node:process';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

export default class GrpcServer {
  private server: grpc.Server = new grpc.Server();

  addService(protoService: grpc.ServiceDefinition, serviceMap: { [key: string]: any }) {
    this.server.addService(protoService, serviceMap);
  }
  async start(host: string, port: string | number) {
    if ((globalThis as any).grpcServer) {
      (globalThis as any).grpcServer.forceShutdown();
    }
    this.server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err != null) {
        return console.error(err);
      }
      console.log(`🌐 gRPC listening on ${host}:${port}`);

      (globalThis as any).grpcServer = this.server;
    });
  }
}

export const getProto = (name: string) => grpc.loadPackageDefinition(
  protoLoader.loadSync(
    path.join(cwd(), `src/protos/${name}.proto`),
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    },
  )
);
