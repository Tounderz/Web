using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web.Migrations
{
    public partial class updaterefreshTokenModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TokenId",
                table: "RefreshTokens");

            migrationBuilder.RenameColumn(
                name: "Expires",
                table: "RefreshTokens",
                newName: "TokenExpires");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TokenExpires",
                table: "RefreshTokens",
                newName: "Expires");

            migrationBuilder.AddColumn<int>(
                name: "TokenId",
                table: "RefreshTokens",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
