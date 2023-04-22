using Alphalink.Domain.Core;
using Microsoft.AspNetCore.Mvc;

namespace Alphalink.WebApi.Core.Controllers;

[ApiController]
[Route("[controller]")]
public class RobinController : ControllerBase
{
    private readonly ILogger<RobinController> _logger;

    public RobinController(ILogger<RobinController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetNames")]
    public IEnumerable<RobinModel> Get()
    {
        var mongoDbSettings = new MongoDbSettings
        {
            ConnectionString = "mongodb://localhost:27017",
            DatabaseName = "RobinTestDatabase"
        };
        return new RobinService(new MongoRepository<RobinDocument>(mongoDbSettings)).GetAll()
            .Select(x => new RobinModel { Name = x.Name });
    }
}

public class RobinModel
{
    public string Name { get; set; }
}