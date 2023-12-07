using Data;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Api
{
    using Infrastructure.Services;
    using Microsoft.OpenApi.Models;
    using Serilog.Events;
    using System.Reflection;
    using Domain.Entities;

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.WebHost.ConfigureKestrel(serverOptions =>
            {
                serverOptions.Listen(System.Net.IPAddress.Any, int.Parse(builder.Configuration["Hosting:Port"]));
            });

            builder.Services.AddCors();
            //stops serialization loop when getting data from db 2 way navigation properties
            builder.Services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .WriteTo.Console()
                .WriteTo.File(builder.Configuration["Path:LogPath"], rollingInterval: RollingInterval.Day)
                .CreateLogger();

            builder.Services.AddSingleton<TaggerService>();
            builder.Services.AddSingleton<DescriptionParserService>();

            builder.Services.AddSingleton<ErrorLogger>(provider =>
            {
                var logger = provider.GetRequiredService<ILogger<ErrorLogger>>();
                return new ErrorLogger(logger);
            });

            builder.Services.AddScoped<DataGetterService>(provider =>
            {
                var errorLogger = provider.GetRequiredService<ErrorLogger>();
                var tagger = provider.GetRequiredService<TaggerService>();
                var descriptionParser = provider.GetRequiredService<DescriptionParserService>();
                var context = provider.GetRequiredService<JobScoutContext>();
                return new DataGetterService(errorLogger, tagger, descriptionParser, context);
            });


            builder.Services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddSerilog();
            });
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
                options.UseSqlServer(builder.Configuration.GetConnectionString("JobScoutDatabase"));

                //Allan
                //options.UseSqlServer(@"Server=MSI\SQLEXPRESS;Database=Jobscout;Integrated Security=true;TrustServerCertificate=true;");
            });


            var app = builder.Build();
            //code for creating default user
            using (var scope = app.Services.CreateScope())
            {
                List<string> userList = new() { "user1", "user2", "user3" };
                var context = scope.ServiceProvider.GetRequiredService<JobScoutContext>();
                if (context.JobScoutUsers.Any() == false)
                {
                    context.JobScoutUsers.Add(new JobScoutUser { Name = "Default" });
                }
                var allUsers = context.JobScoutUsers.ToList();
                foreach (var userToAdd in userList)
                {
                    if (!allUsers.Any(x => x.Name == userToAdd))
                    {
                        context.JobScoutUsers.Add(new JobScoutUser { Name = userToAdd });
                    }
                }
                context.SaveChanges();
            }

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

            Log.CloseAndFlush();
        }
    }
}