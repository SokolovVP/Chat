using WebSocketChat.Api.Hubs;
using Serilog;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>{
    options.AddDefaultPolicy(policy =>{
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddSignalR();

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();

WebApplication app = builder.Build();

app.UseCors();

app.UseSerilogRequestLogging();

app.MapHub<ChatHub>("/chat");

app.MapGet("/hello", () => "Hello world");

app.Run();