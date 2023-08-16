using api.Models.DTO;
using System.Security.Cryptography;
using System.Text;

namespace api.Models
{

    public class InitialData
    {
        private static string HashPassword(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashed = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashed);
        }

        public static User[] Users = new User[]
        {
                new User() { Id = 1, Firstname = "admin", Lastname = "admin", Password = HashPassword("admin"), Email = "admin@admin.com", Username = "admin", BirthdayDate = DateTime.Now, CreatedDate = DateTime.Now, IsAdmin = true, PhoneCountryCode="+972",PhoneNumber="0541230123" },
                new User() { Id = 2, Firstname = "test", Lastname = "test", Password = HashPassword("test"), Email = "test@test.com", Username = "test", BirthdayDate = DateTime.Now, CreatedDate = DateTime.Now, IsAdmin = false, PhoneCountryCode="+972",PhoneNumber="0541230124" }

        };

        public static Category[] Categories = new Category[]
        {
                new Category { Id = 1, DisplayName = "sandwiches" },
                new Category { Id = 2, DisplayName = "focaccia" }
        };

        public static Product[] Products = new Product[] {
                new Product() {Id = 1,CategoryId=1,CreatedDate=DateTime.Now,Description="Fresh baked bread with Fresh Mozarela , tomato , and basil",DisplayName="Caprese Salad",DisplayOnStore=true, MainPicturePath = "", PicturesPaths = null, Price = 22 },
                new Product() {Id = 2,CategoryId=1,CreatedDate=DateTime.Now,Description="Fresh baked bread with Tuna Salad , tomato , and cucumaber",DisplayName="Tuna Salad",DisplayOnStore=true, MainPicturePath = "", PicturesPaths = null, Price = 22 },
                new Product() {Id = 3,CategoryId=1,CreatedDate=DateTime.Now,Description="Fresh baked bread with Egg Salad, Letuce and pickles",DisplayName="Egg Salad",DisplayOnStore=true, MainPicturePath = "", PicturesPaths = null, Price = 22 },
                new Product() {Id = 4,CategoryId=1,CreatedDate=DateTime.Now,Description="Fresh baked croissant with Salmon, Letuce and pickles",DisplayName="Salmon Croissant",DisplayOnStore=true, MainPicturePath = "", PicturesPaths = null, Price = 25 },
                new Product() {Id = 5,CategoryId=2,CreatedDate=DateTime.Now,Description="Small Pizza focaccia",DisplayName="Pizza focaccia",DisplayOnStore=true, MainPicturePath = "", PicturesPaths = null, Price = 6 },
                new Product() {Id = 6,CategoryId=2,CreatedDate=DateTime.Now,Description="Medium Pizza focaccia",DisplayName="Pizza focaccia",DisplayOnStore=true, MainPicturePath = "", PicturesPaths = null, Price =15 },
                new Product() {Id = 7,CategoryId=2,CreatedDate=DateTime.Now,Description="Large Pizza focaccia",DisplayName="Pizza focaccia",DisplayOnStore=true, MainPicturePath = "", PicturesPaths = null, Price = 22 },


        };

        public static Branch[] Branches = new Branch[]
        {
            new  Branch() {Id = 1,Address="Tel Aviv Ibn Gabirol", DisplayName="Ibn Gabirol"},
            new  Branch() {Id = 2,Address="Ashdod big", DisplayName="Big Outlet"},
            new  Branch() {Id = 3,Address="Eilat", DisplayName="Ice Mall Eilat"},

        };
    }
}
