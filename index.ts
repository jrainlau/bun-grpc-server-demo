import GrpcServer, { getProto } from './src/server';
import SayHello from './src/services/sayHello';

const server = new GrpcServer();
const proto = (getProto('hello').demo as any).Hello.service;

server.addService(proto, { SayHello });
server.start('0.0.0.0', 50051)
