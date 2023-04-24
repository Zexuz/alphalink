namespace Alphalink.Domain.Core;

[BsonCollection("Customer")]
public class Customer : Document
{
    public string EthAddress { get; set; }
    public List<string> Bounds { get; set; }
}