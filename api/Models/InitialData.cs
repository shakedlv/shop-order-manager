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
                new User() { Id = 1, Firstname = "admin", Lastname = "admin", Password = HashPassword("admin"), Email = "admin@admin.com", Username = "admin", BirthdayDate = DateTime.Now, CreatedDate = DateTime.Now, IsAdmin = true, PhoneCountryCode="+972",PhoneNumber="0541230123" , Image="https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0"},
                new User() { Id = 2, Firstname = "test", Lastname = "test", Password = HashPassword("test"), Email = "test@test.com", Username = "test", BirthdayDate = DateTime.Now, CreatedDate = DateTime.Now, IsAdmin = false, PhoneCountryCode="+972",PhoneNumber="0541230124", Image = "https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0" }

        };

        public static Category[] Categories = new Category[]
        {
                new Category { Id = 1, DisplayName = "sandwiches" , Icon="https://imageproxy.wolt.com/wolt-frontpage-images/categories/3b15b7ec-c5a9-11ea-b203-822e244794a0_f9f6d726_a28a_40f1_9d3f_76d3ed1528c7.jpg-md?w=600" , Products = new List<Product>()},
                new Category { Id = 2, DisplayName = "focaccia",Icon="https://imageproxy.wolt.com/wolt-frontpage-images/categories/631c2da8-c5a8-11ea-9f48-2e3b484a03e4_e68ad7b4_218c_4d28_b339_f49e3e8f9f50.jpg-md?w=600" , Products = new List<Product>()}
        };

        public static Product[] Products = new Product[] {
                new Product() {Id = 1, CategoryId=1, CreatedDate=DateTime.Now,Description="Fresh baked bread with Fresh Mozarela , tomato , and basil",DisplayName="Caprese Sandwich",DisplayOnStore=true, Price = 22 , Image ="https://imageproxy.wolt.com/menu/menu-images/shared/2de061e4-0430-11ee-84f7-7ad0e2eb5e41______________.jpg?w=600"},
                new Product() {Id = 2, CategoryId=1,CreatedDate = DateTime.Now, Description = "Fresh baked bread with Tuna Salad , tomato , and cucumaber", DisplayName = "Tuna Sandwich", DisplayOnStore = true, Price = 22, Image ="https://imageproxy.wolt.com/menu/menu-images/shared/e161f85a-042f-11ee-8a01-e6da8185655a_________.jpg?w=600"},
                new Product() {Id = 3, CategoryId = 1, CreatedDate = DateTime.Now, Description = "Fresh baked bread with Egg Salad, Lettuce and pickles", DisplayName = "Egg Salad Sandwich", DisplayOnStore = true, Price = 22, Image = "https://imageproxy.wolt.com/menu/menu-images/shared/45289cc2-0430-11ee-afcb-7e562007c5f4____________.jpg?w=600"},
                new Product() {Id = 4, CategoryId=1, CreatedDate = DateTime.Now, Description = "Fresh baked croissant with Salmon, Lettuce and pickles", DisplayName = "Salmon Croissant", DisplayOnStore = true, Price = 25 , Image ="https://imageproxy.wolt.com/menu/menu-images/646b36d75cce5e0e302f8813/e3718414-1003-11ee-9e7b-82f85494c1fc______________.jpg?w=600"},
                new Product() {Id = 5, CategoryId = 2, CreatedDate = DateTime.Now, Description = "Large Multigrain focaccia", DisplayName = "Multigrain focaccia", DisplayOnStore = true, Price = 12 , Image ="https://imageproxy.wolt.com/menu/menu-images/6017cfd7eb437443de0a3acd/bcc97bfa-75c3-11eb-ad05-dea929c534dc_dsc00615.jpeg?w=600"},
                new Product() {Id = 6,CategoryId=2,CreatedDate = DateTime.Now, Description = "Medium Pizza focaccia", DisplayName = "Pizza focaccia", DisplayOnStore = true, Price = 15, Image = "https://imageproxy.wolt.com/menu/menu-images/630b63872bf925291e15a301/7020f74a-3374-11ed-a05a-0a35c6057374____________.jpeg?w=600"},
                new Product() {Id = 7,CategoryId=2, CreatedDate = DateTime.Now, Description = "Large Pizza focaccia", DisplayName = "Pizza focaccia", DisplayOnStore = true, Price = 22, Image = "https://imageproxy.wolt.com/menu/menu-images/630b63872bf925291e15a301/7020f74a-3374-11ed-a05a-0a35c6057374____________.jpeg?w=600"},
                    

        };

        public static Branch[] Branches = new Branch[]
        {
            new  Branch() {Id = 1,Address="Tel Aviv Ibn Gabirol", DisplayName="Ibn Gabirol"},
            new  Branch() {Id = 2,Address="Ashdod big", DisplayName="Big Outlet"},
            new  Branch() {Id = 3,Address="Eilat", DisplayName="Ice Mall Eilat"},

        };

    }
}
