using Alphalink.Domain.Core;
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
    public IEnumerable<RobinModel> Get()
    {
        return _robinRepository.AsQueryable().Select(x => new RobinModel { Name = x.Name });
    }
}

public class RobinModel
{
    public string Name { get; set; }
}