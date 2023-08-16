using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Branches_BranchId",
                table: "Order");

            migrationBuilder.AlterColumn<int>(
                name: "BranchId",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(6668));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(7657));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(7666));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(7669));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(7672));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(7675));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(7678));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 16, 16, 19, 27, 1, DateTimeKind.Local).AddTicks(1838), new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(4827) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(5736), new DateTime(2023, 8, 16, 16, 19, 27, 3, DateTimeKind.Local).AddTicks(5743) });

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Branches_BranchId",
                table: "Order",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Branches_BranchId",
                table: "Order");

            migrationBuilder.AlterColumn<int>(
                name: "BranchId",
                table: "Order",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(5451));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6332));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6339));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6341));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6344));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6346));

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(6348));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 16, 16, 2, 11, 594, DateTimeKind.Local).AddTicks(2177), new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(3692) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BirthdayDate", "CreatedDate" },
                values: new object[] { new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(4528), new DateTime(2023, 8, 16, 16, 2, 11, 596, DateTimeKind.Local).AddTicks(4534) });

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Branches_BranchId",
                table: "Order",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
