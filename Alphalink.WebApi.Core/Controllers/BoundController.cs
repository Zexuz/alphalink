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

        customer.Bounds.Add(model.Bound);
        await _customerRepository.InsertOneAsync(customer);
        return new UpdateBoundResponseModel
            { Bound = model.Bound, EthAddress = model.EthAddress, Id = customer.Id.ToString() };
    }
}

public class UpdateBoundModel
{
    public string EthAddress { get; set; }
    public string Bound { get; set; }
}

public class UpdateBoundResponseModel : UpdateBoundModel
{
    public string Id { get; set; }
}