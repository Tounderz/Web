using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web.Migrations
{
    public partial class renameconfirnEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ConfirmEmail",
                table: "ConfirmEmails",
                newName: "ConfirmEmailToken");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ConfirmEmailToken",
                table: "ConfirmEmails",
                newName: "ConfirmEmail");
        }
    }
}
