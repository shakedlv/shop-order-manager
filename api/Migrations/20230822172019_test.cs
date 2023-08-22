using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 20, 19, 439, DateTimeKind.Local).AddTicks(9740));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 20, 19, 440, DateTimeKind.Local).AddTicks(547));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 20, 19, 440, DateTimeKind.Local).AddTicks(555));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 20, 19, 440, DateTimeKind.Local).AddTicks(557));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 20, 19, 440, DateTimeKind.Local).AddTicks(560));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 20, 19, 440, DateTimeKind.Local).AddTicks(562));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 20, 19, 440, DateTimeKind.Local).AddTicks(564));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 22, 20, 20, 19, 437, DateTimeKind.Local).AddTicks(2391), new DateTime(2023, 8, 22, 20, 20, 19, 439, DateTimeKind.Local).AddTicks(7534) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 22, 20, 20, 19, 439, DateTimeKind.Local).AddTicks(8543), new DateTime(2023, 8, 22, 20, 20, 19, 439, DateTimeKind.Local).AddTicks(8550) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(6972));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7759));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7766));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7769));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7772));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7774));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(7777));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 22, 20, 0, 10, 40, DateTimeKind.Local).AddTicks(9865), new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(4814) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(5781), new DateTime(2023, 8, 22, 20, 0, 10, 43, DateTimeKind.Local).AddTicks(5788) });
        }
    }
}
