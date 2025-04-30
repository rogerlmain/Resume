global using static Resume.Classes.Globals;

using Microsoft.EntityFrameworkCore;
using Resume.Classes;


WebApplicationBuilder builder = WebApplication.CreateBuilder (args);


builder.Services.AddControllers ().AddNewtonsoftJson ();
builder.Services.AddEndpointsApiExplorer ();

String connection_string = builder.Configuration.GetConnectionString ("MySqlConnection")!;

builder.Services.AddDbContext<DataContext> (options => options.UseMySql (connection_string, ServerVersion.AutoDetect (connection_string)));

WebApplication app = builder.Build ();

app.UseDefaultFiles ();
app.UseStaticFiles ();

app.UseHttpsRedirection ();
app.UseCors (builder => builder.AllowAnyHeader ().AllowAnyMethod ().AllowAnyOrigin ());
app.UseAuthorization ();
app.MapControllers ();

app.Run ();
