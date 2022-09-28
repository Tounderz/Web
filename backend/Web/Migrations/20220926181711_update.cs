using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateExpires",
                table: "RetrievePasswords");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "RefreshTokens");

            migrationBuilder.DropColumn(
                name: "DateExpires",
                table: "ConfirmEmails");

            migrationBuilder.RenameColumn(
                name: "DateOfCreation",
                table: "RetrievePasswords",
                newName: "DateExpiresToken");

            migrationBuilder.RenameColumn(
                name: "DateOfRemoval",
                table: "DeletedAccounts",
                newName: "DateExpiresToken");

            migrationBuilder.RenameColumn(
                name: "DateOfCreation",
                table: "ConfirmEmails",
                newName: "DateExpiresToken");

            migrationBuilder.AddColumn<string>(
                name: "RestoringToken",
                table: "DeletedAccounts",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RestoringToken",
                table: "DeletedAccounts");

            migrationBuilder.RenameColumn(
                name: "DateExpiresToken",
                table: "RetrievePasswords",
                newName: "DateOfCreation");

            migrationBuilder.RenameColumn(
                name: "DateExpiresToken",
                table: "DeletedAccounts",
                newName: "DateOfRemoval");

            migrationBuilder.RenameColumn(
                name: "DateExpiresToken",
                table: "ConfirmEmails",
                newName: "DateOfCreation");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateExpires",
                table: "RetrievePasswords",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "RefreshTokens",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateExpires",
                table: "ConfirmEmails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
