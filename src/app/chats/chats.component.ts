import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat-service.service';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-chat',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.fetchMessages();
    const pusher = new Pusher('1f37573a81728b0d4ce1', {
      cluster: 'eu',
    });
    const channel = pusher.subscribe('chat');
    channel.bind('sent-message', (data: any) => {
      console.log(data);
      this.messages.push(data.data);
    });
  }

  fetchMessages() {
    this.chatService.fetchMessages().subscribe(
      (messages) => {
        this.messages = messages;
        console.log(messages);
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const messageData = { message: this.newMessage };
    this.chatService.sendMessage(messageData).subscribe(
      (response) => {
        this.messages.push({
          message: this.newMessage,
          created_at: new Date(),
        });
        this.newMessage = '';
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }
}
  