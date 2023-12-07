using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class favoriteUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Favorite",
                table: "JobScoutJobs");

            migrationBuilder.CreateTable(
                name: "JobScoutUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobScoutUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JobScoutFavorites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobScoutFavorites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobScoutFavorites_JobScoutJobs_JobId",
                        column: x => x.JobId,
                        principalTable: "JobScoutJobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobScoutFavorites_JobScoutUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "JobScoutUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobScoutFavorites_JobId",
                table: "JobScoutFavorites",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobScoutFavorites_UserId",
                table: "JobScoutFavorites",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobScoutFavorites");

            migrationBuilder.DropTable(
                name: "JobScoutUsers");

            migrationBuilder.AddColumn<bool>(
                name: "Favorite",
                table: "JobScoutJobs",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
