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
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItem", x => x.Id);
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
                    BirthdayDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    UserPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: true),
                    PickUpDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    MainPicturePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<float>(type: "real", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DisplayOnStore = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Product_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                table: "Category",
                columns: new[] { "Id", "DisplayName" },
                values: new object[,]
                {
                    { 1, "sandwiches" },
                    { 2, "focaccia" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "BirthdayDate", "CreatedDate", "Email", "Firstname", "IsAdmin", "Lastname", "Password", "PhoneCountryCode", "PhoneNumber", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 8, 16, 16, 2, 11, 594, DateTimeKind.Local).AddTicks(2177), new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(3692), "admin@admin.com", "admin", true, "admin", "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=", "+972", "0541230123", "admin" },
                    { 2, new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(4528), new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(4534), "test@test.com", "test", false, "test", "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=", "+972", "0541230124", "test" }
                });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "CategoryId", "CreatedDate", "Description", "DisplayName", "DisplayOnStore", "MainPicturePath", "Price" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(5451), "Fresh baked bread with Fresh Mozarela , tomato , and basil", "Caprese Salad", true, "", 22f },
                    { 2, 1, new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6332), "Fresh baked bread with Tuna Salad , tomato , and cucumaber", "Tuna Salad", true, "", 22f },
                    { 3, 1, new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6339), "Fresh baked bread with Egg Salad, Letuce and pickles", "Egg Salad", true, "", 22f },
                    { 4, 1, new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6341), "Fresh baked croissant with Salmon, Letuce and pickles", "Salmon Croissant", true, "", 25f },
                    { 5, 2, new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6344), "Small Pizza focaccia", "Pizza focaccia", true, "", 6f },
                    { 6, 2, new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6346), "Medium Pizza focaccia", "Pizza focaccia", true, "", 15f },
                    { 7, 2, new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6348), "Large Pizza focaccia", "Pizza focaccia", true, "", 22f }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Order_BranchId",
                table: "Order",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryId",
                table: "Product",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "OrderItem");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Branches");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
