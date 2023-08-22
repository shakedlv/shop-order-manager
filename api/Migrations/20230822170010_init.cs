using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Branches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategoryProduct",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryProduct", x => new { x.CategoryId, x.ProductId });
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DisplayOnStore = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneCountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Firstname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lastname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfilePicturePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthdayDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategoriesProduct",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriesProduct", x => new { x.CategoryId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_CategoriesProduct_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoriesProduct_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    UserPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    PickUpDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Branches",
                columns: new[] { "Id", "Address", "DisplayName" },
                values: new object[,]
                {
                    { 1, "Tel Aviv Ibn Gabirol", "Ibn Gabirol" },
                    { 2, "Ashdod big", "Big Outlet" },
                    { 3, "Eilat", "Ice Mall Eilat" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "DisplayName", "Icon" },
                values: new object[,]
                {
                    { 1, "sandwiches", "https://imageproxy.wolt.com/wolt-frontpage-images/categories/3b15b7ec-c5a9-11ea-b203-822e244794a0_f9f6d726_a28a_40f1_9d3f_76d3ed1528c7.jpg-md?w=600" },
                    { 2, "focaccia", "https://imageproxy.wolt.com/wolt-frontpage-images/categories/631c2da8-c5a8-11ea-9f48-2e3b484a03e4_e68ad7b4_218c_4d28_b339_f49e3e8f9f50.jpg-md?w=600" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CreatedDate", "Description", "DisplayName", "DisplayOnStore", "Image", "Price" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(6972), "Fresh baked bread with Fresh Mozarela , tomato , and basil", "Caprese Salad", true, "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png", 22m },
                    { 2, new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7759), "Fresh baked bread with Tuna Salad , tomato , and cucumaber", "Tuna Salad", true, "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png", 22m },
                    { 3, new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7766), "Fresh baked bread with Egg Salad, Lettuce and pickles", "Egg Salad", true, "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png", 22m },
                    { 4, new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7769), "Fresh baked croissant with Salmon, Lettuce and pickles", "Salmon Croissant", true, "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png", 25m },
                    { 5, new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7772), "Small Pizza focaccia", "Pizza focaccia", true, "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png", 6m },
                    { 6, new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7774), "Medium Pizza focaccia", "Pizza focaccia", true, "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png", 15m },
                    { 7, new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7777), "Large Pizza focaccia", "Pizza focaccia", true, "https://i.pinimg.com/originals/da/d9/07/dad9070549f1afc882c220e2275f2ccc.png", 22m }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "BirthdayDate", "CreatedDate", "Email", "Firstname", "IsAdmin", "Lastname", "Password", "PhoneCountryCode", "PhoneNumber", "ProfilePicturePath", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 8, 22, 20, 0, 10, 40, DateTimeKind.Local).AddTicks(9865), new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(4814), "admin@admin.com", "admin", true, "admin", "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=", "+972", "0541230123", "https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0", "admin" },
                    { 2, new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(5781), new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(5788), "test@test.com", "test", false, "test", "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=", "+972", "0541230124", "https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0", "test" }
                });

            migrationBuilder.InsertData(
                table: "CategoriesProduct",
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3 },
                    { 1, 4 },
                    { 2, 5 },
                    { 2, 6 },
                    { 2, 7 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoriesProduct_ProductId",
                table: "CategoriesProduct",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BranchId",
                table: "Orders",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoriesProduct");

            migrationBuilder.DropTable(
                name: "CategoryProduct");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Branches");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
