namespace API.Data
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "Employee"; // Default role

        public ICollection<Leave> Leaves { get; set; } = new List<Leave>();
    }
}
