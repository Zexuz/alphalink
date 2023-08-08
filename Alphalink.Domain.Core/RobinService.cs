namespace Alphalink.Domain.Core;

public class RobinService
{
    private readonly IMongoRepository<RobinDocument> _robinRepository;


    public RobinService(IMongoRepository<RobinDocument> robinRepository)
    {
        _robinRepository = robinRepository;
    }

    public IEnumerable<RobinDocument> GetAll()
    {
        return _robinRepository.FilterBy(document => true);
    }
}
