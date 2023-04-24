using Alphalink.Domain.Core;
using Autofac;

namespace Alphalink.WebApi.Core;

public class AutofacModule : Module
{
    private readonly IConfiguration _configuration;

    public AutofacModule(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterInstance(new MongoDbSettings
        {
            ConnectionString = "mongodb://localhost:27017",
            DatabaseName = "RobinTestDatabase"
        }).As<IMongoDbSettings>();
        builder.RegisterGeneric(typeof(MongoRepository<>)).As(typeof(IMongoRepository<>)).InstancePerLifetimeScope();
    }
}