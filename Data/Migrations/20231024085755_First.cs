using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class First : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobScoutCompanies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Excluded = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobScoutCompanies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JobScoutTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobScoutTags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JobScoutJobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Municipality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Favorite = table.Column<bool>(type: "bit", nullable: false),
                    Provider = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProviderUniqueId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobScoutJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobScoutJobs_JobScoutCompanies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "JobScoutCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobScoutContacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobScoutContacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobScoutContacts_JobScoutJobs_JobId",
                        column: x => x.JobId,
                        principalTable: "JobScoutJobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobScoutTagJobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobScoutTagJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobScoutTagJobs_JobScoutJobs_JobId",
                        column: x => x.JobId,
                        principalTable: "JobScoutJobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobScoutTagJobs_JobScoutTags_TagId",
                        column: x => x.TagId,
                        principalTable: "JobScoutTags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobScoutContacts_JobId",
                table: "JobScoutContacts",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobScoutJobs_CompanyId",
                table: "JobScoutJobs",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_JobScoutTagJobs_JobId",
                table: "JobScoutTagJobs",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobScoutTagJobs_TagId",
                table: "JobScoutTagJobs",
                column: "TagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobScoutContacts");

            migrationBuilder.DropTable(
                name: "JobScoutTagJobs");

            migrationBuilder.DropTable(
                name: "JobScoutJobs");

            migrationBuilder.DropTable(
                name: "JobScoutTags");

            migrationBuilder.DropTable(
                name: "JobScoutCompanies");
        }
    }
}
