using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class countCategoryView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountView",
                table: "Categories",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountView",
                table: "Categories");
        }
    }
}
