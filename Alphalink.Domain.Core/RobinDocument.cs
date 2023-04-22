namespace Alphalink.Domain.Core;

[BsonCollection("Robin")]
public class RobinDocument: Document
{
    public string Name { get; set; }
    public int Age { get; set; }
}