using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Web.Data;
using Web.Data.ConstMethods;
using Web.Data.Repositories;
using Web.HelpersJwt;
using WebLibrary.Abstract;
using WebLibrary.Models;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddCors();
    builder.Services.AddDbContext<AppDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
    builder.Services.AddAuthorization();

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            };
        });

    var emailConfig = builder.Configuration
        .GetSection("EmailConfiguration")
        .Get<EmailConfiguration>();
    builder.Services.AddSingleton(emailConfig);

    var jwtConfig = builder.Configuration
        .GetSection("Jwt")
        .Get<JWTConfiguration>();
    builder.Services.AddSingleton(jwtConfig);

    builder.Services.AddControllers();

    builder.Services.AddScoped<IAuthorization, AuthorizationRepository>();
    builder.Services.AddScoped<IProduct, ProductRepository>();
    builder.Services.AddScoped<ICategory, CategoryRepository>();
    builder.Services.AddScoped<IBasket, BasketRepository>();
    builder.Services.AddScoped<IBrand, BrandRepository>();
    builder.Services.AddScoped<IType, TypeRepository>();
    builder.Services.AddScoped<IOrder, OrderRepository>();
    builder.Services.AddScoped<IPaymentMethod, PaymentMethodRepository>();
    builder.Services.AddScoped<ICategoriesBrands, CategoriesBrandsRepository>();
    builder.Services.AddScoped<ISearch, SearchRepository>();
    builder.Services.AddScoped<ISort, SortRepository>();
    builder.Services.AddScoped<IJwt, JwtService>();
    builder.Services.AddScoped<IGeneralMethods, GeneralMethods>();
    builder.Services.AddScoped<ISendEmail, SendEmailService>();
    builder.Services.AddScoped<IRetrievePassword, RetrievePasswordRepository>();
    builder.Services.AddScoped<IConfirmEmail, ConfirmEmailRepository>();
    builder.Services.AddScoped<IRestoringAnAccount, RestoringAnAccountRepository>();
}

var app = builder.Build();
{
    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseHttpsRedirection();
    app.UseDefaultFiles();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseCors(options => options
       .WithOrigins(new[] { "http://localhost:3000", "http://localhost:8080", "http://localhost:4200" })
       .AllowAnyHeader()
       .AllowAnyMethod()
    );

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });

    app.Run();
}
