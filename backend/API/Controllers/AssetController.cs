using Microsoft.AspNetCore.Mvc;

using MongoDB.Driver;

using API.Models;


[ApiController]
[Route("api/[controller]")]
public class AssetController : ControllerBase
{
    private readonly IMongoCollection<Asset> _assetsCollection;

    public AssetController(IMongoClient mongoClient, IConfiguration configuration)
    {
        var database = mongoClient.GetDatabase(configuration.GetSection("MongoDB:DatabaseName").Value);
        _assetsCollection = database.GetCollection<Asset>("Assets");
    }

    [HttpGet]
    public async Task<IActionResult> GetAssets()
    {
        var assets = await _assetsCollection.Find(_ => true).ToListAsync();
        return Ok(assets);
    }


    [HttpPost]
    public async Task<IActionResult> CreateAsset([FromBody] Asset asset)
    {
        await _assetsCollection.InsertOneAsync(asset);
        return Ok(new { message = "Asset created successfully" });
    }
}