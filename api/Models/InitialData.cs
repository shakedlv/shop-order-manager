using api.Models.DTO;

namespace api.Models
{

    public  class InitialData
    {

        public static User[] Users = new User[]
        {
                new User() { Id = 1, Firstname = "admin", Lastname = "admin", Password = "admin", Email = "admin@admin.com", Username = "admin", BirthdayDate = DateTime.Now, CreatedDate = DateTime.Now, IsAdmin = true, PhoneNumber = "12301230123" },
                new User() { Id = 2, Firstname = "test", Lastname = "test", Password = "test", Email = "test@test.com", Username = "test", BirthdayDate = DateTime.Now, CreatedDate = DateTime.Now, IsAdmin = false, PhoneNumber = "12301230123" }

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
    }
}
