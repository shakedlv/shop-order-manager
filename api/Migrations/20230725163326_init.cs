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
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Firstname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lastname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthdayDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    MainPicturePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                        onDelete: ReferentialAction.Cascade);
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
                columns: new[] { "Id", "BirthdayDate", "CreatedDate", "Email", "Firstname", "IsAdmin", "LastLogin", "Lastname", "Password", "PhoneNumber", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 7, 25, 19, 33, 26, 32, DateTimeKind.Local).AddTicks(2211), new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(4136), "admin@admin.com", "admin", true, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "admin", "admin", "12301230123", "admin" },
                    { 2, new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(4601), new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(4606), "test@test.com", "test", false, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "test", "test", "12301230123", "test" }
                });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "CategoryId", "CreatedDate", "Description", "DisplayName", "DisplayOnStore", "MainPicturePath", "Price" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(5381), "Fresh baked bread with Fresh Mozarela , tomato , and basil", "Caprese Salad", true, "", 22f },
                    { 2, 1, new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6277), "Fresh baked bread with Tuna Salad , tomato , and cucumaber", "Tuna Salad", true, "", 22f },
                    { 3, 1, new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6285), "Fresh baked bread with Egg Salad, Letuce and pickles", "Egg Salad", true, "", 22f },
                    { 4, 1, new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6287), "Fresh baked croissant with Salmon, Letuce and pickles", "Salmon Croissant", true, "", 25f },
                    { 5, 2, new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6290), "Small Pizza focaccia", "Pizza focaccia", true, "", 6f },
                    { 6, 2, new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6292), "Medium Pizza focaccia", "Pizza focaccia", true, "", 15f },
                    { 7, 2, new DateTime(2023, 7, 25, 19, 33, 26, 34, DateTimeKind.Local).AddTicks(6294), "Large Pizza focaccia", "Pizza focaccia", true, "", 22f }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryId",
                table: "Product",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
