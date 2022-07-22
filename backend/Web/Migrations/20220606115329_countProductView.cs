using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class countProductView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountView",
                table: "Products",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountView",
                table: "Products");
        }
    }
}
