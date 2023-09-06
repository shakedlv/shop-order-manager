using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using api.Context;
using api.Repositories.Interfaces;
using api.Repositories;
using System.Text.Json;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);
//Overide defaults logging 
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddAuthentication("Bearer").AddJwtBearer(o => {
    o.TokenValidationParameters = new()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        ValidAudience = builder.Configuration["Authentication:Audience"] ?? throw new ArgumentException("Authentication:Audience"),
        ValidIssuer = builder.Configuration["Authentication:Issuer"] ?? throw new ArgumentException("Authentication:Issuer"),
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.ASCII.GetBytes(builder.Configuration["Authentication:Secret"] ?? throw new ArgumentException("Authentication:Secret"))
        )
    };
});

//Add services to the container.
builder.Services.AddDbContext<MainContext>(o => {
    o.UseSqlServer(builder.Configuration.GetConnectionString("MainDB"));
});

builder.Services.AddControllers();


builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IBranchRepository, BranchRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();

builder.Services.AddControllers().AddNewtonsoftJson(
    option=> option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors((o) => {
    o.AddPolicy("open", b =>
        b.AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod()
    );
});
var app = builder.Build();
app.Logger.LogInformation("Sent by logger from program - Starting the app");
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MainContext>();
    context.Database.Migrate();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("open");

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
