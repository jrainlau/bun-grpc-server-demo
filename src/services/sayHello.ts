export default function SayHello(call: { request: any }, callback: any) {
  const { name } = call.request;
  callback(null, {
    code: 0,
    message: `Hello ${name}`,
  })
}
