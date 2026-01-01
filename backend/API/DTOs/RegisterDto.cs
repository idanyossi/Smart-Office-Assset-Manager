namespace API.DTOs
{
    public interface RegisterDto
    {
        string Username { get; set; }
        string Password { get; set; }
        string Role { get; set; }
    }
}