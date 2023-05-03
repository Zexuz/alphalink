using Grpc.Core;

namespace Alphalink.WebApi.Core.Controllers;

public class GreeterController : Greeter.GreeterBase
{
    private readonly ILogger<GreeterController> _logger;

    public GreeterController(ILogger<GreeterController> logger)
    {
        _logger = logger;
    }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HelloReply
        {
            Message = "Hello " + request.Name
        });
    }
}