namespace Alphalink.Domain.Core;

[BsonCollection("Customer")]
public class Customer
{
    public string EthAddress { get; set; }
    public List<string> Bounds { get; set; }
}