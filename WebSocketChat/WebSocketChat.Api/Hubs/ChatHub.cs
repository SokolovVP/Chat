using Microsoft.AspNetCore.SignalR;
using WebSocketChat.Api.DTOs;

namespace WebSocketChat.Api.Hubs;

public interface IChatClient
{
    public Task ReceiveMessage(string userName, string message);
}

public class ChatHub : Hub<IChatClient>
{
    public async Task JoinChat(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);

        await Clients.Group(userConnection.ChatRoom).ReceiveMessage("Admin", $"{userConnection.UserName} присоединился к чату");
    }
}