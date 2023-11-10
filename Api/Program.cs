using Data;
using Microsoft.EntityFrameworkCore;

namespace Api
{
    using Infrastructure.Services;
    using Microsoft.OpenApi.Models;
    using System.Reflection;

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors();
            //stops serialization loop when getting data from db 2 way navigation
            builder.Services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            builder.Services.AddSingleton<DataGetterService>();
            builder.Services.AddSingleton<TaggerService>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "JobScoutApi",
                    Description = "Api for interfacing with jobscout backend"
                });

                var xmlFilemame = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilemame));
            });

            builder.Services.AddDbContext<JobScoutContext>(options =>
            {
                options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=JobScout;Integrated Security=True;MultipleActiveResultSets=true");

                //Allan
                //options.UseSqlServer(@"Server=MSI\SQLEXPRESS;Database=Jobscout;Integrated Security=true;TrustServerCertificate=true;");
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.MapControllers();

            app.Run();
        }
    }
}