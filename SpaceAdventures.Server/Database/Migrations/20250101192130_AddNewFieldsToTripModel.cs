using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpaceAdventures.Server.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddNewFieldsToTripModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Department",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "Department",
                table: "Trips");
        }
    }
}
