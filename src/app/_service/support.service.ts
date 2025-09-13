import { Injectable } from '@angular/core';
import { Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chat {
  id: number;
  subject: string;
  status: string;
  messages: Message[];
}

export interface Message {
  id: number;
  type: 'client' | 'agent' | 'ai';
  text: string;
  created_at: string;
}


@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private readonly apiUrl = `${Envi.Url}/support`;

  constructor(
    private http: HttpClient
  ) {}

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/chats`);
  }

  createChat(subject: string): Observable<Chat> {
    return this.http.post<Chat>(`${this.apiUrl}/chat`, { subject });
  }

  sendMessage(chatId: number, text: string): Observable<{ client: Message; ai: Message }> {
    return this.http.post<{ client: Message; ai: Message }>(`${this.apiUrl}/chat/${chatId}/message`, { text });
  }

}
