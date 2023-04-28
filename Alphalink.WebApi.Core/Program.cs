using Alphalink.WebApi.Core;
using Alphalink.WebApi.Core.Controllers;
using Autofac;
using Autofac.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

//Use startup.cs
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory(autofac =>
    autofac.RegisterModule(new AutofacModule(builder.Configuration))));


builder.Services.AddControllers();
builder.Services.AddGrpc();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

//Use http 2.0
app.UseGrpcWeb(new GrpcWebOptions { DefaultEnabled = true });

app.UseRouting();

// Add gRPC-Web middleware after routing and before endpoints
app.UseGrpcWeb(new GrpcWebOptions{DefaultEnabled = true});

app.MapGrpcService<GreeterController>(); // Replace YourGrpcService with the actual gRPC service implementation class

app.MapControllers();

app.Run();