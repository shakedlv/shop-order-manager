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
                new User() { Id = 1, Firstname = "admin", Lastname = "admin", Password = HashPassword("admin"), Email = "admin@admin.com", Username = "admin", BirthdayDate = DateTime.Now, CreatedDate = DateTime.Now, IsAdmin = true, PhoneCountryCode="+972",PhoneNumber="0541230123" , ProfilePicturePath="https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0"},
                new User() { Id = 2, Firstname = "test", Lastname = "test", Password = HashPassword("test"), Email = "test@test.com", Username = "test", BirthdayDate = DateTime.Now, CreatedDate = DateTime.Now, IsAdmin = false, PhoneCountryCode="+972",PhoneNumber="0541230124", ProfilePicturePath = "https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0" }

        };

        public static Category[] Categories = new Category[]
        {
                new Category { Id = 1, DisplayName = "sandwiches" , Icon="https://imageproxy.wolt.com/wolt-frontpage-images/categories/3b15b7ec-c5a9-11ea-b203-822e244794a0_f9f6d726_a28a_40f1_9d3f_76d3ed1528c7.jpg-md?w=600" },
                new Category { Id = 2, DisplayName = "focaccia",Icon="https://imageproxy.wolt.com/wolt-frontpage-images/categories/631c2da8-c5a8-11ea-9f48-2e3b484a03e4_e68ad7b4_218c_4d28_b339_f49e3e8f9f50.jpg-md?w=600" }
        };

        public static Product[] Products = new Product[] {
                new Product() {Id = 1, CreatedDate=DateTime.Now,Description="Fresh baked bread with Fresh Mozarela , tomato , and basil",DisplayName="Caprese Salad",DisplayOnStore=true, Price = 22 , Image ="https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png" },
                new Product() {Id = 2, CreatedDate = DateTime.Now, Description = "Fresh baked bread with Tuna Salad , tomato , and cucumaber", DisplayName = "Tuna Salad", DisplayOnStore = true, Price = 22, Image ="https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png"},
                new Product() {Id = 3, CreatedDate = DateTime.Now, Description = "Fresh baked bread with Egg Salad, Lettuce and pickles", DisplayName = "Egg Salad", DisplayOnStore = true, Price = 22, Image = "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png"},
                new Product() {Id = 4, CreatedDate = DateTime.Now, Description = "Fresh baked croissant with Salmon, Lettuce and pickles", DisplayName = "Salmon Croissant", DisplayOnStore = true, Price = 25 , Image ="https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png"},
                new Product() {Id = 5, CreatedDate = DateTime.Now, Description = "Small Pizza focaccia", DisplayName = "Pizza focaccia", DisplayOnStore = true, Price = 6 , Image ="https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png"},
                new Product() {Id = 6,CreatedDate = DateTime.Now, Description = "Medium Pizza focaccia", DisplayName = "Pizza focaccia", DisplayOnStore = true, Price = 15, Image = "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png"},
                new Product() {Id = 7, CreatedDate = DateTime.Now, Description = "Large Pizza focaccia", DisplayName = "Pizza focaccia", DisplayOnStore = true, Price = 22, Image = "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png"},
                    

        };

        public static Branch[] Branches = new Branch[]
        {
            new  Branch() {Id = 1,Address="Tel Aviv Ibn Gabirol", DisplayName="Ibn Gabirol"},
            new  Branch() {Id = 2,Address="Ashdod big", DisplayName="Big Outlet"},
            new  Branch() {Id = 3,Address="Eilat", DisplayName="Ice Mall Eilat"},

        };

    }
}
