using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class branches : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(8545));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(9476));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(9484));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(9486));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(9489));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(9491));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(9493));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 14, 19, 0, 3, 927, DateTimeKind.Local).AddTicks(4554), new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(7334) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(7789), new DateTime(2023, 8, 14, 19, 0, 3, 929, DateTimeKind.Local).AddTicks(7795) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(5512));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(6475));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(6483));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(6485));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(6488));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(6490));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(6493));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 14, 18, 58, 56, 943, DateTimeKind.Local).AddTicks(1497), new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(4307) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(4760), new DateTime(2023, 8, 14, 18, 58, 56, 945, DateTimeKind.Local).AddTicks(4767) });
        }
    }
}
