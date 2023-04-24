using Alphalink.Domain.Core;
using Microsoft.AspNetCore.Mvc;

namespace Alphalink.WebApi.Core.Controllers;

[ApiController]
[Route("[controller]")]
public class BoundController : ControllerBase
{
    private readonly ILogger<BoundController> _logger;
    private readonly IMongoRepository<Customer> _customerRepository;

    public BoundController(ILogger<BoundController> logger, IMongoRepository<Customer> customerRepository)
    {
        _customerRepository = customerRepository;
        _logger = logger;
    }

    [HttpPost]
    public async Task<UpdateBoundResponseModel> Post([FromBody] UpdateBoundModel model)
    {
        var customer = await _customerRepository.FindOneAsync(x => x.EthAddress == model.EthAddress) ?? new Customer
        {
            EthAddress = model.EthAddress,
            Bounds = new List<string>()
        };

        customer.Bounds.AddRange(model.Bounds);
        await _customerRepository.InsertOneAsync(customer);
        return new UpdateBoundResponseModel(model, customer.Id.ToString());
    }
}

public struct UpdateBoundModelStruct
{
    public UpdateBoundModelStruct(string aSd)
    {
        ASd = aSd;
    }

    public string ASd { get; set; }
}

public class UpdateBoundModel
{
    public string EthAddress { get; }
    public List<string> Bounds { get; }

    public UpdateBoundModel(string ethAddress, List<string> bounds)
    {
        EthAddress = ethAddress;
        Bounds = bounds;
    }
}

public class UpdateBoundResponseModel : UpdateBoundModel
{
    public string Id { get; set; }

    public UpdateBoundResponseModel(UpdateBoundModel model, string id) : base(model.EthAddress, model.Bounds)
    {
        Id = id;
    }
}