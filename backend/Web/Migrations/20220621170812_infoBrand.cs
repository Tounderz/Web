using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class infoBrand : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShortDescription",
                table: "Brands");

            migrationBuilder.AddColumn<string>(
                name: "Info",
                table: "Brands",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Info",
                table: "Brands");

            migrationBuilder.AddColumn<string>(
                name: "ShortDescription",
                table: "Brands",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
