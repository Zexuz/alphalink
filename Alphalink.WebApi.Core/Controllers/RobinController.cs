using Alphalink.Domain.Core;
using Grpc.Core;
using Grpc.Net.Client;
using Grpc.Net.Client.Web;
using Microsoft.AspNetCore.Mvc;

namespace Alphalink.WebApi.Core.Controllers;

[ApiController]
[Route("[controller]")]
public class RobinController : ControllerBase
{
    private readonly ILogger<RobinController> _logger;
    private readonly IMongoRepository<RobinDocument> _robinRepository;

    public RobinController(ILogger<RobinController> logger, IMongoRepository<RobinDocument> robinRepository)
    {
        _robinRepository = robinRepository;
        _logger = logger;
    }

    [HttpGet(Name = "GetNames")]
    public async Task<IEnumerable<RobinModel>> Get()
    {
        var handler = new GrpcWebHandler(GrpcWebMode.GrpcWebText,
            new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; }
            });

        var channel = GrpcChannel.ForAddress("https://localhost:8082", new GrpcChannelOptions
        {
            HttpClient = new HttpClient(handler)
        });

        var client = new Greeter.GreeterClient(channel);

        var res = await client.SayHelloAsync(new HelloRequest { Name = "RObin" });
        Console.WriteLine($"Greeting: {res.Message}");

        return _robinRepository.AsQueryable().Select(x => new RobinModel { Name = x.Name });
    }
}

public class RobinModel
{
    public string Name { get; set; }
}